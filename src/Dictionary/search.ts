import { ref, Ref } from "@vue/reactivity";
import { computed, onUnmounted } from "@vue/runtime-core";
import { Entry } from "./types";

/**
 *
 * @param entry
 * @param tag
 * @returns
 */
function checkTag(entry: Entry, tag: string) {
  tag = tag.substr(1);
  if (entry.tags?.includes(tag)) return entry.uses.map((u) => u.meaning);
  return entry.uses.filter((u) => u.tags?.includes(tag)).map((u) => u.meaning);
}

/**
 *
 * @param area
 * @param segment
 * @returns
 */
function checkSegment(area: string, segment: string) {
  switch (segment[0]) {
    case "!":
      return area === segment.substr(1);
    case "+":
      return area.startsWith(segment.substr(1));
    case "-":
      return area.endsWith(segment.substr(1));
    default:
      return area.includes(segment);
  }
}

/**
 *
 * @param entry
 * @param token
 * @param forms
 * @returns
 */
function checkToken(
  entry: Entry,
  token: string,
  forms: boolean,
  uses: boolean
) {
  if (token[0] === "#") return checkTag(entry, token);
  const meanings = [] as string[];
  if (forms && entry.forms.some((f) => checkSegment(f.plain, token)))
    meanings.push(...entry.uses.map((u) => u.meaning));
  if (uses)
    meanings.push(
      ...entry.uses.map((u) => u.meaning).filter((m) => checkSegment(m, token))
    );
  return meanings;
}

/**
 *
 * @param entry
 * @param queries
 * @param forms
 * @returns
 */
function checkQueries(
  entry: Entry,
  queries: string[][],
  forms: boolean,
  uses: boolean
) {
  const meanings = new Set<string>();
  for (const query of queries) {
    let meanings_ = entry.uses.map((u) => u.meaning);
    for (const token of query) {
      const fits = checkToken(entry, token, forms, uses);
      meanings_ = meanings_.filter((m) => fits.includes(m));
    }
    meanings_.forEach((m) => meanings.add(m));
  }
  return [...meanings];
}

/**
 *
 * @param input
 * @returns
 */
function parseQuery(input: string) {
  return input
    .split(".")
    .map((q) =>
      q
        .split(" ")
        .map((t) => t.trim())
        .filter((t) => t)
    )
    .filter((q) => q.length);
}

export default class Searcher {
  dictionaries: Ref<Record<string, Entry[]>>;
  lects = computed(() => Object.keys(this.dictionaries?.value ?? {}));

  progress = ref({} as Record<string, number>);
  results = ref({} as Record<string, Record<string, Entry[]>>);

  pending: null | (() => void) = null;
  executing = ref(false);

  constructor(dictionaries: Ref<Record<string, Entry[]>>) {
    this.dictionaries = dictionaries;
    this.reset();
    onUnmounted(() => this.stop());
  }

  reset() {
    this.lects.value.forEach((l) => (this.progress.value[l] = 0));
    this.progress.value[""] = 0;
    this.results.value = {};
  }

  async sleep(ms = 10) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  addResult(lect: string, meanings: string[], entry: Entry) {
    for (const m of meanings) {
      if (!this.results.value[m]) this.results.value[m] = {};
      if (!this.results.value[m][lect]) this.results.value[m][lect] = [];
      this.results.value[m][lect].push(entry);
    }
  }

  async queryDictionary(
    lect: string,
    entries: Entry[],
    queries: string[][],
    forms: boolean,
    uses: boolean
  ) {
    for (let i = 0; i < entries.length; i++) {
      const meanings = checkQueries(entries[i], queries, forms, uses);
      if (meanings.length) this.addResult(lect, meanings, entries[i]);
      if (this.pending) return;
      else if (!(i % 1000)) {
        this.progress.value[lect] = i / entries.length;
        await this.sleep();
      }
    }
    this.progress.value[lect] = 1;
  }

  async findMeanings(entries: Entry[], queries: string[][]) {
    const meanings = new Set<string>();
    for (let i = 0; i < entries.length; i++) {
      checkQueries(entries[i], queries, true, false).forEach((m) =>
        meanings.add(m)
      );
      if (this.pending) return [];
      else if (!(i % 1000)) {
        this.progress.value[""] = i / entries.length;
        await this.sleep();
      }
    }
    this.progress.value[""] = 1;
    return [...meanings].map((m) => ["!" + m]);
  }

  async queue(action: () => Promise<unknown> | void) {
    const call = async () => {
      this.pending = null;
      this.executing.value = true;
      await action();
      this.executing.value = false;
      if (this.pending) {
        const p = this.pending;
        this.pending = null;
        (p as () => void)();
      }
    };
    if (this.executing.value) this.pending = call;
    else call();
  }

  stop() {
    this.queue(() => console.log("searcher stopped"));
  }

  search(lect: string, query: string) {
    this.queue(async () => {
      this.reset();
      let queries = parseQuery(query.toLowerCase());
      if (!queries.length) return;

      if (this.lects.value.length === 1) {
        lect = this.lects.value[0];
        await this.queryDictionary(
          lect,
          this.dictionaries.value[lect],
          queries,
          true,
          true
        );
        return;
      }

      if (queries.length)
        if (lect)
          queries = await this.findMeanings(
            this.dictionaries.value[lect],
            queries
          );
      if (queries.length)
        await Promise.all(
          Object.entries(this.dictionaries.value).map((d) =>
            this.queryDictionary(...d, queries, false, true)
          )
        );
    });
  }
}
