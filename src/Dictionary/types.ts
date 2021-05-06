export type DictionaryMeta = { lists: Record<string, string> };

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
  uses: Use[];
  tags?: string[];
  notes?: string[];
};
