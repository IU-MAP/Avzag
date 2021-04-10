import { loadJSON, lects, root } from "@/store";
import { reactive, shallowRef, watch } from "vue";
import { DictionaryMeta } from "./types";
import { deleteDB, IDBPDatabase, openDB } from "idb";

export let db: IDBPDatabase;

export const processing = reactive({ loading: false, searching: false });
export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const lects_ = shallowRef([] as string[]);

let t = 0;
const worker = new Worker("./db-worker.ts");
worker.onmessage = function (e) {
  console.log("Db loaded in", (Date.now() - t) / 1000);
  processing.loading = false;
  lects_.value = e.data;
};

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

watch(lects, async () => {
  processing.loading = true;
  console.log("Loading DB...");
  t = Date.now();

  // fetching json
  dictionaryMeta.value = await loadJSON("dictionary");

  await cleanDB();
  worker.postMessage([root, lects.value]);
});
