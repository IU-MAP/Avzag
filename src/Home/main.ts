import { ref, shallowRef, reactive, computed } from "vue";
import { SearchState, Lect } from "./types";
import { loadJSON, resetStorage } from "@/store";
import { Query, EvaluateQuery } from "@/components/Query/types";

export const catalogue = shallowRef([] as Lect[]);
export const search = reactive({
  selected: new Set<string>(),
  visible: computed(() =>
    tags.value.reduce((set, t, i) => {
      if (EvaluateQuery(t, query.value, true)) set.add(catalogue.value[i].name);
      return set;
    }, new Set<string>())
  ),
}) as SearchState;
export const query = ref({} as Query);

const tags = computed(() =>
  catalogue.value.map(({ name, tags, family }) =>
    [name, tags ?? "", family].flat().join(" ").toLowerCase()
  )
);

export async function reset() {
  await resetStorage();
  catalogue.value.length = 0;
  query.value = {};
  catalogue.value = await loadJSON("catalogue", []);
  search.selected.clear();
}
