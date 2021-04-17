import { openDB, deleteDB, IDBPDatabase } from "idb";
import { loadLectsJSON } from "@/store";
import { Entry, DBWorkerState } from "./types";

let db: IDBPDatabase;

async function cleanDB(lects: string[]) {
  if (pending) return;
  console.log("sueta");
  await deleteDB("avzag");
  console.log("deleted");
  if (pending) return;
  db = await openDB("avzag", 1, {
    upgrade(db) {
      console.log("upgraded");
      for (const l of lects) {
        if (pending) return;
        if (db.objectStoreNames.contains(l)) db.deleteObjectStore(l);
        db.createObjectStore(l, { autoIncrement: true });
      }
    },
  });
}

async function fillDB(dictionaries: Record<string, Entry[]>) {
  postState("loading");
  const size = Object.values(dictionaries).reduce((s, d) => s + d.length, 0);
  const step = 1024;
  let done = 0;

  for (const [l, ds] of Object.entries(dictionaries)) {
    const st = db.transaction(l, "readwrite").store;
    const current = ds.length;
    const puts = [];
    for (const d of ds) {
      if (pending) return;
      puts.push(st.add(d));
      if (!(puts.length % step)) {
        done += step;
        const progress = Math.round((done / size) * 100);
        postState(
          "loading",
          `[${progress}%] Loading ${l} - ${puts.length} of ${current}`
        );
      }
    }
    await Promise.all(puts);
  }
}

async function load(lects: string[]) {
  postState("fetching", "Downloading files");
  if (pending) return;
  const dictionaries = await loadLectsJSON<Entry[]>("dictionary", lects);
  lects = Object.keys(dictionaries);
  postState("fetched", lects.toString());

  postState("preparing", "Preparing database");
  if (pending) return;
  await cleanDB(lects);
  if (pending) return;
  await fillDB(dictionaries);
  postState("ready");
}

function postState(state: DBWorkerState, text: string | string[] = "Loading") {
  postMessage(JSON.stringify({ state, text }));
}

let pending: undefined | (() => void);
let executing = false;

onmessage = (e) => {
  const data = e.data as string;
  console.log(data);
  const call = async () => {
    executing = true;
    if (data !== "stop") await load(JSON.parse(data));
    executing = false;
    if (pending) {
      pending();
      pending = undefined;
    }
  };
  if (executing) pending = call;
  else call();
};
