import { Entry } from "./types";

/**
 * checks tag for conformity
 * @param entry entry to check tag for
 * @param tag tag to be checked with entry's tag
 * @returns true if entry's tag is the same as passed tag, false otherwise
 */
function checkTag(entry: Entry, tag: string) {
  tag = tag.substr(1);
  if (entry.tags?.includes(tag)) return entry.uses.map((u) => u.meaning);
  return entry.uses.filter((u) => u.tags?.includes(tag)).map((u) => u.meaning);
}

/**
 * checks if area starts with (!), ends with (+), contains or exactly matches (-) passed segment
 * @param area full word
 * @param segment segment to check (starts with a character or either of these: !, +, -)
 * @returns true if area mathes the segment in any expected way depending on the first symbol
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
 * cheks token for tag or segment
 * @param entry entry to check
 * @param token token that tells what to check for
 * @param forms forms of the entry
 * @returns true if check passed, false otherwise
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
 * @param entry entry to check
 * @param queries queries
 * @param forms possible forms of entry
 * @returns word in english
 */
export function checkQueries(entry: Entry, queries: string[][], forms = false) {
  console.log(
    JSON.parse(JSON.stringify(entry)),
    JSON.parse(JSON.stringify(queries))
  );
  const meanings = new Set<string>();
  for (const query of queries) {
    let meanings_ = entry.uses.map((u) => u.meaning);
    for (const token of query) {
      const fits = checkToken(entry, token, forms);
      meanings_ = meanings_.filter((m) => fits.includes(m));
    }
    meanings_.forEach((m) => meanings.add(m));
  }
  console.log("result", [meanings]);
  return [...meanings];
}

/**
 * @param input query to parse
 * @returns parsed query
 */
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
