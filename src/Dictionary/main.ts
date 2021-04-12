import { loadJSON, lects } from "@/store";
import { reactive, shallowRef, watch } from "vue";
import { DictionaryMeta, DBWorkerInfo } from "./types";
import { IDBPDatabase, openDB } from "idb";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!./db.worker";

const worker = new Worker();
worker.onmessage = (e) => connect(e.data);

export let db: IDBPDatabase;

export const dbState = reactive({
  state: "loading",
  lects: "",
  text: "",
} as DBWorkerInfo);
export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const lects_ = shallowRef([] as string[]);

watch(lects, async () => {
  dictionaryMeta.value = await loadJSON("dictionary");
  worker.postMessage(JSON.stringify(lects.value));
});

async function connect(data: string) {
  const { state, lects } = JSON.parse(data) as DBWorkerInfo;
  dbState.state = state;

  switch (state) {
    case "fetched":
      lects_.value = lects as string[];
      break;
    case "fetching":
      dbState.text = "Fetching data from server...";
      break;
    case "preparing":
      dbState.text = "Preparing database...";
      break;
    case "loading":
      dbState.lects = lects;
      dbState.text = `Loading ${lects} (${
        lects_.value.indexOf(lects as string) + 1
      }/${lects_.value.length})...`;
      break;
    case "ready":
      dbState.state = "opening";
      dbState.text = "Opening database...";
      db = await openDB("avzag", 1);
      dbState.state = "ready";
      break;
  }
}
