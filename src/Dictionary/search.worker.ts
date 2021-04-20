import { Entry, SearchCommand } from "./types";
import { IDBPDatabase, openDB } from "idb";

let db: IDBPDatabase;
let lects: string[];
let key: symbol;

function checkTag(entry: Entry, tag: string) {
  tag = tag.substr(1);
  if (entry.tags?.includes(tag)) return true;

  const meanings = entry.concepts
    .filter((c) => c.tags?.includes(tag))
    .map((c) => c.meaning);
  return meanings.length ? meanings : false;
}

function checkSegment(area: string, segment: string) {
  switch (segment[0]) {
    case "!":
      return area === segment.substr(1);
    case "+":
      return area.startsWith(segment.substr(1));
    case "-":
      return area.endsWith(segment.substr(1));
    default:
      return area.includes(segment);
  }
}

function checkQuery(entry: Entry, query: string[][], forms = false) {
  const meanings = new Set<string>();
  for (const qs of query) {
    const ms = new Set<string>();
    for (const q of qs) {
      if (q[0] === "#") {
        const m = checkTag(entry, q);
        if (Array.isArray(m)) m.forEach((m) => ms.add(m));
        else if (!m) {
          ms.clear();
          break;
        }
      } else if (forms)
        if (entry.forms.some((f) => checkSegment(f.plain, q)))
          entry.concepts.forEach((c) => ms.add(c.meaning));
        else {
          ms.clear();
          break;
        }
      else {
        const m = entry.concepts
          .map((c) => c.meaning)
          .filter((m) => checkSegment(m, q));
        if (m.length) m.forEach((m) => ms.add(m));
        else {
          ms.clear();
          break;
        }
      }
    }
    if (ms.size) ms.forEach((m) => meanings.add(m));
  }
  return [...meanings];
}

async function queryDictionaries(key_: symbol, query: string[][]) {
  if (!query.length) return;
  async function search(lect: string) {
    let cr = await db.transaction(lect).store.openCursor();
    while (cr) {
      if (key !== key_) return;
      const entry = cr.value as Entry;
      const meanings = checkQuery(entry, query);
      if (meanings.length)
        postMessage(JSON.stringify({ lect, meanings, entry }));
      cr = await cr.continue();
    }
  }
  await Promise.all(lects.map((l) => search(l)));
  if (key !== key_) return;
  postMessage(JSON.stringify({ lect: "" }));
}

async function findMeanings(key_: symbol, lect: string, query: string[][]) {
  // look through all forms in the language and collect their translations.
  const meanings = new Set<string>();
  let cr = await db.transaction(lect).store.openCursor();
  while (cr) {
    if (key !== key_) return [];
    const entry = cr.value as Entry;
    checkQuery(entry, query, true).forEach((m) => meanings.add(m));
    cr = await cr.continue();
  }
  return [...meanings].map((m) => ["*" + m]);
}

onmessage = async (e) => {
  if (e.data === "stop") {
    db?.close();
    key = Symbol("sk");
    return;
  }
  const data = JSON.parse(e.data) as SearchCommand;
  if (Array.isArray(data)) {
    db = await openDB("avzag", 1);
    lects = data;
    return;
  }
  key = Symbol("sk");

  const query = data.query
    .split(".")
    .map((q) =>
      q
        .split(" ")
        .map((t) => t.trim())
        .filter((t) => t)
    )
    .filter((q) => q.length);

  if (data.lect) {
    const meanings = await findMeanings(key, data.lect, query);
    queryDictionaries(key, meanings);
  } else queryDictionaries(key, query);
};
