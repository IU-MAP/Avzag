<template>
  <div ref="div" class="map">
    <slot :map="map" />
  </div>
</template>

<script lang="ts">
import "leaflet/dist/leaflet.css";
import L, { LatLng } from "leaflet";

import {
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  shallowRef,
} from "vue";
import { Lect } from "./types";
export default defineComponent({
  props: {
    catalogue: { type: Array as PropType<Lect[]>, default: () => [] },
  },
  setup() {
    const div = ref({} as HTMLElement);
    const map = shallowRef<L.Map>();
    const camera = { center: new LatLng(43, 45), zoom: 5 };
    let layer: L.TileLayer;

    onMounted(() => {
      map.value = L.map(div.value, {
        minZoom: 3,
        maxZoom: 10,
        zoomControl: false,
        doubleClickZoom: false,
      });
      layer = L.tileLayer("", {
        subdomains: "abcd",
        attribution:
          '<a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors',
      }).addTo(map.value);

      bindTheme();
      bindCamera();
    });

    function bindTheme() {
      function setStyle({ matches }: MediaQueryList | MediaQueryListEvent) {
        const theme = matches ? "dark" : "light";
        const token =
          "6F94UuT7990iq8Z5yQpnbyujlm0Zr7bZkJwMshoaTEtYnsabLMp2EttcF6fCoW10";
        layer?.setUrl(
          `https://tile.jawg.io/jawg-${theme}/{z}/{x}/{y}.png?access-token=${token}`
        );
      }
      const query = window.matchMedia("(prefers-color-scheme: dark)");
      query.addEventListener("change", setStyle);
      setStyle(query);
      onUnmounted(() => query.removeEventListener("change", setStyle));
    }

    function bindCamera() {
      if (!map.value) return;
      if (localStorage.camera)
        Object.assign(camera, JSON.parse(localStorage.camera));

      map.value.setView(camera.center, camera.zoom);
      map.value.on("move", () => {
        if (map.value) camera.center = map.value.getCenter();
      });
      map.value.on("zoom", () => {
        if (map.value) camera.zoom = map.value.getZoom();
      });
    }
    onUnmounted(() => (localStorage.camera = JSON.stringify(camera)));

    return { div, map };
  },
});
</script>

<style lang="scss">
.map {
  width: 100vw;
  height: 100vh;
  position: absolute;
  * {
    transition: none;
    border-radius: 0;
  }
  z-index: 0;
}
</style>
