import { ref, Ref } from "@vue/reactivity";
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
function checkToken(entry: Entry, token: string, forms: boolean) {
  if (token[0] === "#") return checkTag(entry, token);
  if (forms)
    return entry.forms.some((f) => checkSegment(f.plain, token))
      ? entry.uses.map((u) => u.meaning)
      : [];
  return entry.uses.map((u) => u.meaning).filter((m) => checkSegment(m, token));
}

/**
 *
 * @param entry
 * @param queries
 * @param forms
 * @returns
 */
function checkQueries(entry: Entry, queries: string[][], forms = false) {
  const meanings = new Set<string>();
  for (const query of queries) {
    let meanings_ = entry.uses.map((u) => u.meaning);
    for (const token of query) {
      const fits = checkToken(entry, token, forms);
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
  progress: Ref<Record<string, number>>;
  results = ref({} as Record<string, Record<string, Entry[]>>);

  pending: null | (() => void) = null;
  executing = ref(false);

  constructor(dictionaries: Ref<Record<string, Entry[]>>) {
    this.dictionaries = dictionaries;
    this.progress = ref(
      Object.keys(this.dictionaries.value).reduce(
        (p, l) => {
          p[l] = 0;
          return p;
        },
        { "": 0 } as Record<string, number>
      )
    );
  }

  async sleep(ms = 100) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  addResult(lect: string, meanings: string[], entry: Entry) {
    for (const m of meanings) {
      if (!this.results.value[m]) this.results.value[m] = {};
      if (!this.results.value[m][lect]) this.results.value[m][lect] = [];
      this.results.value[m][lect].push(entry);
    }
  }

  async queryDictionary(lect: string, entries: Entry[], queries: string[][]) {
    for (let i = 0; i < entries.length; i++) {
      const meanings = checkQueries(entries[i], queries);
      if (meanings.length) this.addResult(lect, meanings, entries[i]);
      if (this.pending) return;
      else if (!(i % 1000)) {
        this.progress.value[lect] = i / entries.length;
        await this.sleep();
      }
    }
    this.progress.value[lect] = 1;
  }

  async findMeanings(lect = "", entries: Entry[], queries: string[][]) {
    const meanings = new Set<string>();
    for (let i = 0; i < entries.length; i++) {
      if (lect)
        this.addResult(
          lect,
          checkQueries(entries[i], queries, true),
          entries[i]
        );
      else
        checkQueries(entries[i], queries, true).forEach((m) => meanings.add(m));
      if (this.pending) return [];
      else if (!(i % 1000)) {
        this.progress.value[lect] = i / entries.length;
        await this.sleep();
      }
    }
    this.progress.value[lect] = 1;
    return [...meanings].map((m) => ["!" + m]);
  }

  search(lect?: string, query?: string) {
    const call = async () => {
      this.pending = null;
      this.executing.value = true;

      Object.keys(this.progress.value).forEach(
        (k) => (this.progress.value[k] = 0)
      );
      this.results.value = {};
      if (query) {
        let queries = parseQuery(query.toLowerCase());
        const lects = Object.keys(this.dictionaries.value);
        if (lect && lects.length === 1)
          await this.findMeanings(
            lects[0],
            this.dictionaries.value[lects[0]],
            queries
          );
        else {
          if (queries.length)
            if (lect)
              queries = await this.findMeanings(
                "",
                this.dictionaries.value[lect],
                queries
              );
          this.progress.value[""] = 0;
          if (queries.length)
            await Promise.all(
              Object.entries(this.dictionaries.value).map((d) =>
                this.queryDictionary(...d, queries)
              )
            );
        }
      }

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
}
