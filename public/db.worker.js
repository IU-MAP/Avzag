import { openDB, deleteDB } from "https://unpkg.com/idb?module";
// import { openDB, deleteDB } from "idb";

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
    console.log("Loading", l);
    const st = tx.objectStore(l);
    for (const d of dictionaries[l]) st.add(d /* , d.forms[0].text.plain */);
  }
  await tx.done;
}

async function load(lects) {
  console.log("Loading DB");
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
