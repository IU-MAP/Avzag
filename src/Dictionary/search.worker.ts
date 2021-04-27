import { Entry, SearchCommand } from "./types";
import { IDBPDatabase, openDB } from "idb";
import { parseQuery, checkQueries } from "./search";

let db: IDBPDatabase;
let lects: string[];
let key: symbol;

/**
 *
 * @param key_
 * @param queries
 * @returns
 */
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
  // if (e.data === "stop") {
  //   db?.close();
  //   key = Symbol("sk");
  //   return;
  // }
  // const data = JSON.parse(e.data) as SearchCommand;
  // if (Array.isArray(data)) {
  //   db = await openDB("avzag", 1);
  //   lects = data;
  //   return;
  // }
  // key = Symbol("sk");
  // const queries = parseQuery(data.query);
  // if (data.lect) {
  //   const meanings = await findMeanings(key, data.lect, queries);
  //   queryDictionaries(key, meanings);
  // } else queryDictionaries(key, queries);
};
