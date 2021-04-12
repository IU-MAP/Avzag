import { db, lects_, dbInfo } from "./main";
import { Entry, Search } from "./types";

async function queryDictionaries(query: string[], queryMode: string) {
  function fits(entry: Entry) {
    // check if the word fits in the query.
    const area = queryMode === "Tags" ? entry.tags ?? "" : entry.translation;
    return query.some((q) => area?.includes(q));
  }

  function push(entry: Entry, lect: string) {
    // add the word to the result under its translation.
    const t = entry.translation;
    if (!search[t]) search[t] = {};
    if (!search[t][lect]) search[t][lect] = [];
    search[t][lect].push(entry as Entry);
  }

  const search = {} as Search;
  const tx = db.transaction(lects_.value);

  for (const l of lects_.value) {
    console.log("Seaching in", l);
    let cr = await tx.objectStore(l).openCursor();
    while (cr) {
      const entry = cr.value as Entry;
      if (fits(entry)) push(entry, l);
      cr = await cr.continue();
    }
  }
  return search;
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
  if (dbInfo.state !== "ready") return {};
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
