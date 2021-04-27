import { ref } from "vue";

export const lects = ref([] as string[]);
export const root =
  process.env.VUE_APP_STORE ??
  "https://raw.githubusercontent.com/alkaitagi/Avzag/store/";

export async function loadJSON(filename: string, defaultValue?: unknown) {
  return await fetch(root + filename + ".json")
    .then((r) => r.json())
    .catch(() => defaultValue);
}
export async function loadLectsJSON<T>(filename: string, lects_?: string[]) {
  const files = {} as Record<string, T>;
  for (const lect of lects_ ?? lects.value) {
    const file = await loadJSON(lect + "/" + filename);
    if (file) files[lect] = file;
  }
  return files;
}
