export type Text = {
  plain: string;
  ipa?: string;
  glossed?: string;
};

export type Sample = Text & {
  translation: string;
};

export type Use = {
  meaning: string;
  tags?: string[];
  samples?: Sample[];
  notes?: string[];
};

export type Entry = {
  forms: Text[];
  language: string;
  uses: Use[];
  tags?: string[];
  notes?: string[];
};

export type SearchResults = Record<string, Record<string, Entry[]>>;

export type SearchOccurence = {
  lect: string;
  meanings: string[];
  entry: Entry;
};

export type DictionaryMeta = { lists: Record<string, string> };

export type DBInfo = {
  state: "loading" | "fetching" | "fetched" | "ready";
  lect?: string | string[];
  progress?: number;
};

export type SearchCommand =
  | "stop"
  | string[]
  | {
      lect: string;
      query: string;
    };
