import { loadJSON, lects } from "@/store";
import { reactive, shallowRef, watch } from "vue";
import { DictionaryMeta } from "./types";
import { IDBPDatabase, openDB } from "idb";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!./db.worker";

const worker = new Worker();
worker.onmessage = (e) => connect(e.data);

export let db: IDBPDatabase;

type DBState = {
  state: "ready" | "opening" | "preparing" | "fetching" | "fetched" | "loading";
  lects: string | string[];
  text: string;
};

export const processing = reactive<{ dbState: DBState; searching: boolean }>({
  dbState: { state: "loading", lects: "", text: "" },
  searching: false,
});
export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const lects_ = shallowRef([] as string[]);

watch(lects, async () => {
  dictionaryMeta.value = await loadJSON("dictionary");
  worker.postMessage(JSON.stringify(lects.value));
});

async function connect(data: string) {
  const { state, lects } = JSON.parse(data) as DBState;
  processing.dbState.state = state;

  if (state === "fetched") lects_.value = lects as string[];
  else if (state === "fetching")
    processing.dbState.text = "Fetching data from server...";
  else if (state === "preparing")
    processing.dbState.text = "Preparing database...";
  else if (state === "loading") {
    processing.dbState.lects = lects;
    processing.dbState.text = `Loading ${lects} (${
      lects_.value.indexOf(lects as string) + 1
    }/${lects_.value.length})...`;
  } else if (state === "ready") {
    processing.dbState.state = "opening";
    processing.dbState.text = "Opening database...";
    db = await openDB("avzag", 1);
    processing.dbState.state = "ready";
  }
}
