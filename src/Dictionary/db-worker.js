import { openDB } from "idb";

let db;
let root;
let lects;

async function fillDB(dictionaries) {
  function fillLect(lect, dictionary) {
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
  const dictionaries = await loadLectsJSON("dictionary");
  await fillDB(dictionaries);
  postMessage(Object.keys(dictionaries));
}

onmessage = (e) => {
  root = e.data[0];
  lects = e.data[1];
  load();
};

async function loadJSON(filename, defaultValue) {
  return await fetch(root + filename + ".json")
    .then((r) => r.json())
    .catch(() => defaultValue);
}
async function loadLectsJSON(filename) {
  const files = {};
  for (const lect of lects) {
    const file = await loadJSON(lect + "/" + filename);
    if (file) files[lect] = file;
  }
  return files;
}
