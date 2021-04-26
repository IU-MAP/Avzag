require("fake-indexeddb/auto");
import { cleanDB, db } from "../src/Dictionary/db.worker"
import { openDB, IDBPDatabase, deleteDB } from "idb";


test("clean database and create object store", () => {
  const lects: string[] = ["Iron"];
  
  return cleanDB(lects).then(data => {
    expect(db.objectStoreNames).toStrictEqual(["Iron"]);
  });
});
