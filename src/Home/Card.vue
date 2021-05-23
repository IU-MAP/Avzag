<template>
  <div v-if="visible" class="row-1 card flag">
    <Flag :lect="lect.name" />
    <div class="col-0">
      <h1 :class="{ 'highlight-font': selected }">
        {{ name }}
      </h1>
      <p class="text-caption">
        <span v-for="f in lect.family" :key="f" split class="text-dot">
          {{ f }}
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Lect, SearchState } from "../Home/types";

export default defineComponent({
  props: {
    lect: { type: Object as PropType<Lect>, default: () => ({}) },
    search: { type: Object as PropType<SearchState>, default: () => ({}) },
  },
  setup(props) {
    const name = computed(() => props.lect.name);
    const family = computed(() => props.lect.family.join(" › "));

    const selected = computed(() => props.search.selected.has(name.value));
    const visible = computed(() => props.search.visible.has(name.value));

    return { name, family, selected, visible };
  },
});
</script>

<style lang="scss" scoped>
* {
  text-align: left;
  user-select: none;
}
.card {
  min-height: 54px;
  max-height: 54px;
  background-color: var(--color-foreground);
  cursor: pointer;
  img {
    transform: translate(32%) rotate(-45deg);
    height: 200%;
    bottom: unset;
    filter: unset;
  }
  &:hover img {
    transform: translate(27%) rotate(-45deg);
  }
  &:active img {
    opacity: 1;
  }
}
</style>
