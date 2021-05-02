import { loadJSON, lects, storage } from "@/store";
import { reactive, ref, shallowRef, toRaw, watch } from "vue";
import {
  DictionaryMeta,
  SearchResults,
  SearchOccurence,
  DBInfo,
} from "./types";
/* eslint-disable import/no-webpack-loader-syntax */
import DBWorker from "worker-loader!./db.worker";
import SearchWorker from "worker-loader!./search.worker";
import { openDB } from "idb";

export const searchworker = new SearchWorker();
searchworker.onmessage = (e) => receiveSearch(e.data);
export const searchInfo = reactive({
  searching: false,
  results: {} as SearchResults,
});

export const dbworker = new DBWorker();
export const dbInfo = ref({ state: "loading" } as DBInfo);
dbworker.onmessage = (e) => (dbInfo.value = e.data);
watch(
  () => dbInfo.value,
  () => {
    if (dbInfo.value.state === "fetched")
      lects_.value = dbInfo.value.lect as string[];
    else if (dbInfo.value.state === "ready") {
      storage.setItem("dictionary", Date.now());
      searchworker.postMessage(toRaw(lects_.value));
    }
  }
);

export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const lects_ = shallowRef([] as string[]);

watch(lects, async (lects) => {
  dbInfo.value.state = "fetching";
  dictionaryMeta.value = await loadJSON("dictionary");

  if (
    ((await storage.getItem<number>("lects")) ?? 0) >=
    ((await storage.getItem<number>("dictionary")) ?? 0)
  )
    return dbworker.postMessage(toRaw(lects));

  const db = await openDB("dictionary");
  lects_.value = [];
  for (const l of db.objectStoreNames) lects_.value.push(l);
  db.close();

  searchworker.postMessage(toRaw(lects_.value));
  dbInfo.value.state = "ready";
});

async function receiveSearch(occerence: SearchOccurence) {
  const { lect, meanings, entry } = occerence;
  if (!lect) {
    searchInfo.searching = false;
    return;
  }
  for (const t of meanings) {
    if (!searchInfo.results[t]) searchInfo.results[t] = {};
    if (!searchInfo.results[t][lect]) searchInfo.results[t][lect] = [];
    searchInfo.results[t][lect].push(entry);
  }
}
