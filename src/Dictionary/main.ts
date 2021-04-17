import { loadJSON, lects } from "@/store";
import { reactive, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import { DictionaryMeta, DBWorkerState } from "./types";
import { IDBPDatabase, openDB } from "idb";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!./db.worker";

const worker = new Worker();
worker.onmessage = ({ data }) => {
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

const route = useRoute();
watch(
  () => route.name,
  () => {
    if (route.name === "Home") worker.postMessage("stop");
  }
);
watch(lects, async () => {
  dictionaryMeta.value = await loadJSON("dictionary");
  worker.postMessage(JSON.stringify(lects.value));
});

async function connect(state: DBWorkerState, text: string) {
  dbInfo.state = state;
  if (state === "fetched") lects_.value = text.split(",");
  else if (state === "ready") {
    dbInfo.state = "opening";
    dbInfo.text = "Opening database";
    db = await openDB("avzag", 1);
    dbInfo.state = "ready";
  } else dbInfo.text = text;
}
