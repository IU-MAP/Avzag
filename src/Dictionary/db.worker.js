// import { openDB, deleteDB } from "https://unpkg.com/idb?module";
import { openDB, deleteDB } from "idb";

let root;
let db;

async function cleanDB(lects) {
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

async function fillDB(dictionaries) {
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

async function load(lects) {
  console.log(lects);
  postMessage(JSON.stringify({ state: "fetching" }));
  const dictionaries = await loadLectsJSON("dictionary", lects);
  lects = Object.keys(dictionaries);
  postMessage(JSON.stringify({ state: "fetched", lects }));

  postMessage(JSON.stringify({ state: "preparing" }));
  await cleanDB(lects);
  await fillDB(dictionaries);
  postMessage(JSON.stringify({ state: "ready" }));
}

onmessage = ({ data }) => {
  data = JSON.parse(data);
  root = data[0];
  load(data[1]);
};

async function loadJSON(filename, defaultValue) {
  return await fetch(root + filename + ".json")
    .then((r) => r.json())
    .catch(() => defaultValue);
}
async function loadLectsJSON(filename, lects) {
  const files = {};
  for (const lect of lects) {
    const file = await loadJSON(lect + "/" + filename);
    if (file) files[lect] = file;
  }
  return files;
}
