<template>
  <div class="row-1 appear lects small">
    <div class="translation lect col">
      <i class="text-faded">{{ meaning }}</i>
    </div>
    <div v-for="l in lects" :key="l" class="col lect">
      <EntryCard
        v-for="(e, i) in entries[l]"
        :key="i"
        :entry="e"
        class="appear"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import EntryCard from "./EntryCard.vue";
import { Entry } from "./types";

export default defineComponent({
  name: "MeaningRow",
  components: { EntryCard },
  props: {
    meaning: { type: String, default: "" },
    lects: { type: Array as PropType<string[]>, default: () => [] },
    entries: {
      type: Object as PropType<Record<string, Entry[]>>,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scoped>
.lects {
  align-items: flex-start;
  border-top: var(--color-active) dashed $border-width;
  padding-top: map-get($margins, "half");
}
.lect {
  width: 192px;
  min-width: 192px;
}
.translation {
  height: map-get($button-height, "small");
  justify-content: center;
}
.appear {
  animation: appear $transition;
}
@keyframes appear {
  0% {
    transform: translateY(map-get($margins, "normal"));
    opacity: 0;
  }
}
</style>
