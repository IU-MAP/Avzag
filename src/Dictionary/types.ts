export type Text = {
  plain: string;
  ipa?: string;
  glossed?: string;
};

export type Sample = {
  text: Text;
  translation: string;
};

export type Form = {
  text: Text;
  grammar: string;
};

export type Entry = {
  translation: string;
  forms: Form[];
  samples?: Sample[];
  tags?: string;
  explanation?: string;
  etymology?: string;
  related?: string[];
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
