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
        <div v-for="c in entry.concepts" :key="c.meaning" class="col-0">
          <p>
            {{ c.meaning }}
            <span class="text-tags">{{ c.tags?.join(" ") }}</span>
          </p>
          <template v-for="(s, i) in c.samples" :key="i">
            <p class="col-0">
              {{ s.plain }}
              <span class="text-caption col-0">
                {{ s.translation }}
                <span class="text-faded col-0">
                  <span class="text-ipa">
                    {{ s.ipa }}
                  </span>
                  {{ s.glossed }}
                </span>
              </span>
            </p>
          </template>
          <Notes :notes="c.notes" />
        </div>
      </template>
      <template v-else-if="expand === 1">
        <p class="text-tags">{{ entry.tags?.join(" ") }}</p>
        <p v-for="(f, i) in entry.forms" :key="i">
          {{ f.plain }}
          <span class="text-caption text-faded">
            <span class="text-ipa">{{ f.ipa }}</span>
            {{ f.glossed }}
          </span>
        </p>
        <Notes :notes="entry.notes" />
      </template>
    </div>
  </div>
  <btn v-else-if="entry" :text="plain" @click="expand = 0" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { Entry } from "./types";
import Flag from "@/components/Flag.vue";
import Notes from "@/components/Notes/index.vue";

export default defineComponent({
  name: "EntryCard",
  components: { Notes, Flag },
  props: {
    lect: { type: String, default: "" },
    entry: { type: Object as PropType<Entry>, default: undefined },
  },
  setup(props) {
    const expand = ref(-1);
    const views = [
      ["Samples", "speaker_notes"],
      ["Forms", "tune"],
    ];
    const plain = computed(() => props.entry?.forms[0].plain);
    return { expand, plain, views };
  },
});
</script>
