export type Text = {
  plain: string;
  ipa?: string;
  glossed?: string;
};

export type Sample = {
  text: Text;
  translation: string;
};

export type Entry = {
  forms: Text[];
  meanings?: string[];
  tags?: string[];
  samples?: Sample[];
  notes?: string[];
};

export type DictionaryMeta = { lists: Record<string, string[]> };

export type Search = Record<string, Record<string, Entry[]>>;

export type DBWorkerState =
  | "preparing"
  | "fetching"
  | "fetched"
  | "loading"
  | "ready";

export type SearchWorkerCommand =
  | string[]
  | {
      lect: string;
      query: string[];
      queryMode: string;
    };

export type SearchWorkerResult = {
  lect: string;
  entry: Entry;
};
