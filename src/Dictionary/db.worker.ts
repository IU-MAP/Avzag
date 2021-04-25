import { openDB, IDBPDatabase, deleteDB } from "idb";
import { loadLectsJSON } from "@/store";
import { Entry, DBState } from "./types";

let db: IDBPDatabase;

/**
 * cleans the whole database
 * @param lects languages user chose
 */
async function cleanDB(lects: string[]) {
  await deleteDB("avzag");
  db = await openDB("avzag", 1, {
    upgrade(db) {
      lects.map((l) => db.createObjectStore(l, { autoIncrement: true }));
    },
  });
}

/**
 * fills database with words from each chosen language
 * @param dictionaries words from each chosen language
 * @returns
 */
async function fillDB(dictionaries: Record<string, Entry[]>) {
  console.log(JSON.parse(JSON.stringify(dictionaries)));
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

/**
 * loads chosen languages
 * @param lects chosen languages
 * @returns
 */
async function load(lects: string[]) {
  postState("fetching", "Downloading files");
  if (pending) return postState("fetching");
  const dictionaries = await loadLectsJSON<Entry[]>("dictionary", lects);
  lects = Object.keys(dictionaries);
  postState("fetched", lects.toString());
  postState("preparing", "Preparing database");
  if (pending) return postState("fetching");
  await cleanDB(lects);
  if (pending) return postState("fetching");
  await fillDB(dictionaries);
  postState("ready");
}

/**
 * notifies main thread about the progress
 * @param state current state
 * @param text message for user
 */
function postState(state: DBState, text: string | string[] = "Loading") {
  postMessage(JSON.stringify({ state, text }));
}

let pending: undefined | (() => void);
let executing = false;

/**
 * a sequence of actions to do when a message from main thread comes
 */
onmessage = (e) => {
  const data = e.data as string;
  const call = async () => {
    executing = true;
    if (data === "stop") db?.close();
    else await load(JSON.parse(data));
    executing = false;
    if (pending) {
      const p = pending;
      pending = undefined;
      p();
    }
  };
  if (executing) pending = call;
  else call();
};
