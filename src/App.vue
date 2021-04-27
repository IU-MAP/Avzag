<template>
  <router-view />
</template>

<script lang="ts">
import { watchEffect, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { lastUpdated, lects } from "./store";

import "./Dictionary/main";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    lastUpdated.value = JSON.parse(localStorage.lastUpdated ?? "{}");

    if (!route.name || route.name === "Home") {
      router.push(
        localStorage.url && localStorage.url !== route.path
          ? { path: localStorage.url }
          : { name: "Home" }
      );
    }
    if (route.name !== "Home")
      lects.value = JSON.parse(localStorage.lects ?? '["Kaitag"]');

    watchEffect(() => {
      const name = route.name as string;
      if (!name) return;
      localStorage.url = route.path;
      if (["Dictionary"].includes(name)) localStorage.urlUser = route.path;
    });
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Material+Icons+Outlined");
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap");

@import "scss/palette";
@import "scss/panels";
@import "scss/text";
@import "scss/controls";
@import "scss/body";
@import "scss/highlight";
@import "scss/colored";
</style>
