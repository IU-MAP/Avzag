import { Entry, SearchCommand } from "./types";
import { IDBPDatabase, openDB } from "idb";
import { parseQuery, checkQueries } from "./search";

let db: IDBPDatabase;
let lects: string[];
let pending: null | (() => void);
let executing = false;

/**
 *
 * @param key_
 * @param queries
 * @returns
 */
async function queryDictionaries(queries: string[][]) {
  async function search(lect: string) {
    let cr = await db.transaction(lect).store.openCursor();
    while (cr) {
      const entry = cr.value as Entry;
      const meanings = checkQueries(entry, queries);
      if (meanings.length) postMessage({ lect, meanings, entry });

      cr = await cr.continue();
      if (pending) return;
    }
  }

  if (queries.length) await Promise.all(lects.map((l) => search(l)));
  if (!pending) postMessage({ lect: "" });
}

async function findMeanings(lect: string, queries: string[][]) {
  const meanings = new Set<string>();
  let cr = await db.transaction(lect).store.openCursor();
  while (cr) {
    const entry = cr.value as Entry;
    checkQueries(entry, queries, true).forEach((m) => meanings.add(m));

    cr = await cr.continue();
    if (pending) return [];
  }
  return [...meanings].map((m) => ["!" + m]);
}

async function init(data: SearchCommand) {
  pending = null;
  executing = true;

  if (data === "stop") db?.close();
  else if (Array.isArray(data)) {
    db = await openDB("avzag", 1);
    lects = data;
  } else {
    const queries = parseQuery(data.query);
    if (data.lect) {
      const meanings = await findMeanings(data.lect, queries);
      queryDictionaries(meanings);
    } else queryDictionaries(queries);
  }

  executing = false;
  if (pending) {
    const p = pending;
    pending = null;
    (p as () => void)();
  }
}

onmessage = (e) => {
  if (executing) pending = () => init(e.data);
  else init(e.data);
};
