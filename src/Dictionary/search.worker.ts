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
  async function search(lect: string) {
    let cr = await db.transaction(lect).store.openCursor();
    while (cr) {
      const entry = cr.value as Entry;
      const meanings = checkQueries(entry, queries);
      if (meanings.length) postMessage({ lect, meanings, entry });

      cr = await cr.continue();
      if (key !== key_) return;
    }
  }

  if (!queries.length) return;
  await Promise.all(lects.map((l) => search(l)));
  postMessage({ lect: "" });
}

async function findMeanings(key_: symbol, lect: string, queries: string[][]) {
  const meanings = new Set<string>();
  let cr = await db.transaction(lect).store.openCursor();
  while (cr) {
    const entry = cr.value as Entry;
    checkQueries(entry, queries, true).forEach((m) => meanings.add(m));

    cr = await cr.continue();
    if (key !== key_) return [];
  }
  return [...meanings].map((m) => ["!" + m]);
}

async function init(data: SearchCommand) {
  if (data === "stop") db?.close();
  else if (Array.isArray(data)) {
    db = await openDB("avzag", 1);
    lects = data;
  } else {
    key = Symbol("sk");
    const queries = parseQuery(data.query);
    if (data.lect) {
      const meanings = await findMeanings(key, data.lect, queries);
      queryDictionaries(key, meanings);
    } else queryDictionaries(key, queries);
  }
}

onmessage = (e) => init(e.data);
