<template>
  <div id="root" class="small">
    <div class="section row scroll">
      <div class="row">
        <router-link to="/home">
          <btn icon="arrow_back" />
        </router-link>
        <select v-model="menu">
          <option v-for="{ text, name } in menus" :key="name" :value="name">
            {{ text }}
          </option>
        </select>
        <a href="https://github.com/alkaitagi/Avzag/wiki" class="wrap">
          <btn icon="help_outline" />
        </a>
      </div>
      <div class="row">
        <btn icon="language" @click="loadLect" />
        <btn icon="code" @click="loadJSON" />
        <btn icon="integration_instructions" @click="saveJSON" />
        <ConfirmButton message="Reset file?" @confirm="resetFile" />
      </div>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import ConfirmButton from "@/components/ConfirmButton.vue";

import { ref, watch, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { loadJSON as loadDBJSON } from "@/store";
import { config, file, resetFile } from "@/editor";

export default defineComponent({
  components: { ConfirmButton },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const menus = [
      {
        text: "Dictionary",
        name: "DictionaryEditor",
      },
    ];
    const menu = ref((route.name ?? menus[0].name) as string);
    watch(menu, (menu) => router.push({ name: menu }));

    async function loadLect() {
      let json;
      if (typeof config.filename === "string") {
        const lect = window.prompt("Enter lect name");
        if (!lect) return;
        json = await loadDBJSON(lect + "/" + config.filename);
      } else {
        json = await loadDBJSON(config.filename());
      }
      if (json) file.value = json;
    }
    function loadJSON() {
      const f = JSON.parse(window.prompt("Enter JSON") ?? "0");
      if (f) file.value = f;
    }
    function saveJSON() {
      navigator.clipboard.writeText(JSON.stringify(file.value, null, 2) + "\n");
    }

    return { menu, menus, loadLect, loadJSON, saveJSON, resetFile };
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
  :not(.icon) {
    font-weight: bold;
  }
}
.section {
  justify-content: space-between;
}
</style>
