import { openDB, IDBPDatabase, deleteDB } from "idb";
import { loadLectsJSON } from "@/store";
import { Entry, DBState } from "./types";

let db: IDBPDatabase;
const storeName = "lects";
let version = 1;
let storesNames: string[] = [];

/**
 *
 * @param lects
 */
async function cleanDB(lects: string[]) {
  console.log("cleaning db");
  // await deleteDB("avzag");
  console.log("should I delete?");
  let isChanged = false;
  for (const tableName of storesNames) {
    if (!lects.includes(tableName)) {
      isChanged = true;
      // break;
    }
  }
  if (isChanged) {
    version++;
    console.log("yes, I should. version:", version);
  }

  db = await openDB("avzag", version, {
    upgrade(db, oldVersion, newVesion, transaction) {
      console.log("updating");
      for (const l of lects) {
        if (pending) return;
        // if table for the language does not exist then create one
        if (!db.objectStoreNames.contains(l)) {
          db.createObjectStore(l, { autoIncrement: true });
        }
      }
      // delete unnecessary tables from DB
      console.log("trying to delete");
      let isChanged = false;
      for (const tableName of db.objectStoreNames) {
        if (!lects.includes(tableName)) {
          console.log("deleting");
          db.deleteObjectStore(tableName);
          isChanged = true;
        }
      }
      if (isChanged) {
        version++;
      }
      storesNames = [];
      for (const storeName of db.objectStoreNames) {
        storesNames.push(storeName);
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
