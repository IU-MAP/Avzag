import { openDB, IDBPDatabase, deleteDB } from "idb";
import { loadLectsJSON } from "@/store";
import { Entry, DBState } from "./types";

let db: IDBPDatabase;

/**
 *
 * @param lects
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
 *
 * @param dictionaries
 * @returns
 */
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

/**
 *
 * @param lects
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
 *
 * @param state
 * @param text
 */
function postState(
  state: DBState,
  lect?: string,
  percent?: number,
  text?: string
) {
  postMessage(JSON.stringify({ state, lect, text, percent }));
}

let pending: undefined | (() => void);
let executing = false;

/**
 *
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
