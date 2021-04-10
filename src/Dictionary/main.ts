import { loadLectsJSON, loadJSON, lects } from "@/store";
import { ref, shallowRef, watch } from "vue";
import { Entry, Search, DictionaryMeta } from "./types";
import { deleteDB, IDBPDatabase, openDB } from "idb";

let db: IDBPDatabase;

export const isLoading = ref(false);
export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const dictionaries = shallowRef<Record<string, Entry[]>>({});
export const dLects = shallowRef([] as string[]);

async function cleanDB(lects: string[]) {
  const tx = db.transaction(lects, "readwrite");
  await Promise.all(lects.map((l) => tx.objectStore(l).clear()));
}

async function fillDB(dictionaries: Record<string, Entry[]>) {
  async function fillLect(lect: string, dictionary: Entry[]) {
    const st = tx.objectStore(lect);
    return dictionary.map((d) => st.put(d /* , d.forms[0].text.plain */));
  }
  const lects = Object.keys(dictionaries);
  const tx = db.transaction(lects, "readwrite");
  return await Promise.all(lects.flatMap((l) => fillLect(l, dictionaries[l])));
}

watch(lects, async () => {
  const t = Date.now();
  console.log("DB building...");
  isLoading.value = true;

  dictionaries.value = {};
  dictionaryMeta.value = undefined;
  dictionaries.value = await loadLectsJSON<Entry[]>("dictionary");
  dictionaryMeta.value = await loadJSON("dictionary");
  dLects.value = Object.keys(dictionaries.value);

  console.log(
    "DB entries: ",
    Object.values(dictionaries.value).reduce((s, d) => s + d.length, 0)
  );

  await deleteDB("avzag");
  db = await openDB("avzag", 1, {
    upgrade(db) {
      dLects.value.forEach((l) => {
        if (db.objectStoreNames.contains(l)) db.deleteObjectStore(l);
        db.createObjectStore(l, { autoIncrement: true });
      });
    },
  });

  await cleanDB(dLects.value);
  await fillDB(dictionaries.value);

  dLects.value.forEach((l) => delete dictionaries.value[l]);
  isLoading.value = false;
  console.log("DB loaded: ", (Date.now() - t) / 1000, "sec.");
});

async function queryDictionaries(query: string[], queryMode: string) {
  const ss_ = ss;
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
  return !lect
    ? queryDictionaries(query, queryMode)
    : queryDictionaries(await findTranslations(lect, query), "Translation");
}
