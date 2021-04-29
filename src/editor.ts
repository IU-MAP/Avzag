import { watch, ref, Ref } from "vue";

type Options = {
  defaultFile: unknown;
  filename: string | (() => string);
  storage?: string;
};

export const config: Options = {
  defaultFile: {},
  storage: "",
  filename: "",
};

export const file = ref();

export function resetFile() {
  file.value = JSON.parse(JSON.stringify(config.defaultFile));
}

export function saveFile() {
  if (config.storage) localStorage[config.storage] = JSON.stringify(file.value);
}

export function setupEditor<T>(options: Partial<Options>) {
  Object.assign(config, options);
  if (config.storage) {
    try {
      file.value = JSON.parse(localStorage[config.storage]);
    } catch {
      resetFile();
    }
    watch(file, saveFile, { deep: true });
  }

  return file as Ref<T>;
}
