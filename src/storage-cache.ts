import { toRaw, watch, Ref, ref } from "vue";

type Stamp = { added: number; changed: number; skip?: boolean };
export default class StorageCache {
  storage: LocalForage;
  records: Ref<Record<string, Stamp>>;
  constructor(storage: LocalForage, name = "cache", callback?: () => void) {
    this.storage = storage;
    this.records = ref({} as Record<string, Stamp>);
    storage.getItem<Record<string, Stamp>>(name).then((r) => {
      if (r) this.records.value = r;
      watch(
        this.records,
        () => storage.setItem(name, toRaw(this.records.value)),
        { deep: true }
      );
      callback?.();
    });
  }

  addRecord(key: string) {
    if (this.records.value[key]) return false;
    const t = Date.now();
    this.records.value[key] = { added: t, changed: t };
    return true;
  }

  changeRecord(key: string) {
    const t = Date.now();
    let r = this.records.value[key];
    if (r) {
      if (r.skip) delete r.skip;
      else r.changed = t;
    } else {
      r = { added: t, changed: t };
      this.records.value[key] = r;
    }
    return r;
  }

  getRecordChange(key: string) {
    return this.records.value[key]?.changed ?? 0;
  }
}
