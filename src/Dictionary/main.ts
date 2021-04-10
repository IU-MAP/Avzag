import { loadLectsJSON, loadJSON, lects } from "@/store";
import { computed, shallowRef, watch } from "vue";
import { Entry, Search, DictionaryMeta } from "./types";
import { IDBPDatabase, openDB } from "idb";

let db: IDBPDatabase;

export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const dictionaries = shallowRef<Record<string, Entry[]>>({});
export const dLects = computed(() => Object.keys(dictionaries.value));

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
    dLects.value.map(async (l) => {
      const d = dictionaries.value[l];
      const tx = db.transaction(l, "readwrite");
      return await Promise.all(
        d.map((d) => tx.store.put(d, d.forms[0].text.plain))
      );
    })
  );
});

async function queryDictionaries(
  ss_: symbol,
  query: string[],
  queryMode: string
) {
  function fits(e: Entry) {
    const area = queryMode === "Tags" ? e.tags ?? "" : e.translation;
    return query.some((q) => area?.includes(q));
  }

  const search = {} as Search;
  const tx = db.transaction(dLects.value);
  await Promise.all(
    dLects.value.map(async (l) => {
      let cr = await tx.objectStore(l).openCursor();
      while (cr) {
        if (ss !== ss_) return [];
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

async function findTranslations(ss_: symbol, lect: string, query: string[]) {
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
  return !lect
    ? queryDictionaries(ss, query, queryMode)
    : queryDictionaries(
        ss,
        await findTranslations(ss, lect, query),
        "Translation"
      );
}
