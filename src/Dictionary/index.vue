<template>
  <div class="section col small">
    <h2 v-if="dbInfo.state !== 'ready'">{{ dbInfo.text }}...</h2>
    <template v-else>
      <select v-if="lists && !lect" v-model="queries['']">
        <option v-for="(l, n) in dictionaryMeta.lists" :key="n" :value="l">
          {{ n }}
        </option>
      </select>
      <div v-else class="row">
        <input
          v-model="query"
          type="text"
          :placeholder="lect ? `Enter ${lect} form...` : 'Enter meaning...'"
        />
        <btn icon="clear" @click="query = ''" />
      </div>
      <div class="row-1 lects fill">
        <div class="row lect">
          <toggle v-model="lists" icon="format_list_bulleted" />
          <btn
            class="flex"
            :text="lists ? 'Lists' : 'Meanings'"
            :is-on="!lect"
            @click="lect = ''"
          />
        </div>
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
        :meaning="m"
        :entries="es"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
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
import { SearchCommand } from "./types";
import Btn from "@/components/Btn.vue";

export default defineComponent({
  components: { MeaningRow, Flag, Btn },
  setup() {
    const queries = reactive({} as Record<string, string>);
    const query = computed({
      get: () => queries[lect.value],
      set: (q) => (queries[lect.value] = q),
    });
    const lists = ref(false);
    const lect = ref("");
    const route = useRoute();

    watchEffect(() => {
      if (lists.value)
        if (dictionaryMeta.value)
          queries[""] = Object.values(dictionaryMeta.value.lists)[0] ?? "";
        else lists.value = false;
      else queries[""] = "";
    });

    watchEffect(() => {
      if (route.name === "Home") {
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
.translation {
  line-height: map-get($button-height, "small");
}
@media only screen and (max-width: $mobile-width) {
  .section {
    overflow-x: auto;
  }
}
.lects {
  align-items: baseline;
  &.fill {
    align-items: stretch;
  }
}
.lect {
  width: 192px;
  min-width: 192px;
}
.flag h2 {
  line-height: map-get($button-height, "small");
}
</style>
