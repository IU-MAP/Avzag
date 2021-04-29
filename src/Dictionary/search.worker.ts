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

  await Promise.all(lects.map((l) => search(l)));
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
  if (data === "stop") db?.close();
  else if (Array.isArray(data)) {
    db = await openDB("avzag", 1);
    lects = data;
  } else {
    const queries = parseQuery(data.query);
    if (queries.length)
      if (data.lect) {
        const meanings = await findMeanings(data.lect, queries);
        if (meanings.length) queryDictionaries(meanings);
      } else queryDictionaries(queries);
  }
}

onmessage = (e) => {
  const call = async () => {
    pending = null;
    executing = true;
    await init(e.data);
    executing = false;
    if (pending) {
      const p = pending;
      pending = null;
      (p as () => void)();
    }
  };
  if (executing) pending = call;
  else call();
};
