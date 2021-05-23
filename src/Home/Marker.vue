<template>
  <div ref="div" class="text-center">
    <p class="icon" :class="{ 'highlight-font': selected }">expand_less</p>
    <h2
      :class="{ 'highlight-font': selected && !faded, 'text-faded': faded }"
      @click="emit('click')"
      v-text="name"
    />
  </div>
</template>

<script lang="ts">
import L from "leaflet";
import {
  ref,
  computed,
  defineComponent,
  PropType,
  onUnmounted,
  onMounted,
} from "vue";
import { Lect, SearchState } from "./types";

export default defineComponent({
  props: {
    map: { type: Object as PropType<L.Map>, default: undefined },
    lect: { type: Object as PropType<Lect>, default: () => ({}) },
    search: { type: Object as PropType<SearchState>, default: () => ({}) },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const div = ref({} as HTMLElement);
    let marker: L.Marker;
    onMounted(() => {
      marker = L.marker(props.lect.point, {
        icon: L.divIcon({
          html: div.value,
          className: "marker",
        }),
      }).addTo(props.map);
    });
    onUnmounted(() => marker?.remove());

    const name = computed(() => props.lect.name);
    const selected = computed(() => props.search.selected.has(name.value));
    const faded = computed(
      () => props.search.visible.size && !props.search.visible.has(name.value)
    );

    return { emit, div, name, selected, faded };
  },
});
</script>

<style lang="scss">
.marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-shadow: map-get($shadows, "elevated");
  * {
    transition: $transition;
  }
}
</style>

<style lang="scss" scoped>
.icon {
  line-height: 30%;
  margin-bottom: map-get($margins, "half");
}
h2 {
  line-height: 100%;
  cursor: pointer;
  padding-bottom: $border-width;
  border-bottom: $border-width dashed transparent;
  border-radius: 0;
  text-shadow: map-get($shadows, "elevated");
  &:hover {
    border-color: var(--color-text);
  }
}
</style>
