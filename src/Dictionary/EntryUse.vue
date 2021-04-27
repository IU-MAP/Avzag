<template>
  <div class="col">
    <div>
      <h2 style="user-select: auto; display: inline">
        {{ use.meaning }}
      </h2>
      <span>&nbsp;</span>
      <span v-if="scholar" class="text-tags">
        {{ use.tags?.join(" ") }}
      </span>
    </div>
    <Notes :notes="use.notes" />
    <template v-for="(s, i) in use.samples" :key="i">
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

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Use } from "./types";
import Notes from "@/components/Notes/index.vue";

export default defineComponent({
  name: "EntryUse",
  components: { Notes },
  props: {
    scholar: Boolean,
    use: { type: Object as PropType<Use>, default: undefined },
  },
});
</script>
