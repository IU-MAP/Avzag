import { Entry, SearchCommand } from "./types";
import { IDBPDatabase, openDB } from "idb";

let db: IDBPDatabase;
let lects: string[];
let stopping: boolean;

function fits(entry: Entry, query: string, forms = false) {
  if (query[0] === "#") return entry.tags?.includes(query.substr(1));
  const area = forms ? entry.forms.map((f) => f.plain) : entry.meanings;
  switch (query[0]) {
    case "*":
      return area.includes(query.substr(1));
    case "+":
      return area.some((a) => a.startsWith(query.substr(1)));
    case "-":
      return area.some((a) => a.endsWith(query.substr(1)));
    default:
      return area.some((a) => a.includes(query));
  }
}

async function queryDictionaries(query: string[]) {
  async function search(lect: string) {
    let cr = await db.transaction(lect).store.openCursor();
    while (cr) {
      if (stopping) return;
      const entry = cr.value as Entry;
      if (query.some((q) => fits(entry, q)))
        postMessage(JSON.stringify({ lect, entry }));
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
    const entry = cr.value as Entry;
    if (query.some((q) => fits(entry, q, true)))
      translations.add(entry.meanings[0]);
    cr = await cr.continue();
  }
  return [...translations];
}

onmessage = async (e) => {
  if (e.data === "stop") {
    db?.close();
    stopping = true;
    return;
  }
  const data = JSON.parse(e.data) as SearchCommand;
  if (Array.isArray(data)) {
    db = await openDB("avzag", 1);
    lects = data;
    return;
  }
  if (!lects) return;

  stopping = false;
  const { lect, query } = { ...data };
  if (lect) queryDictionaries(await findTranslations(lect, query));
  else queryDictionaries(query);
};
