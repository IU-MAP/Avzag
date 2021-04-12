// import { openDB, deleteDB } from "https://unpkg.com/idb?module";
import { openDB, deleteDB, IDBPDatabase } from "idb";
import { root } from "@/store";
import { Entry } from "./types";

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
  for (const l of lects) {
    postMessage(JSON.stringify({ state: "loading", lects: l }));
    const st = tx.objectStore(l);
    const puts = [];
    for (const d of dictionaries[l])
      puts.push(st.add(d /* , d.forms[0].text.plain */));
    await Promise.all(puts);
  }
}

async function load(lects: string[]) {
  postMessage(JSON.stringify({ state: "fetching" }));
  const dictionaries = await loadLectsJSON<Entry[]>("dictionary", lects);
  lects = Object.keys(dictionaries);
  postMessage(JSON.stringify({ state: "fetched", lects }));

  postMessage(JSON.stringify({ state: "preparing" }));
  await cleanDB(lects);
  await fillDB(dictionaries);
  postMessage(JSON.stringify({ state: "ready" }));
}

onmessage = ({ data }) => load(JSON.parse(data));

async function loadJSON(filename: string, defaultValue?: unknown) {
  return await fetch(root + filename + ".json")
    .then((r) => r.json())
    .catch(() => defaultValue);
}
async function loadLectsJSON<T>(filename: string, lects: string[]) {
  const files = {} as Record<string, T>;
  for (const lect of lects) {
    const file = await loadJSON(lect + "/" + filename);
    if (file) files[lect] = file;
  }
  return files;
}
