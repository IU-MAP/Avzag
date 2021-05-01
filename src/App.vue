<template>
  <router-view />
</template>

<script lang="ts">
import { watchEffect, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

import "./store";
import "./Phonology/main";
import "./Converter/main";
import "./Phrasebook/main";
import "./Dictionary/main";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    if (!route.name || route.name === "home") {
      router.push(
        localStorage.url && localStorage.url !== route.path
          ? { path: localStorage.url }
          : { name: "home" }
      );
    }

    watchEffect(() => {
      const name = route.name as string;
      if (!name) return;
      localStorage.url = route.path;
      if (["phonology", "converter", "phrasebook", "dictionary"].includes(name))
        localStorage.urlUser = route.path;
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
