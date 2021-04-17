<template>
  <div class="section col small">
    <h2 v-if="dbInfo.state !== 'ready'">{{ dbInfo.text }}...</h2>
    <div v-else class="row-1 lects fill">
      <div class="col lect">
        <div class="row">
          <btn
            v-for="[t, i] in queryModes"
            :key="t"
            :text="queryMode === t ? t : ''"
            :icon="i"
            :class="queryMode === t && 'highlight flex'"
            @click="
              () => {
                queryMode = t;
                lect = '';
              }
            "
          />
        </div>
        <select v-if="queryMode === 'Lists'" v-model="queries['']">
          <option v-for="(l, n) in dictionaryMeta.lists" :key="n" :value="l">
            {{ n }}
          </option>
        </select>
        <input
          v-else
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
    <div v-for="(ind, m) of searchResult" :key="m" class="row-1 lects">
      <div class="col lect">
        <hr />
        <i class="text-faded translation">{{ m }}</i>
      </div>
      <div v-for="l in lects" :key="l" class="col lect">
        <hr />
        <EntryCard v-for="(e, i) in ind[l]" :key="i" :entry="e" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, shallowRef, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { dictionaryMeta, lects_, dbInfo, dbworker, searchworker } from "./main";
import EntryCard from "./EntryCard.vue";
import Flag from "@/components/Flag.vue";
import { Search } from "./types";

export default defineComponent({
  components: { EntryCard, Flag },
  setup() {
    const queries = reactive({} as Record<string, string>);
    const queryMode = ref("Translations");
    const lect = ref("");
    const route = useRoute();

    watchEffect(() => {
      if (route.name === "Home") dbworker.postMessage("stop");
    });

    watchEffect(async () => {
      if (dbInfo.state === "ready")
        searchworker.postMessage(
          JSON.stringify({
            lect: lect.value,
            query:
              queries[lect.value]
                ?.toLowerCase()
                .split(",")
                .map((q) => q.trim())
                .filter((q) => q) ?? [],
            queryMode: queryMode.value,
          })
        );
    });
    const searchResult = shallowRef({} as Search);

    searchworker.onmessage = (e) => (searchResult.value = JSON.parse(e.data));

    const queryModes = [
      ["Translations", "bookmark_border"],
      ["Tags", "label"],
      ["Lists", "format_list_bulleted"],
    ];

    return {
      queryModes,
      lects: lects_,
      queries,
      queryMode,
      lect,
      searchResult,
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
