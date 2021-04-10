import { IDBPDatabase, openDB } from "idb";
import { Entry } from "./types";
import { loadLectsJSON } from "@/store";

let db: IDBPDatabase;

async function fillDB(dictionaries: Record<string, Entry[]>) {
  function fillLect(lect: string, dictionary: Entry[]) {
    console.log("loading", lect);
    const st = tx.objectStore(lect);
    return dictionary.map((d) => st.put(d /* , d.forms[0].text.plain */));
  }

  const lects = Object.keys(dictionaries);
  const tx = db.transaction(lects, "readwrite");
  await Promise.all(lects.flatMap((l) => fillLect(l, dictionaries[l])));
}

async function load() {
  db = await openDB("avzag", 1);
  const dictionaries = await loadLectsJSON<Entry[]>("dictionary");
  await fillDB(dictionaries);
  postMessage(Object.keys(dictionaries));
}

onmessage = load;
