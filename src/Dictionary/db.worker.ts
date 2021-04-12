import { openDB, deleteDB, IDBPDatabase } from "idb";
import { loadLectsJSON } from "@/store";
import { Entry, DBWorkerState } from "./types";

let db: IDBPDatabase;

async function cleanDB(lects: string[]) {
  await deleteDB("avzag");
  db = await openDB("avzag", 1, {
    upgrade(db) {
      lects.forEach((l) => {
        if (db.objectStoreNames.contains(l)) db.deleteObjectStore(l);
        db.createObjectStore(l, { autoIncrement: true });
      });
    },
  });
}

async function fillDB(dictionaries: Record<string, Entry[]>) {
  const lects = Object.keys(dictionaries);
  const tx = db.transaction(lects, "readwrite");

  postState("loading");
  const size = Object.values(dictionaries).reduce((s, d) => s + d.length, 0);
  const step = 512;
  let loaded = 0;

  for (const l of lects) {
    const current = dictionaries[l].length;
    const st = tx.objectStore(l);
    const puts = [];
    for (const d of dictionaries[l]) {
      puts.push(st.add(d /* , d.forms[0].text.plain */));
      if (!(puts.length % step)) {
        loaded += step;
        const progress = Math.round((loaded / size) * 100);
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
  const t = Date.now();
  postState("fetching", "Downloading files");
  const dictionaries = await loadLectsJSON<Entry[]>("dictionary", lects);
  lects = Object.keys(dictionaries);
  postState("fetched", lects.toString());

  postState("preparing", "Preparing database");
  await cleanDB(lects);
  await fillDB(dictionaries);
  postState("ready");
  console.log((Date.now() - t) / 1000);
}

function postState(state: DBWorkerState, text: string | string[] = "Loading") {
  postMessage(JSON.stringify({ state, text }));
}

onmessage = ({ data }) => load(JSON.parse(data));
