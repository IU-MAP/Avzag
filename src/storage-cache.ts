import { toRaw, watch, Ref, ref } from "vue";

export default class StorageCache {
  storage: LocalForage;
  records: Ref<Record<string, number>>;
  constructor(storage: LocalForage, name = "cache", callback?: () => void) {
    this.storage = storage;
    this.records = ref({} as Record<string, number>);
    storage.getItem<Record<string, number>>(name).then((r) => {
      if (r) this.records.value = r;
      watch(
        this.records,
        () => storage.setItem(name, toRaw(this.records.value)),
        { deep: true }
      );
      callback?.();
    });
  }

  clean() {
    this.records.value = {};
  }

  add(key: string) {
    if (this.records.value[key]) return false;
    return !!this.update(key);
  }

  delete(key: string) {
    delete this.records.value[key];
  }

  update(key: string) {
    return (this.records.value[key] = Date.now());
  }

  updateOf(key: string) {
    return this.records.value[key] ?? 0;
  }
}
