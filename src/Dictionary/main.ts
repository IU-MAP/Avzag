import { loadJSON, lects, loadLectsJSON } from "@/store";
import { shallowRef, watch } from "vue";
import { DictionaryMeta, Entry } from "./types";

export const dictionaryMeta = shallowRef<DictionaryMeta>({ lists: [] });
export const dictionaries = shallowRef({} as Record<string, Entry[]>);

watch(lects, async () => {
  dictionaries.value = {};
  dictionaries.value = await loadLectsJSON("dictionary");
  dictionaryMeta.value = await loadJSON("dictionaryMeta");
});
