<template>
  <div v-if="entry && expand >= 0" class="col">
    <h2 class="card flag" @click="expand = -1">
      <Flag :lect="lect" class="blur" />
      {{ plain }}
    </h2>
    <div class="row">
      <btn
        v-for="([t, i], j) in views"
        :key="i"
        :icon="i"
        :text="expand === j ? t : ''"
        :class="expand === j && 'highlight flex'"
        @click="expand = j"
      />
    </div>
    <div v-if="expand >= 0" class="col">
      <template v-if="expand === 0">
        <div v-for="c in entry.concepts" :key="c.meaning" class="col">
          <div>
            <h2 style="user-select: auto; display: inline">{{ c.meaning }}</h2>
            <span>&nbsp;</span>
            <span v-if="scholar" class="text-tags">
              {{ c.tags?.join(" ") }}
            </span>
          </div>
          <Notes :notes="c.notes" />
          <template v-for="(s, i) in c.samples" :key="i">
            <div class="col-0 card-0">
              {{ s.plain }}
              <span class="col-0 text-faded">
                {{ s.translation }}
                <span v-if="scholar" class="text-caption col-0">
                  <span class="text-ipa">
                    {{ s.ipa }}
                  </span>
                  {{ s.glossed }}
                </span>
              </span>
            </div>
          </template>
        </div>
      </template>
      <template v-else-if="expand === 1">
        <p v-if="scholar" class="text-tags">{{ entry.tags?.join(" ") }}</p>
        <div class="col-0 card-0">
          <p v-for="(f, i) in entry.forms" :key="i">
            {{ f.plain }}
            <span v-if="scholar" class="text-caption text-faded">
              <span class="text-ipa">{{ f.ipa }}</span>
              {{ f.glossed }}
            </span>
          </p>
        </div>
        <Notes :notes="entry.notes" />
      </template>
    </div>
  </div>
  <btn v-else-if="entry" :class="{ faded }" :text="plain" @click="expand = 0" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, inject, watch } from "vue";
import { Entry } from "./types";
import Flag from "@/components/Flag.vue";
import Notes from "@/components/Notes/index.vue";

export default defineComponent({
  name: "EntryCard",
  components: { Notes, Flag },
  props: {
    lect: { type: String, default: "" },
    entry: { type: Object as PropType<Entry>, default: undefined },
    scholar: Boolean,
  },
  setup(props) {
    const expand = ref(-1);
    const views = [
      ["Usage", "textsms"],
      ["Info", "info"],
    ];
    const expanded = inject<Set<Entry>>("expanded");
    const toggleExpanded = inject<(en: Entry, ex: boolean) => void>(
      "toggleExpanded"
    );

    const faded = computed(() => expanded?.has(props.entry));
    watch(
      () => expand.value,
      () => toggleExpanded?.(props.entry, expand.value >= 0)
    );
    const plain = computed(() => props.entry?.forms[0].plain);
    return { expand, plain, views, faded };
  },
});
</script>

<style lang="scss" scoped>
.faded {
  background-color: transparent !important;
  opacity: map-get($opacity, "text");
  &:hover {
    opacity: 1;
  }
}
</style>
