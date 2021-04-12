import { db, lects_, dbInfo } from "./main";
import { Entry, Search } from "./types";

async function queryDictionaries(query: string[], queryMode: string) {
  function fits(entry: Entry) {
    const area = queryMode === "Tags" ? entry.tags ?? "" : entry.translation;
    return query.some((q) => area?.includes(q));
  }
  function push(entry: Entry, lect: string) {
    const t = entry.translation;
    if (!search[t]) search[t] = {};
    if (!search[t][lect]) search[t][lect] = [];
    search[t][lect].push(entry as Entry);
  }

  const search = {} as Search;
  const tx = db.transaction(lects_.value);

  for (const l of lects_.value) {
    console.log("looking in", l, "with");
    let cr = await tx.objectStore(l).openCursor();
    while (cr) {
      console.log("looking in", l);
      const entry = cr.value as Entry;
      if (fits(entry)) push(entry, l);
      cr = await cr.continue();
    }
  }
  return search;
}

async function findTranslations(lect: string, query: string[]) {
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
  // if (dbInfo.state !== "ready") return {};
  // const results = !lect
  //   ? await queryDictionaries(query, queryMode)
  //   : await queryDictionaries(
  //       await findTranslations(lect, query),
  //       "Translation"
  //     );
  // return results;
  return {};
}
