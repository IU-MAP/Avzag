<template>
  <div v-if="entry" class="col">
    <btn
      :class="{ 'card-0 flag': expand >= 0, faded: faded && expand < 0 }"
      @click="expand = expand < 0 ? 0 : -1"
    >
      <span v-if="expand < 0">{{ plain }}</span>
      <h2 v-else>{{ plain }}</h2>
      <Flag v-if="expand >= 0" :lect="lect" class="blur" />
    </btn>
    <template v-if="expand >= 0">
      <div class="row">
        <btn
          v-for="([t, i], j) in views"
          :key="i"
          :icon="i"
          :text="t"
          :class="{ highlight: expand === j }"
          class="flex"
          @click="expand = j"
        />
      </div>
      <div v-if="expand >= 0" class="col">
        <template v-if="expand === 0">
          <div v-for="u in entry.uses" :key="u.meaning" class="col">
            <div>
              <h2 style="user-select: auto; display: inline">
                {{ u.meaning }}
              </h2>
              <span>&nbsp;</span>
              <span v-if="scholar" class="text-tags">
                {{ u.tags?.join(" ") }}
              </span>
            </div>
            <Notes :notes="u.notes" />
            <template v-for="(s, i) in u.samples" :key="i">
              <div class="col-0 card-1">
                {{ s.plain }}
                <span class="col-0 text-faded">
                  {{ s.translation }}
                  <span v-if="scholar" class="col-0">
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
          <p v-if="scholar && entry.tags" class="text-tags">
            {{ entry.tags?.join(" ") }}
          </p>
          <div class="col-0 card-1">
            <p v-for="(f, i) in entry.forms" :key="i">
              {{ f.plain }}
              <span v-if="scholar" class="text-faded">
                <span class="text-ipa">{{ f.ipa }}</span>
                {{ f.glossed }}
              </span>
            </p>
          </div>
          <Notes :notes="entry.notes" />
        </template>
      </div>
    </template>
  </div>
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
      ["Uses", "textsms"],
      ["Info", "info"],
    ];
    const expanded = inject<Set<Entry>>("expanded");
    const toggleExpanded = inject<(en: Entry, ex: boolean) => void>(
      "toggleExpanded"
    );

    const faded = computed(() => expanded?.has(props.entry));
    watch(
      () => expand.value >= 0,
      (ex) => toggleExpanded?.(props.entry, ex)
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
