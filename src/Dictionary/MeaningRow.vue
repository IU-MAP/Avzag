<template>
  <div class="row-1 appear lects small">
    <div class="meaning lect col">
      <i class="text-faded">{{ meaning }}</i>
    </div>
    <div v-for="l in lects" :key="l" class="col lect">
      <template v-if="entries[l]">
        <EntryCard
          v-for="e in entries[l]"
          :key="e.forms[0].plain"
          :lect="l"
          :entry="e"
          :meaning="meaning"
          :scholar="scholar"
          class="appear"
        />
      </template>
      <span v-else />
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
    scholar: Boolean,
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
}
.lect {
  border-top: var(--color-active) dashed $border-width;
  padding-top: map-get($margins, "half");
  width: 256px;
  min-width: 256px;
  @media only screen and (max-width: $mobile-width) {
    width: 192px;
    min-width: 192px;
  }
  &:first-child {
    width: 128px;
    min-width: 128px;
  }
}
.meaning {
  $h: 6 + map-get($button-height, "small");
  height: $h;
  min-height: $h;
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
