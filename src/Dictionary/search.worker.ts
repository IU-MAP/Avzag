import { Entry, SearchCommand } from "./types";
import { IDBPDatabase, openDB } from "idb";

let db: IDBPDatabase;
let lects: string[];
let key: symbol;

function fits(entry: Entry, query: string[][], forms = false) {
  return query.some((qs) =>
    qs.every((q) => {
      if (q[0] === "#") return entry.tags?.includes(q.substr(1));
      const area = forms ? entry.forms.map((f) => f.plain) : entry.meanings;
      switch (q[0]) {
        case "*":
          return area.includes(q.substr(1));
        case "+":
          return area.some((a) => a.startsWith(q.substr(1)));
        case "-":
          return area.some((a) => a.endsWith(q.substr(1)));
        default:
          return area.some((a) => a.includes(q));
      }
    })
  );
}

async function queryDictionaries(key_: symbol, query: string[][]) {
  if (!query.length) return;
  async function search(lect: string) {
    let cr = await db.transaction(lect).store.openCursor();
    while (cr) {
      if (key !== key_) return;
      const entry = cr.value as Entry;
      if (fits(entry, query)) postMessage(JSON.stringify({ lect, entry }));
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
    if (fits(entry, query, true))
      entry.meanings.forEach((m) => meanings.add(m));
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
  const { lect, query } = { ...data };
  if (lect) queryDictionaries(key, await findMeanings(key, lect, query));
  else queryDictionaries(key, query);
};
