import { db, lects_, processing } from "./main";
import { Entry, Search } from "./types";

async function queryDictionaries(query: string[], queryMode: string) {
  const ss_ = ss;
  function fits(e: Entry) {
    const area = queryMode === "Tags" ? e.tags ?? "" : e.translation;
    return query.some((q) => area?.includes(q));
  }

  const search = {} as Search;
  const tx = db.transaction(lects_.value);
  await Promise.all(
    lects_.value.map(async (l) => {
      let cr = await tx.objectStore(l).openCursor();
      while (cr) {
        if (ss !== ss_) return {};
        const entry = cr.value as Entry;
        if (fits(entry)) {
          const ts = entry.translation;
          if (!search[ts]) search[ts] = {};
          if (!search[ts][l]) search[ts][l] = [];
          search[ts][l].push(cr.value as Entry);
        }
        cr = await cr.continue();
      }
    })
  );
  return search;
}

async function findTranslations(lect: string, query: string[]) {
  const ss_ = ss;
  const translations = new Set<string>();
  let cr = await db.transaction(lect).store.openCursor();
  while (cr) {
    if (ss !== ss_) return [];
    const { forms, translation } = cr.value as Entry;
    if (forms.some(({ text }) => query.some((q) => text.plain.includes(q))))
      translations.add(translation);
    cr = await cr.continue();
  }
  return [...translations];
}

let ss = Symbol("srch");

export async function search(
  lect: string,
  query: string[],
  queryMode = "Translation"
) {
  if (!db) return {};
  ss = Symbol("srch");

  processing.searching = true;

  const results = !lect
    ? queryDictionaries(query, queryMode)
    : queryDictionaries(await findTranslations(lect, query), "Translation");

  processing.searching = false;
  return results;
}
