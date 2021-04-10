import { loadJSON, lects, root } from "@/store";
import { reactive, shallowRef, watch } from "vue";
import { DictionaryMeta } from "./types";
import { IDBPDatabase, openDB } from "idb";

export let db: IDBPDatabase;

export const processing = reactive({ loading: false, searching: false });
export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const lects_ = shallowRef([] as string[]);

const worker = new Worker("db-worker.js", { type: "module" });
worker.onmessage = async function (e) {
  processing.loading = false;
  lects_.value = e.data;
  db = await openDB("avzag", 1);
};

watch(lects, async () => {
  processing.loading = true;
  dictionaryMeta.value = await loadJSON("dictionary");
  worker.postMessage(root + "+" + lects.value.join("."));
});
