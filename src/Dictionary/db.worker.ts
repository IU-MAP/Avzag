import { openDB, IDBPDatabase, deleteDB } from "idb";
import { loadLectsJSON } from "@/store";
import { Entry } from "./types";

let pending: null | (() => void);
let executing = false;

/**
 *
 * @param lects
 */
async function cleanDB(lects: string[]) {
  await deleteDB("avzag");
  return await openDB("avzag", 1, {
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
async function fillDB(db: IDBPDatabase, dictionaries: Record<string, Entry[]>) {
  postMessage({ state: "loading" });
  for (const [l, ds] of Object.entries(dictionaries)) {
    const st = db.transaction(l, "readwrite").store;
    const puts = [];
    for (const d of ds) {
      puts.push(st.add(d));
      if (!(puts.length % 1024))
        postMessage({
          state: "loading",
          lect: l,
          progress: puts.length / ds.length,
        });
    }
    await Promise.all(puts);
    if (pending) return;
  }
}

/**
 *
 * @param lects
 * @returns
 */
async function load(lects: string[]) {
  postMessage({ state: "fetching" });
  const dictionaries = await loadLectsJSON<Entry[]>("dictionary", lects);
  lects = Object.keys(dictionaries);
  postMessage({ state: "fetched", lect: lects });

  const db = await cleanDB(lects);
  await fillDB(db, dictionaries);
  db.close();
  postMessage({ state: pending ? "ready" : "loading" });
}

/**
 *
 */

async function init(data: string | string[]) {
  pending = null;
  executing = true;
  if (data !== "stop") await load(data as string[]);
  executing = false;
  if (pending) {
    const p = pending;
    pending = null;
    (p as () => void)();
  }
}

onmessage = (e) => {
  const data = e.data === "stop" ? e.data : e.data.split(",");
  if (executing) pending = () => init(data);
  else init(data);
};
