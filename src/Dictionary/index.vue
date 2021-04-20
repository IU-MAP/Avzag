<template>
  <h2 v-if="dbInfo.state !== 'ready'" class="section">{{ dbInfo.text }}...</h2>
  <template v-else>
    <div class="section row">
      <toggle v-model="scholar" icon="school" />
      <toggle v-model="lists" icon="format_list_bulleted" />
      <select v-if="lists && !lect" v-model="queries['']">
        <option v-for="(l, n) in dictionaryMeta.lists" :key="n" :value="l">
          {{ n }}
        </option>
      </select>
      <template v-else>
        <input
          v-model="query"
          type="text"
          :placeholder="lect ? `Enter ${lect} form...` : 'Enter meaning...'"
        />
        <btn icon="clear" @click="query = ''" />
      </template>
    </div>
    <div class="scroll-area col">
      <div class="row-1 lects">
        <btn
          class="lect"
          :text="lists ? 'Lists' : 'Meanings'"
          :is-on="!lect"
          @click="lect = ''"
        />
        <div v-for="l in lects" :key="l" class="col lect flag">
          <Flag :lect="l" class="blur" />
          <button :class="{ highlight: lect === l }" @click="lect = l">
            <h2 class="flex">{{ l }}</h2>
          </button>
        </div>
      </div>
      <MeaningRow
        v-for="(es, m) of searchInfo.results"
        :key="m"
        :lects="lects"
        :scholar="scholar"
        :meaning="m"
        :entries="es"
      />
    </div>
  </template>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watchEffect,
  provide,
} from "vue";
import { useRoute } from "vue-router";
import {
  dictionaryMeta,
  lects_,
  dbInfo,
  dbworker,
  searchworker,
  searchInfo,
} from "./main";
import MeaningRow from "./MeaningRow.vue";
import Flag from "@/components/Flag.vue";
import { Entry, SearchCommand } from "./types";
import Btn from "@/components/Btn.vue";

export default defineComponent({
  components: { MeaningRow, Flag, Btn },
  setup() {
    const queries = reactive({} as Record<string, string>);
    const query = computed({
      get: () => queries[lect.value],
      set: (q) => (queries[lect.value] = q),
    });
    const scholar = ref(false);
    const lists = ref(false);
    const lect = ref("");
    const route = useRoute();

    const expanded = reactive(new Map<Entry, number>());
    const toggleExpanded = (en: Entry, ex: boolean) => {
      expanded.set(en, (expanded.get(en) ?? 0) + (ex ? 1 : -1));
      if ((expanded.get(en) ?? 0) <= 0) expanded.delete(en);
    };
    provide("expanded", expanded);
    provide("toggleExpanded", toggleExpanded);

    watchEffect(() => {
      if (lists.value)
        if (dictionaryMeta.value)
          queries[""] = Object.values(dictionaryMeta.value.lists)[0] ?? "";
        else lists.value = false;
      else queries[""] = "";
      lect.value = "";
    });

    watchEffect(() => {
      if (route.name === "Home") {
        expanded.clear();
        searchInfo.searching = false;
        searchworker.postMessage("stop");
        dbworker.postMessage("stop");
      }
    });

    watchEffect(() => {
      if (!query.value) {
        searchInfo.results = {};
        return;
      }
      searchInfo.searching = true;
      searchInfo.results = {};
      searchworker.postMessage(
        JSON.stringify({
          lect: lect.value,
          query: query.value
            .split(";")
            .map((q) =>
              q
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t)
            )
            .filter((q) => q.length),
        } as SearchCommand)
      );
    });

    return {
      lects: lects_,
      scholar,
      queries,
      query,
      lect,
      lists,
      searchInfo,
      dictionaryMeta,
      dbInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
.section {
  margin-bottom: map-get($margins, "half");
  margin-top: -1 * map-get($margins, "normal");
}
.lect {
  width: 192px;
  min-width: 192px;
  &:first-child {
    width: 128px;
    min-width: 128px;
  }
}
.flag h2 {
  line-height: map-get($button-height, "small");
}
.scroll-area {
  padding-left: map-get($margins, "normal");
  padding-right: map-get($margins, "normal");
  padding-top: map-get($margins, "half");
  margin-left: -1 * map-get($margins, "normal");
  overflow: auto;
  height: calc(100vh - 84px);
  width: 100vw;
}
</style>

<style lang="scss">
html,
body {
  height: 100vh;
}
</style>
