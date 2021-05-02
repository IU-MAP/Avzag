import { openDB, IDBPDatabase, deleteDB } from "idb";
import { Entry } from "./types";

let db: IDBPDatabase;
let pending: null | (() => void);
let executing = false;

/**
 *
 * @param lects
 */
async function cleanDB(lects: string[]) {
  db?.close();
  await deleteDB("dictionary");
  db = await openDB("dictionary", 1, {
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
      puts.push(st.add(d));
      if (!(puts.length % 1024)) {
        postMessage({
          state: "loading",
          lect: l,
          progress: puts.length / ds.length,
        });
        await Promise.all(puts);
        if (pending) return;
      }
    }
  }
}

/**
 *
 * @param lects
 * @returns
 */

/**
 *
 */

async function init(data: "stop" | Record<string, Entry[]>) {
  if (data === "stop") return db?.close();
  postMessage({ state: "fetching" });
  const lects = Object.keys(data);
  postMessage({ state: "fetched", lect: lects });

  await cleanDB(lects);
  await fillDB(data);
  db.close();
  if (!pending) postMessage({ state: "ready" });
}

onmessage = (e) => {
  const call = async () => {
    pending = null;
    executing = true;
    await init(e.data);
    executing = false;
    if (pending) {
      const p = pending;
      pending = null;
      (p as () => void)();
    }
  };
  if (executing) pending = call;
  else call();
};
