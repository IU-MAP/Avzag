<template>
  <div id="root">
    <div class="section row scroll">
      <router-link to="/home">
        <btn icon="arrow_back" />
      </router-link>
      <router-link
        v-for="{ icon, name } in userRoutes"
        :key="name"
        v-slot="{ isActive }"
        :to="{ name }"
      >
        <btn :icon="icon" :is-on="isActive"><h2 v-text="name" /></btn>
      </router-link>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { userRoutes } from "@/router";

export default defineComponent({
  setup() {
    return { userRoutes };
  },
});
</script>

<style lang="scss" scoped>
#root {
  background-color: var(--color-foreground);
  margin: -1 * map-get($margins, "normal");
  margin-bottom: map-get($margins, "double");
  padding: map-get($margins, "half") map-get($margins, "normal");
  border-radius: 0;
  box-shadow: map-get($shadows, "elevated");
}
</style>
