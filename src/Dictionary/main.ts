import { loadJSON, lects, root } from "@/store";
import { reactive, shallowRef, watch } from "vue";
import { DictionaryMeta } from "./types";
import { deleteDB, IDBPDatabase, openDB } from "idb";

export let db: IDBPDatabase;

export const processing = reactive({ loading: false, searching: false });
export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const lects_ = shallowRef([] as string[]);

let t = 0;
const worker = new Worker("db-worker.js");
worker.onmessage = function (e) {
  console.log("Db loaded in", (Date.now() - t) / 1000);
  processing.loading = false;
  lects_.value = e.data;
};

watch(lects, async () => {
  processing.loading = true;
  console.log("Loading DB...");
  t = Date.now();

  dictionaryMeta.value = await loadJSON("dictionary");
  worker.postMessage(root + "+" + lects.value.join("."));
});
