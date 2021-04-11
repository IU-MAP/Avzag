import { loadJSON, lects, root } from "@/store";
import { reactive, shallowRef, watch } from "vue";
import { DictionaryMeta } from "./types";
import { IDBPDatabase, openDB } from "idb";

export let db: IDBPDatabase;

export const processing = reactive({ loading: false, searching: false });
export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const lects_ = shallowRef([] as string[]);

const worker = new Worker("db-worker.js", { type: "module" });
worker.onmessage = (e) => connect(e.data);

watch(lects, async () => {
  processing.loading = true;
  dictionaryMeta.value = await loadJSON("dictionary");
  // await connect(lects.value);
  worker.postMessage(root + "+" + lects.value.join("."));
});

async function connect(lects: string[]) {
  db = await openDB("avzag", 1);
  lects_.value = lects;
  processing.loading = false;
}
