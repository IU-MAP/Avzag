<template>
  <div v-if="entry" class="col">
    <btn
      :class="{ 'card-0 flag': expanded, faded: faded && !expanded }"
      @click="expanded = expanded ? 0 : 1"
    >
      <template v-if="expanded">
        <h2>{{ plain }}</h2>
        <Flag :lect="lect" class="blur" />
      </template>
      <span v-else>{{ plain }}</span>
    </btn>
    <template v-if="expanded">
      <div class="row">
        <btn
          v-for="([t, i], j) in views"
          :key="i"
          class="flex"
          :icon="i"
          :text="t"
          :class="{ highlight: expanded === j + 1 }"
          @click="expanded = j + 1"
        />
      </div>
      <template v-if="expanded === 1">
        <EntryUse :scholar="scholar" :use="targetUse" />
        <EntryUse
          v-for="u in otherUses"
          :key="u.meaning"
          :scholar="scholar"
          :use="u"
        />
      </template>
      <template v-else-if="expanded === 2">
        <p v-if="scholar && entry.tags" class="text-tags">
          {{ entry.tags?.join(" ") }}
        </p>
        <Notes :notes="entry.notes" />
        <div class="col-0 card-1">
          <p v-for="(f, i) in entry.forms" :key="i">
            {{ f.plain }}
            <span v-if="scholar" class="text-faded">
              <span class="text-ipa">{{ f.ipa }}</span>
              {{ f.glossed }}
            </span>
          </p>
        </div>
      </template>
      <hr />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, inject, watch } from "vue";
import { Entry } from "./types";
import Flag from "@/components/Flag.vue";
import Notes from "@/components/Notes/index.vue";
import EntryUse from "./EntryUse.vue";

export default defineComponent({
  name: "EntryCard",
  components: { Notes, Flag, EntryUse },
  props: {
    lect: { type: String, default: "" },
    meaning: { type: String, default: "" },
    entry: { type: Object as PropType<Entry>, default: undefined },
    scholar: Boolean,
  },
  setup(props) {
    const expanded = ref(0);
    const views = [
      ["Uses", "textsms"],
      ["Info", "info"],
    ];

    const expandedEntries = inject<Map<Entry, number>>("expandedEntries");
    const setExpansion = inject<(en: Entry, ex: boolean) => void>(
      "setExpansion"
    );
    const faded = computed(() => expandedEntries?.has(props.entry));
    watch(
      () => !!expanded.value,
      (ex) => setExpansion?.(props.entry, ex)
    );

    const plain = computed(() => props.entry?.forms[0].plain);
    const targetUse = computed(() =>
      props.entry.uses.find((u) => u.meaning === props.meaning)
    );
    const otherUses = computed(() =>
      props.entry.uses.filter((u) => u.meaning !== props.meaning)
    );
    return { views, expanded, faded, plain, otherUses, targetUse };
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
