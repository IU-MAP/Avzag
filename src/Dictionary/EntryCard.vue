<template>
  <div v-if="entry && expand >= 0" class="col">
    <div class="card">{{ plain }}</div>
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
    <div v-if="expand >= 0" class="col">
      <template v-if="expand === 0">
        <b>
          <i class="text-tags"> {{ entry.tags?.join(" ") }} </i>
        </b>
        <Notes :notes="entry.notes" />
      </template>
      <template v-else-if="expand === 1">
        <p v-for="(f, i) in entry.forms" :key="i">
          {{ f.plain }}
          <span class="text-caption text-faded">
            <span class="text-ipa">{{ f.ipa }}</span>
            {{ f.glossed }}
          </span>
        </p>
      </template>
      <template v-else-if="expand === 2">
        <template v-for="(s, i) in entry.samples" :key="i">
          <p class="col-0">
            {{ s.text.plain }}
            <span class="text-caption col-0">
              {{ s.translation }}
              <span class="text-faded col-0">
                <span class="text-ipa">
                  {{ s.text.ipa }}
                </span>
                {{ s.text.glossed }}
              </span>
            </span>
          </p>
        </template>
      </template>
    </div>
  </div>
  <btn v-else-if="entry" :text="plain" @click="expand = 0" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { Entry } from "./types";
import Notes from "@/components/Notes/index.vue";

export default defineComponent({
  name: "EntryCard",
  components: { Notes },
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
