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
        <a href="https://github.com/alkaitagi/avzag/wiki" class="wrap">
          <btn icon="help_outline" />
        </a>
      </div>
      <div class="row">
        <btn icon="cloud_download" @click="loadLect" />
        <btn icon="file_upload" @click="loadJSON" />
        <btn icon="file_download" @click="saveJSON" />
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
import { uploadFile, downloadFile } from "@/file-manager";

export default defineComponent({
  components: { ConfirmButton },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const menus = [
      {
        text: "Phonology",
        name: "PhonologyEditor",
      },
      {
        text: "Converter",
        name: "ConverterEditor",
      },
      {
        text: "Phrasebook",
        name: "PhrasebookEditor",
      },
      {
        text: "Phrasebook Corpus",
        name: "PhrasebookCorpusEditor",
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
      } else json = await loadDBJSON(config.filename());
      if (json) file.value = json;
    }
    function loadJSON() {
      uploadFile((c) => (file.value = JSON.parse(c)));
    }
    function saveJSON() {
      downloadFile(
        JSON.stringify(file.value, null, 2) + "\n",
        route.name as string,
        ".json"
      );
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
