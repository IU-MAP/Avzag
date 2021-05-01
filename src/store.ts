import localforage from "localforage";
import { ref } from "vue";
import { lastCommitTime } from "./gh-manager";
import StorageCache from "./storage-cache";

export const lects = ref([] as string[]);
export const root =
  (process.env.VUE_APP_STORE as string) ??
  "https://raw.githubusercontent.com/alkaitagi/avzag/store/";

export const storage = localforage.createInstance({ name: "user" });
export const cache = new StorageCache(storage, "cache", () =>
  storage
    .getItem<string[]>("lects")
    .then((ls) => (lects.value = ls ?? ["Kaitag"]))
    .then(() => checkOutdated(true))
);

export async function checkOutdated(alert = false) {
  const entries = Object.entries(cache.records.value).filter(
    ([p]) => !p.includes("/") || lects.value.some((l) => p.startsWith(l))
  );
  const outdated = [];
  for (const [path, { added }] of entries) {
    const updated = await lastCommitTime(path);
    if (Date.now() - 300000 > updated && updated > added) outdated.push(path);
  }
  if (outdated.length) {
    console.log("cleaning outdated cache", outdated);
    if (alert && Object.keys(cache.records.value).length)
      window.alert("New data is available, reloading...");
    outdated?.forEach((p) => delete cache.records.value[p]);
    location.reload();
  }
}

export async function loadJSON<T>(path: string, defaultValue?: T) {
  if (!path.endsWith(".json")) path += ".json";
  if (!cache.addRecord(path)) return (await storage.getItem<T>(path)) as T;
  console.log("cached", path);
  const f = await fetch(root + path, { cache: "no-store" })
    .then((r) => r.json())
    .then((j) => j as T)
    .catch(() => defaultValue as T);
  await storage.setItem(path, f);
  return f;
}
export async function loadLectsJSON<T>(path: string, lects_?: string[]) {
  const files = {} as Record<string, T>;
  for (const lect of lects_ ?? lects.value) {
    const file = await loadJSON<T>(lect + "/" + path);
    if (file) files[lect] = file;
  }
  return files;
}
