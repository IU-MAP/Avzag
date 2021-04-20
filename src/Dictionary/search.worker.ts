import { Entry, SearchCommand } from "./types";
import { IDBPDatabase, openDB } from "idb";

let db: IDBPDatabase;
let lects: string[];
let key: symbol;

function checkTag(entry: Entry, tag: string) {
  tag = tag.substr(1);
  if (entry.tags?.includes(tag)) return [];

  const meanings = entry.concepts
    .filter((c) => c.tags?.includes(tag))
    .map((c) => c.meaning);
  return meanings.length ? meanings : undefined;
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

function checkToken(entry: Entry, token: string, forms: boolean) {
  if (token[0] === "#") return checkTag(entry, token);
  else if (forms)
    return entry.forms.some((f) => checkSegment(f.plain, token))
      ? entry.concepts.map((c) => c.meaning)
      : false;
  else {
    const meanings = entry.concepts
      .map((c) => c.meaning)
      .filter((m) => checkSegment(m, token));
    return meanings.length ? meanings : false;
  }
}

function checkQueries(entry: Entry, queries: string[][], forms = false) {
  const meanings = new Set<string>();
  for (const query of queries) {
    const ms = new Set<string>();
    for (const token of query) {
      if (token[0] === "#") {
        const m = checkTag(entry, token);
        if (Array.isArray(m)) m.forEach((m) => ms.add(m));
        else if (!m) {
          ms.clear();
          break;
        }
      } else if (forms)
        if (entry.forms.some((f) => checkSegment(f.plain, token)))
          entry.concepts.forEach((c) => ms.add(c.meaning));
        else {
          ms.clear();
          break;
        }
      else {
        const m = entry.concepts
          .map((c) => c.meaning)
          .filter((m) => checkSegment(m, token));
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

async function queryDictionaries(key_: symbol, queries: string[][]) {
  if (!queries.length) return;
  async function search(lect: string) {
    let cr = await db.transaction(lect).store.openCursor();
    while (cr) {
      if (key !== key_) return;
      const entry = cr.value as Entry;
      const meanings = checkQueries(entry, queries);
      if (meanings.length)
        postMessage(JSON.stringify({ lect, meanings, entry }));
      cr = await cr.continue();
    }
  }
  await Promise.all(lects.map((l) => search(l)));
  if (key !== key_) return;
  postMessage(JSON.stringify({ lect: "" }));
}

async function findMeanings(key_: symbol, lect: string, queries: string[][]) {
  // look through all forms in the language and collect their translations.
  const meanings = new Set<string>();
  let cr = await db.transaction(lect).store.openCursor();
  while (cr) {
    if (key !== key_) return [];
    const entry = cr.value as Entry;
    checkQueries(entry, queries, true).forEach((m) => meanings.add(m));
    cr = await cr.continue();
  }
  return [...meanings].map((m) => ["!" + m]);
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

  const queries = data.query
    .split(".")
    .map((q) =>
      q
        .split(" ")
        .map((t) => t.trim())
        .filter((t) => t)
    )
    .filter((q) => q);

  if (data.lect) {
    const meanings = await findMeanings(key, data.lect, queries);
    queryDictionaries(key, meanings);
  } else queryDictionaries(key, queries);
};
