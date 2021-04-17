import { loadJSON, lects } from "@/store";
import { reactive, shallowRef, watch } from "vue";
import { DictionaryMeta, DBWorkerState } from "./types";
/* eslint-disable import/no-webpack-loader-syntax */
import DBWorker from "worker-loader!./db.worker";
import SearchWorker from "worker-loader!./search.worker";

export const searchworker = new SearchWorker();

export const dbworker = new DBWorker();
dbworker.onmessage = ({ data }) => {
  const { state, text } = JSON.parse(data);
  connect(state, text);
};

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
  else {
    dbInfo.text = text;
    if (state === "ready")
      searchworker.postMessage(JSON.stringify(lects_.value));
  }
}
