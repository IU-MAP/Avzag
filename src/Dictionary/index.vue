<template>
  <div v-if="dbInfo.state === 'ready'" class="section row">
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
  <h2 v-else>
    {{
      dbInfo.state === "fetching"
        ? "Downloading dictionaries..."
        : "Preparing database..."
    }}
  </h2>
  <div v-if="lects?.length" class="scroll-area col">
    <div class="row-1 lects">
      <btn
        class="lect card-0"
        :is-on="!lect"
        :icon="!lect ? 'search' : ''"
        :text="lists ? 'Lists' : 'Meanings'"
        @click="lect = ''"
      />
      <btn
        v-for="l in lects"
        :key="l"
        :icon="lect === l ? 'search' : ''"
        class="row lect flag card-0"
        :is-on="lect === l"
        @click="lect = l"
      >
        <Seeker
          v-if="dbInfo.state !== 'ready'"
          :check="dbInfo.lect === l"
          :seek="dbInfo.progress"
        />
        <Flag :lect="l" class="blur" />
        <h2 class="flex">{{ l }}</h2>
      </btn>
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
  lects_ as lects,
  dbInfo,
  dbworker,
  searchworker,
  searchInfo,
} from "./main";
import MeaningRow from "./MeaningRow.vue";
import Flag from "@/components/Flag.vue";
import Seeker from "@/components/Seeker.vue";
import { Entry, SearchCommand } from "./types";

export default defineComponent({
  components: { MeaningRow, Flag, Seeker },
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

    const expandedEntries = reactive(new Map<Entry, number>());
    const setExpansion = (en: Entry, ex: boolean) => {
      expandedEntries.set(en, (expandedEntries.get(en) ?? 0) + (ex ? 1 : -1));
      if ((expandedEntries.get(en) ?? 0) <= 0) expandedEntries.delete(en);
    };
    provide("expandedEntries", expandedEntries);
    provide("setExpansion", setExpansion);

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
        lects.value = [];
        expandedEntries.clear();
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
          query: query.value,
        } as SearchCommand)
      );
    });

    return {
      lects,
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
