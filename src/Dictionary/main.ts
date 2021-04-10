import { loadLectsJSON, loadJSON, lects } from "@/store";
import { reactive, shallowRef, watch } from "vue";
import { Entry, DictionaryMeta } from "./types";
import { deleteDB, IDBPDatabase, openDB } from "idb";

export let db: IDBPDatabase;

export const processing = reactive({ loading: false, searching: false });
export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const lects_ = shallowRef([] as string[]);

async function cleanDB() {
  await deleteDB("avzag");
  db = await openDB("avzag", 1, {
    upgrade(db) {
      lects_.value.forEach((l) => {
        if (db.objectStoreNames.contains(l)) db.deleteObjectStore(l);
        db.createObjectStore(l, { autoIncrement: true });
      });
    },
  });
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
  console.log("DB...");
  processing.loading = true;

  // fetching json
  const dictionaries = await loadLectsJSON<Entry[]>("dictionary");
  dictionaryMeta.value = await loadJSON("dictionary");
  lects_.value = Object.keys(dictionaries);

  console.log(
    "... of",
    Object.values(dictionaries).reduce((s, d) => s + d.length, 0),
    "entries..."
  );

  await cleanDB();
  await fillDB(dictionaries);

  processing.loading = false;
  console.log("is loaded in", (Date.now() - t) / 1000, "sec.");
});
