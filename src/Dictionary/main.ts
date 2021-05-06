import { loadJSON, lects, loadLectsJSON } from "@/store";
import { ref, shallowRef, watch } from "vue";
import { checkQueries, parseQuery } from "./search";
import { DictionaryMeta, SearchOccurence, Entry, SearchCommand } from "./types";

export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const dictionaries = shallowRef({} as Record<string, Entry[]>);

watch(lects, async () => {
  dictionaryMeta.value = await loadJSON("dictionary");
  dictionaries.value = await loadLectsJSON("dictionary");
});

export const results = ref({} as Record<string, Record<string, Entry[]>>);
async function receiveSearch(occurence: SearchOccurence) {
  if (occurence === "started") results.value = {};
  else {
    const { lect, meanings, entry } = occurence;
    for (const m of meanings) {
      if (!results.value[m]) results.value[m] = {};
      if (!results.value[m][lect]) results.value[m][lect] = [];
      results.value[m][lect].push(entry);
    }
  }
}

let pending: null | (() => void);
export const executing = ref(false);

const delay = (ms = 1000) => {
  console.log("waiting for", ms);
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 *
 * @param key_
 * @param queries
 * @returns
 */
async function queryDictionaries(queries: string[][]) {
  async function search(lect: string, entries: Entry[]) {
    for (let i = 0; i < entries.length; i++) {
      const meanings = checkQueries(entries[i], queries);
      if (meanings.length) receiveSearch({ lect, meanings, entry: entries[i] });
      if (pending) return;
      else if (!(i % 100)) await delay();
    }
  }
  await Promise.all(
    Object.entries(dictionaries.value).map((l) => search(...l))
  );
}

async function findMeanings(entries: Entry[], queries: string[][]) {
  const meanings = new Set<string>();
  for (let i = 0; i < entries.length; i++) {
    checkQueries(entries[i], queries, true).forEach((m) => meanings.add(m));
    if (pending) return [];
    else if (!(i % 100)) await delay();
  }
  return [...meanings].map((m) => ["!" + m]);
}

async function init(command: SearchCommand) {
  if (command === "stop") return;
  receiveSearch("started");
  const queries = parseQuery(command.query);
  if (queries.length)
    if (command.lect) {
      const meanings = await findMeanings(
        dictionaries.value[command.lect],
        queries
      );
      if (meanings.length) queryDictionaries(meanings);
    } else queryDictionaries(queries);
}

export function search(command: SearchCommand) {
  const call = async () => {
    pending = null;
    executing.value = true;
    await init(command);
    executing.value = false;
    if (pending) {
      const p = pending;
      pending = null;
      (p as () => void)();
    }
  };
  if (executing.value) pending = call;
  else call();
}
