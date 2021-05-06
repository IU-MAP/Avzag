import { Entry, SearchCommand } from "./types";
import { IDBPDatabase, openDB } from "idb";
import { parseQuery, checkQueries } from "./search";

let db: IDBPDatabase;
let lects: string[];
let pending: null | (() => void);
let executing = false;

/**
 * @param key_ id of request
 * @param queries queries from user
 * @returns ???
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

/**
 * @param key_ id of query
 * @param lect language
 * @param queries queries to find meanings of
 * @returns meanings if found
 */
async function findMeanings(key_: symbol, lect: string, queries: string[][]) {
  // look through all forms in the language and collect their translations.
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

/**
 * @param key_ id of query
 * @param lect language
 * @param queries queries to find meanings of
 * @returns meanings if found
 */
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

/**
 * a sequence of actions to do when a message from main thread comes
 */
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
  const queries = parseQuery(data.query);
  if (data.lect) {
    const meanings = await findMeanings(key, data.lect, queries);
    queryDictionaries(key, meanings);
  } else queryDictionaries(key, queries);
};