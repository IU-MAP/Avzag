import { loadLectsJSON, loadJSON, lects } from "@/store";
import { reactive, shallowRef, watch } from "vue";
import { Entry, DictionaryMeta } from "./types";
import { deleteDB, IDBPDatabase, openDB } from "idb";

export let db: IDBPDatabase;

export const processing = reactive({ loading: false, searching: false });
export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const dictionaries = shallowRef<Record<string, Entry[]>>({});
export const lects_ = shallowRef([] as string[]);

// async function cleanDB(lects: string[]) {
//   const tx = db.transaction(lects, "readwrite");
//   await Promise.all(lects.map((l) => tx.objectStore(l).clear()));
// }

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
  processing.loading = true;

  // fetching json
  dictionaries.value = await loadLectsJSON<Entry[]>("dictionary");
  dictionaryMeta.value = await loadJSON("dictionary");
  lects_.value = Object.keys(dictionaries.value);

  console.log(
    "DB entries: ",
    Object.values(dictionaries.value).reduce((s, d) => s + d.length, 0)
  );

  // make new db with tables per lang
  await deleteDB("avzag");
  db = await openDB("avzag", 1, {
    upgrade(db) {
      lects_.value.forEach((l) => {
        if (db.objectStoreNames.contains(l)) db.deleteObjectStore(l);
        db.createObjectStore(l, { autoIncrement: true });
      });
    },
  });

  // await cleanDB(dLects.value);
  await fillDB(dictionaries.value);

  // delete json from ram
  lects_.value.forEach((l) => delete dictionaries.value[l]);
  processing.loading = false;
  console.log("DB loaded: ", (Date.now() - t) / 1000, "sec.");
});
