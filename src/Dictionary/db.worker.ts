import { openDB, deleteDB, IDBPDatabase } from "idb";
import { loadLectsJSON } from "@/store";
import { Entry, DBWorkerState } from "./types";

let db: IDBPDatabase;

async function cleanDB(lects: string[]) {
  // await deleteDB("avzag");
  db = await openDB("avzag", 1, {
    upgrade(db) {
      console.log("updating");
      for (const l of lects) {
        if (pending) return;
        // if table for the language does not exist then create one
        if (!db.objectStoreNames.contains(l)) {
          db.createObjectStore(l, { autoIncrement: true });
        }
      }
      // delete unnecessary tables from DB
      for (const tableName of db.objectStoreNames) {
        if (!lects.includes(tableName)) {
          db.deleteObjectStore(tableName);
        }
      }
    },
  });

  // for (const l of lects) {
  //   if (pending) return;
  //   await db.clear(l);
  // }
}

async function fillDB(dictionaries: Record<string, Entry[]>) {
  postState("loading");
  const size = Object.values(dictionaries).reduce((s, d) => s + d.length, 0);
  const step = 1024;
  let done = 0;
  // let counter = 0;
  for (const tableName in dictionaries) {
    // if table exist then check whether should we update it
    if (!db.objectStoreNames.contains(tableName)) {
      continue;
    }
    // get the objectStore
    const langDict = await db.transaction(tableName, "readwrite").store;
    const puts = [];
    // let flag = true;
    const tableSize = await langDict.count();
    // if table is empty
    if (tableSize === 0) {
      for (const element of dictionaries[tableName]) {
        puts.push(langDict.add(element));

        // update state
        if (!(puts.length % step)) {
          done += step;
          const progress = Math.round((done / size) * 100);
          postState(
            "loading",
            `[${progress}%] Loading ${tableName} - ${puts.length} of ${dictionaries[tableName].length}`
          );
        }
      }
    } else {
      // table is not empty thus update it with new values
      const allValues = await langDict.getAll();

      const wordsToAdd: Entry[] = [];
      const wordsToDelete: Entry[] = [];

      let i = 0;
      let j = 0;

      while (i < allValues.length && j < dictionaries[tableName].length) {
        if (
          JSON.stringify(allValues[i]) !==
          JSON.stringify(dictionaries[tableName][j])
        ) {
          if (wordsToAdd.includes(allValues[i])) {
            delete wordsToAdd[allValues[i]];
          } else {
            wordsToDelete.push(allValues[i]);
          }

          if (wordsToDelete.includes(dictionaries[tableName][j])) {
            const index = wordsToDelete.indexOf(dictionaries[tableName][j], 0);
            if (index > -1) {
              wordsToDelete.splice(index, 1);
            }
          } else {
            wordsToAdd.push(dictionaries[tableName][j]);
          }
        }
        i++;
        j++;
      }

      if (i !== allValues.length) {
        // remove old words
        while (i < allValues.length) {
          langDict.delete(allValues[i]);
          i++;
        }
        console.log("removing");
      } else if (j !== dictionaries[tableName].length) {
        // add new words
        while (j < dictionaries[tableName].length) {
          puts.push(langDict.add(dictionaries[tableName]));
          j++;
        }
      }
      console.log(wordsToAdd, wordsToDelete);

      for (const word of wordsToAdd) {
        for (let counter = 0; counter < wordsToAdd.length; counter++) {
          puts.push(langDict.add(allValues[counter]));
          i++;
        }
      }

      for (const word of wordsToDelete) {
        for (let counter = 0; counter < wordsToDelete.length; counter++) {
          langDict.delete(allValues[counter]);
          i++;
        }
      }
    }
    await Promise.all(puts);
  }
}

async function load(lects: string[]) {
  postState("fetching", "Downloading files");
  if (pending) return postState("fetching");
  const dictionaries = await loadLectsJSON<Entry[]>("dictionary", lects);
  lects = Object.keys(dictionaries);
  postState("fetched", lects.toString());

  postState("preparing", "Preparing database");
  // measuring time taken for deletion
  if (pending) return postState("fetching");
  const t0 = performance.now();
  await cleanDB(lects);
  if (pending) return postState("fetching");
  await fillDB(dictionaries);
  const t1 = performance.now();
  console.log("Call to cleanDB " + (t1 - t0) + " milliseconds.");
  postState("ready");
}

function postState(state: DBWorkerState, text: string | string[] = "Loading") {
  postMessage(JSON.stringify({ state, text }));
}

let pending: undefined | (() => void);
let executing = false;

onmessage = (e) => {
  const data = e.data as string;
  const call = async () => {
    executing = true;
    if (data !== "stop") await load(JSON.parse(data));
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
