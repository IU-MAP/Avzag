import { openDB, deleteDB } from "https://unpkg.com/idb?module";

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
  function fillLect(lect, dictionary) {
    console.log("loading", lect);
    const st = tx.objectStore(lect);
    return dictionary.map((d) => st.add(d /* , d.forms[0].text.plain */));
  }

  const lects = Object.keys(dictionaries);
  const tx = db.transaction(lects, "readwrite");
  await Promise.all(lects.flatMap((l) => fillLect(l, dictionaries[l])));
}

async function load(lects) {
  console.log("Loading db");
  const dictionaries = await loadLectsJSON("dictionary", lects);
  lects = Object.keys(dictionaries);

  await cleanDB(lects);
  await fillDB(dictionaries);
  postMessage(lects);
}

onmessage = (e) => {
  const args = e.data.split("+");
  root = args[0];
  load(args[1].split("."));
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
