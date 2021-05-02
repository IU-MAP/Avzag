import localforage from "localforage";
import {
  watch,
  ref,
  toRaw,
  onBeforeUnmount,
  computed,
  WatchStopHandle,
} from "vue";
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
async function loadLect() {
  const l = await storage.getItem<string>("lect");
  lect.value = l ?? "";
  watch(lect, async () => {
    await storage.clear();
    await storage.setItem("lect", toRaw(lect.value));
    cache.clean();
    resetFile();
  });
}

export const file = ref();
let fileWatch: undefined | WatchStopHandle;
async function skipSaving(action: () => void, drop = true) {
  fileWatch?.();
  fileWatch = undefined;
  action();
  if (drop) {
    cache.delete(path.value);
    await storage.removeItem(path.value);
  }
  if (!fileWatch) fileWatch = watch(file, saveFile, { deep: true });
}
const path = computed(() => {
  let path = config.value.filename + ".json";
  const root = toRaw(lect.value) || "Custom";
  if (root) path = root + "/" + path;
  return path;
});

async function loadFile() {
  const f = await storage.getItem(path.value);
  if (f) {
    await skipSaving(() => (file.value = f), false);
    await loadJSON(path.value, undefined);
  } else await resetFile();
}
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
  config.value = value;
  file.value = undefined;
  onBeforeUnmount(() => fileWatch?.());
  if (lect.value === undefined) await loadLect();
  await loadFile();
}

export function pushFile() {
  pushToStore(
    JSON.stringify(file.value, null, 2),
    path.value,
    window.prompt("Enter optional comment:", path.value) as string,
    path.value
  );
}
export async function resetFile() {
  await skipSaving(async () => {
    const f = await loadJSON(path.value, undefined);
    if (f) await skipSaving(() => (file.value = f));
    else file.value = JSON.parse(JSON.stringify(config.value.default));
  });
}
export function uploadJSON() {
  uploadFile((c) => (file.value = JSON.parse(c)));
}
export function downloadJSON() {
  downloadFile(JSON.stringify(file.value, null, 2), path.value);
}
