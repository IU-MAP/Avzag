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
  console.log();
  console.log("[cleanDB is called]");

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
  console.log("[deleting unnecessary records]");
  const st = db.transaction(langStoreName, "readwrite").store;

  const languageList = await st.getAll();
  console.log("before ", languageList);

  if (languageList.length === 0) {
    console.log("[languages table is empty]");
    for (const l of lects) {
      st.add({ lang: l });
    }
  } else {
    for (const l of lects) {
      if (!Object.values(languageList).includes(l)) {
        console.log("[adding new language]");
        console.log(Object.values(languageList));
        console.log("====");
        st.add({ lang: l });
      }
    }
    // if DB does not have l then create such
    for (const language of languageList) {
      if (!lects.includes(language.lang)) {
        console.log("does not include", language);

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
        console.log("[deleting from languageList table]", language.lang);
        const key = await st.index("lang").getKey(language.lang);
        await st.delete(key!);
      }
    }
  }
  // console.log("after ", await st.getAll());
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

  const langStore = db.transaction(langStoreName, "readwrite").store;
  const languageList = await langStore.getAll();
  console.log("[in fill db]", languageList);
  for (const [l, ds] of Object.entries(dictionaries)) {
    if (Object.values(languageList).includes(l)) {
      continue;
    }
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
