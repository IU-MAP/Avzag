import { Entry, Search, SearchWorkerCommand } from "./types";
import { IDBPDatabase, openDB } from "idb";

let db: IDBPDatabase;
let lects: string[];

async function queryDictionaries(query: string[], queryMode: string) {
  function fits(entry: Entry) {
    // check if the word fits in the query.
    const area = queryMode === "Tags" ? entry.tags ?? "" : entry.translation;
    return query.some((q) => area?.includes(q));
  }

  async function search(lect: string) {
    let cr = await db.transaction(lect).store.openCursor();
    while (cr) {
      console.log("Seaching in", lect);
      const entry = cr.value as Entry;
      if (fits(entry)) postMessage({ lect, entry });
      cr = await cr.continue();
    }
  }

  const results = {} as Search;
  await Promise.all(lects.map((l) => search(l)));
  return results;
}

async function findTranslations(lect: string, query: string[]) {
  // look through all forms in the language and collect their translations.
  const translations = new Set<string>();

  let cr = await db.transaction(lect).store.openCursor();
  while (cr) {
    const { forms, translation } = cr.value as Entry;
    if (forms.some(({ text }) => query.some((q) => text.plain.includes(q))))
      translations.add(translation);
    cr = await cr.continue();
  }

  return [...translations];
}

export async function search(
  lect: string,
  query: string[],
  queryMode = "Translation"
) {
  // if no target language, then user gave meaning (translation);
  // otherwise we need to get translation from the form first.
  const results = !lect
    ? await queryDictionaries(query, queryMode)
    : await queryDictionaries(
        await findTranslations(lect, query),
        "Translation"
      );
  return results;
}

onmessage = async (e) => {
  console.log(e.data);
  const data = JSON.parse(e.data) as SearchWorkerCommand;
  if (Array.isArray(data)) {
    db = await openDB("avzag", 1);
    lects = data;
    return;
  }
  if (!lects) return;
  const searchResult = await search(data.lect, data.query, data.queryMode);
  postMessage(JSON.stringify(searchResult));
};
