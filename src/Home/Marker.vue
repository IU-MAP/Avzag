<template>
  <div ref="root" class="map-marker text-center">
    <p class="icon" :class="{ 'highlight-font': selected }">expand_less</p>
    <h2
      :class="{ 'highlight-font': selected && !faded, 'text-faded': faded }"
      @click="emit('click')"
    >
      {{ name }}
    </h2>
  </div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  defineComponent,
  PropType,
  nextTick,
  onUnmounted,
} from "vue";
import { Lect, SearchState } from "./types";
import mapboxgl from "mapbox-gl";
import { map } from "./map";

export default defineComponent({
  props: {
    lect: { type: Object as PropType<Lect>, default: () => ({}) },
    search: { type: Object as PropType<SearchState>, default: () => ({}) },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const root = ref<HTMLElement>();
    let marker: mapboxgl.Marker;
    nextTick(() => {
      if (map.value) {
        marker = new mapboxgl.Marker({
          element: root.value,
          anchor: "top",
        })
          .setLngLat(props.lect.point)
          .addTo(map.value);
      }
    });
    onUnmounted(() => marker?.remove());

    const name = computed(() => props.lect.name);
    const selected = computed(() => props.search.selected.has(name.value));
    const faded = computed(
      () => props.search.visible.size && !props.search.visible.has(name.value)
    );

    return { emit, root, name, selected, faded };
  },
});
</script>

<style lang="scss" scoped>
.map-marker {
  text-shadow: map-get($shadows, "elevated");
}
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
  &:hover {
    border-color: var(--color-text);
  }
}
</style>
