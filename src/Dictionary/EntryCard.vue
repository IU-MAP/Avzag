<template>
  <div v-if="entry && expand >= 0" class="col">
    <div class="row">
      <btn
        v-for="([t, i], j) in views"
        :key="i"
        :icon="i"
        :text="expand === j ? t : ''"
        :class="expand === j && 'highlight flex'"
        @click="expand = expand === j ? -1 : j"
      />
    </div>
    <div v-if="expand >= 0" class="col card">
      <template v-if="expand === 0">
        <p class="col-0">
          {{ entry.forms[0].plain }}
          <span class="text-ipa">{{ entry.forms[0].ipa }}</span>
        </p>
        <p v-if="entry.explanation">{{ entry.explanation }}</p>
      </template>
      <template v-else-if="expand === 1">
        <div v-for="(f, i) in entry.forms" :key="i" class="col-0">
          {{ f.plain }}
          <span class="text-ipa">{{ f.ipa }}</span>
          {{ f.glossed }}
        </div>
      </template>
      <template v-else-if="expand === 2">
        <div v-for="(s, i) in entry.samples" :key="i" class="col-0">
          <p>{{ s.text.plain }}</p>
          <p class="text-faded text-caption">{{ s.translation }}</p>
        </div>
      </template>
    </div>
  </div>
  <btn v-else-if="entry" :text="plain" @click="expand = 0" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { Entry } from "./types";

export default defineComponent({
  name: "EntryCard",
  props: { entry: { type: Object as PropType<Entry>, default: undefined } },
  setup(props) {
    const expand = ref(-1);
    const views = [
      ["Info", "info"],
      ["Forms", "tune"],
      ["Samples", "speaker_notes"],
    ];
    const plain = computed(() => props.entry?.forms[0].plain);
    return { expand, plain, views };
  },
});
</script>

<style lang="scss" scoped>
.entry-item {
  align-items: normal;
}
</style>
