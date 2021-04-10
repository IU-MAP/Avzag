import { loadLectsJSON, loadJSON, lects } from "@/store";
import { shallowRef, watch } from "vue";
import { Entry, Search, DictionaryMeta } from "./types";
import { IDBPDatabase, openDB } from "idb";

let db: IDBPDatabase;

export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const dictionaries = shallowRef<Record<string, Entry[]>>({});

watch(lects, async () => {
  dictionaries.value = {};
  dictionaryMeta.value = undefined;
  dictionaries.value = await loadLectsJSON<Entry[]>("dictionary");
  dictionaryMeta.value = await loadJSON("dictionary");

  if (!db)
    db = await openDB("avzag", 1, {
      upgrade(db) {
        lects.value.forEach((l) => {
          if (db.objectStoreNames.contains(l)) db.deleteObjectStore(l);
          db.createObjectStore(l, { autoIncrement: true });
        });
      },
    });
  await Promise.all(
    lects.value.map(async (l) => {
      const d = dictionaries.value[l];
      const tx = db.transaction(l, "readwrite");
      return await Promise.all(
        d.map((d) => tx.store.put(d, d.forms[0].text.plain))
      );
    })
  );
});

function queryDictionaries(query: string[], queryMode: string) {
  return query.reduce((search, query) => {
    Object.entries(dictionaries.value).forEach(([lect, dictionary]) => {
      dictionary
        .filter((entry) =>
          (queryMode === "Tags"
            ? entry.tags ?? ""
            : entry.translation
          )?.includes(query)
        )
        .forEach((entry) => {
          const translation = entry.translation;
          if (!search[translation]) search[translation] = {};
          if (!search[translation][lect]) search[translation][lect] = [];
          search[translation][lect].push(entry);
        });
    });
    return search;
  }, {} as Search);
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
  return !lect
    ? queryDictionaries(query, queryMode)
    : queryDictionaries(await findTranslations(lect, query), "Translation");
}
