import { ref } from "vue";

export const lects = ref<string[]>([]);
export const root =
  process.env.VUE_APP_STORE === "local"
    ? "/store/"
    : "https://raw.githubusercontent.com/alkaitagi/Avzag/store/";

export async function loadJSON(filename: string, defaultValue?: unknown) {
  return await fetch(root + filename + ".json")
    .then((r) => r.json())
    .catch(() => defaultValue);
}
export async function loadLectsJSON<T>(filename: string) {
  const files = {} as Record<string, T>;
  for (const lect of lects.value) {
    const file = await loadJSON(lect + "/" + filename);
    if (file) files[lect] = file;
  }
  return files;
}