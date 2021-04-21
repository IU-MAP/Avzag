import { Entry } from "./types";

function checkTag(entry: Entry, tag: string) {
  tag = tag.substr(1);
  if (entry.tags?.includes(tag)) return entry.uses.map((u) => u.meaning);
  return entry.uses.filter((u) => u.tags?.includes(tag)).map((u) => u.meaning);
}

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

function checkToken(entry: Entry, token: string, forms: boolean) {
  if (token[0] === "#") return checkTag(entry, token);
  if (forms)
    return entry.forms.some((f) => checkSegment(f.plain, token))
      ? entry.uses.map((u) => u.meaning)
      : [];
  return entry.uses.map((u) => u.meaning).filter((m) => checkSegment(m, token));
}

export function checkQueries(entry: Entry, queries: string[][], forms = false) {
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

export function parseQuery(input: string) {
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
