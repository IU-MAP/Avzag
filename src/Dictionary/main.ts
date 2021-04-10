import { loadLectsJSON, loadJSON, lects } from "@/store";
import { computed, shallowRef, watch } from "vue";
import { Entry, Search, DictionaryMeta } from "./types";
import { IDBPDatabase, openDB } from "idb";

let db: IDBPDatabase;

export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const dictionaries = shallowRef<Record<string, Entry[]>>({});
export const dLects = computed(() => Object.keys(dictionaries.value));

async function cleanDB(lects: string[]) {
  const tx = db.transaction(lects, "readwrite");
  await Promise.all(lects.map((l) => tx.objectStore(l).clear()));
}

async function fillDB(dictionaries: Record<string, Entry[]>) {
  async function fillLect(lect: string, dictionary: Entry[]) {
    const st = tx.objectStore(lect);
    return Promise.all(
      dictionary.map((d) => st.put(d /* , d.forms[0].text.plain */))
    );
  }
  const lects = Object.keys(dictionaries);
  const tx = db.transaction(lects, "readwrite");

  await fillLect(lects[0], dictionaries[lects[0]]);
  // await Promise.all(
  //   lects.flatMap((l) =>
  //     dictionaries[l].map((d) =>
  //       tx.objectStore(l).put(d, d.forms[0].text.plain)
  //     )
  //   )
  // );
}

watch(lects, async () => {
  console.log("DB load started...");
  const t = Date.now();

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

  await cleanDB(dLects.value);
  await fillDB(dictionaries.value);

  console.log("DB load ended: ", (Date.now() - t) / 1000, "sec.");
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
