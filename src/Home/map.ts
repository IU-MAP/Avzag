import mapboxgl from "mapbox-gl";
import ResizeObserver from "resize-observer-polyfill";
import { onUnmounted, shallowRef } from "vue";

export const map = shallowRef<mapboxgl.Map>();

function bindCamera() {
  const camera = {
    center: new mapboxgl.LngLat(45, 43),
    zoom: 5,
  };

  if (localStorage.camera)
    Object.assign(camera, JSON.parse(localStorage.camera));
  onUnmounted(() => (localStorage.camera = JSON.stringify(camera)));

  if (!map.value) return;
  map.value.setZoom(camera.zoom);
  map.value.setCenter(camera.center);

  map.value.on(
    "move",
    () => map.value && (camera.center = map.value.getCenter())
  );
  map.value.on("zoom", () => map.value && (camera.zoom = map.value.getZoom()));
}

function bindTheme() {
  function setStyle({ matches }: MediaQueryList | MediaQueryListEvent) {
    const theme = matches ? "dark" : "light";
    map.value?.setStyle(`mapbox://styles/mapbox/${theme}-v10`);
  }
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  query.addEventListener("change", setStyle);
  setStyle(query);
}

function bindResize() {
  const observer = new ResizeObserver(() => map.value?.resize());
  const container = map.value?.getContainer();
  if (container) observer.observe(container);
}

export function createMap(container = "map") {
  map.value = new mapboxgl.Map({
    container,
    minZoom: 2,
    maxZoom: 10,
    doubleClickZoom: false,
    accessToken:
      "pk.eyJ1IjoiYWxrYWl0YWdpIiwiYSI6ImNrZngwYTlqZjA1Mm4ycm5rcW94YmV4bHoifQ.c--QtLURoBAPTqqrLGZ0qQ",
  });

  bindCamera();
  bindTheme();
  bindResize();

  onUnmounted(() => map.value?.remove());
}
