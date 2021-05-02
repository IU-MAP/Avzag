import { openDB, IDBPDatabase } from "idb";
import { loadLectsJSON } from "@/store";
import { Entry, DBState } from "./types";

let db: IDBPDatabase;
const storeName = "lects";
const langStoreName = "languages";
const version = 1;
const storesNames: string[] = [];

/**
 *
 * @param lects
 */
async function cleanDB(lects: string[]) {
  db = await openDB("avzag", version, {
    upgrade(db, transaction) {
      console.log("[updating the schema]");

      const dbStore = db.createObjectStore(storeName, { autoIncrement: true });
      const langStore = db.createObjectStore(langStoreName, {
        autoIncrement: true,
      });

      console.log("[creating index for languages]");
      dbStore.createIndex("language", "language", { unique: false });
      langStore.createIndex("lang", "lang", { unique: false });
    },
  });
  const st = db.transaction(langStoreName, "readwrite").store;
  const languageList = await st.getAll();

  for (const language of languageList) {
    if (!lects.includes(language.lang)) {
      // this language is not selected but exist in DB
      // then delete all rows of that language
      console.log("[deleting records for language]", language.lang);
      const tx = db.transaction(storeName, "readwrite");
      const index = tx.store.index("language");
      const pdestroy = index.openCursor(IDBKeyRange.only(language.lang));
      pdestroy.then(async (cursor) => {
        while (cursor) {
          cursor.delete();
          cursor = await cursor.continue();
        }
      });
      // deleting from languageList table
      const key = await st.index("lang").getKey(language.lang);
      await st.delete(key!);
    }
  }
  // }
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
    const langStore = db.transaction(langStoreName, "readwrite").store;
    const languageList = await langStore.getAll();
    console.log("[in fill db]", languageList);
    // if DB has records for the language
    if (languageList.some((e) => e.lang === l)) {
      // skipping the language
      continue;
    }
    // adding language to languages table
    langStore.add({ lang: l });

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
    console.log("[awaiting]");
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
  const t0 = performance.now();
  await cleanDB(lects);
  const t1 = performance.now();
  console.log("Cleaning DB took " + (t1 - t0) + "milliseconds");
  if (pending) return postState("fetching");
  const t2 = performance.now();
  await fillDB(dictionaries);
  const t3 = performance.now();
  console.log("Filling DB took " + (t3 - t2) + "milliseconds");
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
