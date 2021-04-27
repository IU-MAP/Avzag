import { loadJSON, lects, lastUpdated } from "@/store";
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
    else if (dbInfo.value.state === "ready")
      searchworker.postMessage(toRaw(lects_.value));
  }
);

export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const lects_ = shallowRef([] as string[]);

watch(lects, async (lects) => {
  dbInfo.value.state = "fetching";
  dictionaryMeta.value = await loadJSON("dictionary");
  if ((lastUpdated.lects ?? 0) <= (lastUpdated.db ?? 0))
    dbInfo.value.state = "ready";
  else {
    lastUpdated.db = Date.now();
    dbworker.postMessage(toRaw(lects));
  }
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
