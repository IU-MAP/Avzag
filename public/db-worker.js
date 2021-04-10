let root;
let db;

async function fillDB(dictionaries) {
  function fillLect(lect, dictionary) {
    console.log("loading", lect);
    const st = tx.objectStore(lect);
    return dictionary.map((d) => st.add(d /* , d.forms[0].text.plain */));
  }

  const lects = Object.keys(dictionaries);
  console.log("lects", lects);
  const tx = db.transaction(lects, "readwrite");
  await Promise.all(lects.flatMap((l) => fillLect(l, dictionaries[l])));
}

async function load(lects) {
  const dictionaries = await loadLectsJSON("dictionary", lects);
  lects = Object.keys(dictionaries);

  const req = indexedDB.open("avzag", 1);

  req.onupgradeneeded = (e) => {
    const db = e.target.result;
    lects.forEach((l) => {
      if (db.objectStoreNames.contains(l)) db.deleteObjectStore(l);
      db.createObjectStore(l, { autoIncrement: true });
    });
  };

  req.onsuccess = async (e) => {
    db = e.target.result;
    await fillDB(dictionaries);
    postMessage(lects);
  };
}

onmessage = (e) => {
  console.log("received msg");
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
