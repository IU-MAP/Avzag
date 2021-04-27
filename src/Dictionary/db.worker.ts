import { openDB, IDBPDatabase, deleteDB } from "idb";
import { loadLectsJSON } from "@/store";
import { Entry } from "./types";

let db: IDBPDatabase;
let pending: undefined | (() => void);
let executing = false;

/**
 *
 * @param lects
 */
async function cleanDB(lects: string[]) {
  await deleteDB("avzag");
  if (pending) return;
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
  postMessage({ state: "loading" });
  for (const [l, ds] of Object.entries(dictionaries)) {
    const st = db.transaction(l, "readwrite").store;
    const puts = [];
    for (const d of ds) {
      if (pending) return;
      puts.push(st.add(d));
      if (!(puts.length % 1024))
        postMessage({
          state: "loading",
          lect: l,
          progress: puts.length / ds.length,
        });
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
  if (pending) return;
  postMessage({ state: "fetching" });
  const dictionaries = await loadLectsJSON<Entry[]>("dictionary", lects);
  lects = Object.keys(dictionaries);
  postMessage({ state: "fetched", lect: lects });
  if (pending) return;
  await cleanDB(lects);
  if (pending) return;
  await fillDB(dictionaries);
  db?.close();
  postMessage({ state: "ready" });
}

/**
 *
 */
onmessage = (e) => {
  const data = e.data as string;
  const call = async () => {
    executing = true;
    if (data !== "stop") await load(JSON.parse(data));
    executing = false;
    if (pending) {
      const p = pending;
      pending = undefined;
      p();
    }
  };
  if (executing) pending = call;
  else {
    pending = undefined;
    call();
  }
};
