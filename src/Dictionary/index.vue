<template>
  <div class="section col small">
    <h2 v-if="dbInfo.state !== 'ready'">{{ dbInfo.text }}...</h2>
    <template v-else>
      <div class="row-1 lects fill">
        <div class="row lect">
          <!-- <select v-if="queryMode === 'Lists'" v-model="queries['']">
            <option v-for="(l, n) in dictionaryMeta.lists" :key="n" :value="l">
              {{ n }}
            </option>
          </select> -->
          <toggle v-model="lists" icon="star_outline" />
          <btn class="flex" text="Meanings" :is-on="!lect" @click="lect = ''" />
        </div>
        <div v-for="l in lects" :key="l" class="col lect flag">
          <Flag :lect="l" class="blur" />
          <button :class="{ highlight: lect === l }" @click="lect = l">
            <h2 class="flex">{{ l }}</h2>
          </button>
          <!-- <input
            v-model="queries[l]"
            class="selectable"
            type="text"
            :placeholder="`Search by ${l} form...`"
            :readonly="lect !== l"
            @click="lect = l"
          /> -->
        </div>
      </div>
      <div class="row">
        <btn :disabled="searchInfo.searching" icon="search" @click="search" />
        <input
          v-model="query"
          type="text"
          :placeholder="lect ? `Enter ${lect} form...` : 'Enter meaning...'"
        />
      </div>
      <div v-for="(ind, m) of searchInfo.results" :key="m" class="row-1 lects">
        <div class="col lect">
          <hr />
          <i class="text-faded translation">{{ m }}</i>
        </div>
        <div v-for="l in lects" :key="l" class="col lect">
          <hr />
          <EntryCard v-for="(e, i) in ind[l]" :key="i" :entry="e" />
        </div>
      </div>
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
import EntryCard from "./EntryCard.vue";
import Flag from "@/components/Flag.vue";
import { SearchCommand } from "./types";
import Btn from "@/components/Btn.vue";

export default defineComponent({
  components: { EntryCard, Flag, Btn },
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
      if (route.name === "Home") {
        searchInfo.searching = false;
        searchworker.postMessage("stop");
        dbworker.postMessage("stop");
      }
    });

    function search() {
      if (!query.value) return;
      searchInfo.searching = true;
      searchInfo.results = {};
      searchworker.postMessage(
        JSON.stringify({
          lect: lect.value,
          query: query.value.split(","),
        } as SearchCommand)
      );
    }

    return {
      lects: lects_,
      queries,
      query,
      lect,
      lists,
      searchInfo,
      dictionaryMeta,
      dbInfo,
      search,
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
