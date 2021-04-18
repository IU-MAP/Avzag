import { Entry, SearchWorkerCommand } from "./types";
import { IDBPDatabase, openDB } from "idb";

let db: IDBPDatabase;
let lects: string[];
let stopping: boolean;

async function queryDictionaries(query: string[], queryMode = "Translation") {
  function fits(entry: Entry) {
    // check if the word fits in the query.
    const area = queryMode === "Tags" ? entry.tags ?? "" : entry.translation;
    return query.some((q) => area?.includes(q));
  }
  async function search(lect: string) {
    let cr = await db.transaction(lect).store.openCursor();
    while (cr) {
      if (stopping) return;
      const entry = cr.value as Entry;
      if (fits(entry)) postMessage(JSON.stringify({ lect, entry }));
      cr = await cr.continue();
    }
  }
  await Promise.all(lects.map((l) => search(l)));
  postMessage(JSON.stringify({ lect: "" }));
}

async function findTranslations(lect: string, query: string[]) {
  // look through all forms in the language and collect their translations.
  const translations = new Set<string>();
  let cr = await db.transaction(lect).store.openCursor();
  while (cr) {
    if (stopping) return [];
    const { forms, translation } = cr.value as Entry;
    if (forms.some(({ text }) => query.some((q) => text.plain.includes(q))))
      translations.add(translation);
    cr = await cr.continue();
  }
  return [...translations];
}

onmessage = async (e) => {
  if (e.data === "stop") {
    stopping = true;
    return;
  }
  const data = JSON.parse(e.data) as SearchWorkerCommand;
  if (Array.isArray(data)) {
    db = await openDB("avzag", 1);
    lects = data;
    return;
  }
  if (!lects) return;

  stopping = false;
  const { lect, query, queryMode } = { ...data };
  if (lect) queryDictionaries(await findTranslations(lect, query));
  else queryDictionaries(query, queryMode);
};
