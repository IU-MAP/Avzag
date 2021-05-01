import localforage from "localforage";
import { watch, ref, Ref } from "vue";

const storage = localforage.createInstance({
  name: "editor",
});

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

export function setupEditor<T>(options: Partial<Options>) {
  Object.assign(config, options);
  if (config.storage) {
    try {
      file.value = JSON.parse(localStorage[config.storage]);
    } catch {
      resetFile();
    }
    watch(file, () => storage.setItem(config.storage as string, file), {
      deep: true,
    });
  }

  return file as Ref<T>;
}
