import { openDB, IDBPDatabase, deleteDB } from "idb";
import { loadLectsJSON } from "src/Dictionary/store";
import { Entry, DBState } from "./types";

let db: IDBPDatabase;
const storeName = "lects";
/**
 *
 * @param lects
 */
async function cleanDB(lects: string[]) {
  console.log("cleaning db");
  // await deleteDB("avzag");
  db = await openDB("avzag", 1, {
    upgrade(db) {
      console.log("updating too");
      const objectStore = db.createObjectStore(storeName, {
        autoIncrement: true,
      });
      objectStore.createIndex("language", "language", { unique: false });

      const langStore = db.createObjectStore("languageList", {
        autoIncrement: true,
      });
      for (const l of lects) {
        langStore.add(l);
      }
    },
  });

  const st = db.transaction("languageList", "readwrite").store;
  const lanugageList = await st.getAll();

  for (const l of lanugageList) {
    console.log("for each language", l);
    console.log("does not it include?", !lects.includes(l));
    /*
      code has been taken from: 
        https://stackoverflow.com/questions/18603993/deleting-multiple-records-in-indexeddb-based-on-index
    */
    if (!lects.includes(l)) {
      console.log("deleting records for language:", l);
      const tx = db.transaction(storeName, "readwrite");
      const index = tx.store.index("language");
      const pdestroy = index.openCursor(IDBKeyRange.only(l));
      pdestroy.then(async (cursor) => {
        while (cursor) {
          cursor.delete();
          cursor = await cursor.continue();
        }
      });
    }
  }
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
    const st = db.transaction(storeName, "readwrite").store;
    const current = ds.length;
    const puts = [];
    for (const d of ds) {
      if (pending) return;
      d.language = l;
      // console.log(d);
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
function postState(state: DBState, text: string | string[] = "Loading") {
  postMessage(JSON.stringify({ state, text }));
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
