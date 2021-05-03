import localforage from "localforage";
import { watch, ref, toRaw, computed, WatchStopHandle } from "vue";
import { downloadFile, uploadFile } from "./file-manager";
import { pushToStore } from "./gh-manager";
import StorageCache from "./storage-cache";
import { loadJSON, cache as storeCache } from "./store";

export const storage = localforage.createInstance({ name: "editor" });
const cache = new StorageCache(storage);
export const isDirty = computed(() => cache.updateOf(path.value));
export const isOutdated = computed(
  () =>
    lect.value &&
    isDirty.value &&
    isDirty.value < storeCache.updateOf(path.value)
);

export const lect = ref<string>();
watch(lect, () =>
  storage.setItem("lect", toRaw(lect.value)).then(() => resetFile())
);

export const file = ref();
let fileWatch: undefined | WatchStopHandle;
const path = computed(() => {
  let path = config.value.filename + ".json";
  if (!config.value.global) path = (toRaw(lect.value) || "_") + "/" + path;
  return path;
});

export function saveFile() {
  storage.setItem(path.value, toRaw(file.value));
  cache.update(path.value);
}

type Config = { default: unknown; filename: string; global?: boolean };
export const config = ref({
  default: undefined,
  filename: "",
} as Config);
export async function configure(value: Config) {
  fileWatch?.();
  fileWatch = undefined;
  file.value = undefined;
  config.value = value;
  if (lect.value === undefined)
    lect.value = (await storage.getItem<string>("lect")) ?? "";
  else await resetFile();
}

export function pushFile() {
  pushToStore(
    JSON.stringify(file.value, null, 2),
    path.value,
    window.prompt("Enter optional comment:", path.value) as string,
    path.value
  );
}
export async function resetFile(checkStorage = true) {
  fileWatch?.();
  fileWatch = undefined;
  console.log("resetting", path.value);
  let f: unknown;
  if (checkStorage && (f = await storage.getItem(path.value))) {
    file.value = f;
    await loadJSON(path.value);
  } else {
    if ((f = await loadJSON(path.value))) file.value = f;
    else file.value = JSON.parse(JSON.stringify(config.value.default));
    cache.delete(path.value);
    await storage.removeItem(path.value);
  }
  if (!fileWatch) fileWatch = watch(file, saveFile, { deep: true });
}
export function uploadJSON() {
  uploadFile((c) => (file.value = JSON.parse(c)));
}
export function downloadJSON() {
  downloadFile(JSON.stringify(file.value, null, 2), path.value);
}
