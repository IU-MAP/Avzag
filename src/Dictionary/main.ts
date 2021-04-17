import { loadJSON, lects } from "@/store";
import { reactive, shallowRef, watch } from "vue";
import { DictionaryMeta, DBWorkerState } from "./types";
import { IDBPDatabase, openDB } from "idb";
// eslint-disable-next-line import/no-webpack-loader-syntax
import DBWorker from "worker-loader!./db.worker";
// eslint-disable-next-line import/no-webpack-loader-syntax
import SearchWorker from "worker-loader!./search.worker";

export const searchworker = new SearchWorker();

export const dbworker = new DBWorker();
dbworker.onmessage = ({ data }) => {
  const { state, text } = JSON.parse(data);
  connect(state, text);
};

export let db: IDBPDatabase;

export const dbInfo = reactive({
  state: "loading" as DBWorkerState,
  text: "",
});
export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const lects_ = shallowRef([] as string[]);

watch(lects, async () => {
  dictionaryMeta.value = await loadJSON("dictionary");
  dbworker.postMessage(JSON.stringify(lects.value));
});

async function connect(state: DBWorkerState, text: string) {
  dbInfo.state = state;
  if (state === "fetched") lects_.value = text.split(",");
  else if (state === "ready") {
    dbInfo.state = "opening";
    dbInfo.text = "Opening database";
    db = await openDB("avzag", 1);
    dbInfo.state = "ready";
    searchworker.postMessage(
      JSON.stringify({
        from: "main",
        args: null,
        lects: null,
      })
    );
  } else dbInfo.text = text;
}
