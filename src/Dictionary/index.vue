<template>
  <div class="section col small">
    <h2 v-if="dbInfo.state !== 'ready'">{{ dbInfo.text }}...</h2>
    <template v-else>
      <h2 v-if="searchInfo.searching">Searching...</h2>
      <button v-else @click="search">Search</button>
      <div class="row-1 lects fill">
        <div class="col lect">
          <!-- <select v-if="queryMode === 'Lists'" v-model="queries['']">
            <option v-for="(l, n) in dictionaryMeta.lists" :key="n" :value="l">
              {{ n }}
            </option>
          </select> -->
          <input
            v-model="queries['']"
            class="selectable"
            type="text"
            placeholder="Search..."
            :readonly="!!lect"
            @click="lect = ''"
          />
        </div>
        <div v-for="l in lects" :key="l" class="col lect flag">
          <Flag :lect="l" class="blur" />
          <h2 class="flex">{{ l }}</h2>
          <input
            v-model="queries[l]"
            class="selectable"
            type="text"
            :placeholder="`Search by ${l} form...`"
            :readonly="lect !== l"
            @click="lect = l"
          />
        </div>
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
import { defineComponent, reactive, ref, watchEffect } from "vue";
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

export default defineComponent({
  components: { EntryCard, Flag },
  setup() {
    const queries = reactive({} as Record<string, string>);
    const queryMode = ref("Translations");
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
      searchInfo.searching = true;
      searchInfo.results = {};
      searchworker.postMessage({
        lect: lect.value,
        query: queries[lect.value].split(","),
      } as SearchCommand);
    }

    return {
      lects: lects_,
      queries,
      queryMode,
      lect,
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
