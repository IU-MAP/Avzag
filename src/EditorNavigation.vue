<template>
  <div id="root" class="small">
    <div class="section row scroll">
      <div class="row">
        <router-link to="/home">
          <btn icon="arrow_back" />
        </router-link>
        <select v-model="menu">
          <option
            v-for="{ text, name } in menus"
            :key="name"
            :value="name"
            v-text="text"
          />
        </select>
      </div>
      <div class="row">
        <template v-if="menu !== 'phrasebookCorpusEditor'">
          <select v-model="lect">
            <option value="">[Custom]</option>
            <option v-for="l in lects" :key="l" :value="l" v-text="l" />
          </select>
          <template v-if="lect">
            <btn icon="sync" @click="pullLect" />
            <btn icon="cloud_upload" @click="pushLect" />
          </template>
        </template>
        <btn icon="file_upload" @click="uploadJSON" />
        <btn icon="file_download" @click="downloadJSON" />
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
import { loadJSON } from "@/store";
import { config, file, resetFile } from "@/editor";
import { uploadFile, downloadFile } from "@/file-manager";
import { pushToStore } from "./gh-manager";
import { Lect } from "./Home/types";

export default defineComponent({
  components: { ConfirmButton },
  setup() {
    const route = useRoute();
    const router = useRouter();

    loadJSON("catalogue", []).then(
      (c) => (lects.value = c.map((l: Lect) => l.name))
    );
    const lects = ref([] as string[]);
    const lect = ref(localStorage.editorLect ?? "");
    watch(
      () => lect.value,
      () => (localStorage.editorLect = lect.value)
    );

    const menus = [
      {
        text: "Dictionary",
        name: "dictionaryEditor",
      },
    ];
    const menu = ref((route.name ?? menus[0].name) as string);
    watch(menu, (menu) => router.push({ name: menu }));

    async function pullLect() {
      let json;
      if (typeof config.filename === "string") {
        json = await loadJSON(lect.value + "/" + config.filename);
      } else json = await loadJSON(config.filename());
      if (json) file.value = json;
    }
    function uploadJSON() {
      uploadFile((c) => (file.value = JSON.parse(c)));
    }
    function downloadJSON() {
      downloadFile(
        JSON.stringify(file.value, null, 2) + "\n",
        route.name as string,
        ".json"
      );
    }
    function pushLect() {
      const branch = [
        menu.value,
        lect.value,
        new Date().toISOString().slice(0, -1).replaceAll(/\D/g, "."),
      ].join("-");
      pushToStore(
        JSON.stringify(file.value, null, 2) + "\n",
        lect.value + "/dictionary.json",
        window.prompt("Enter optional comment") ?? "",
        branch
      );
    }

    return {
      menu,
      menus,
      pullLect,
      pushLect,
      uploadJSON,
      downloadJSON,
      resetFile,
      lect,
      lects,
    };
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
