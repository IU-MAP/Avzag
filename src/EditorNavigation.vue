<template>
  <div id="root" class="small">
    <div class="section row scroll">
      <div class="row">
        <router-link to="/home">
          <btn icon="arrow_back" />
        </router-link>
        <select v-model="routeName">
          <option
            v-for="{ title, name } in editorRoutes"
            :key="name"
            :value="name"
            v-text="title"
          />
        </select>
      </div>
      <div class="row">
        <template v-if="lect">
          <p v-if="isOutdated" class="icon">schedule</p>
          <btn :disabled="!isDirty" icon="cloud_upload" @click="pushFile" />
        </template>
        <select v-if="!config.global" v-model="lect">
          <option value="" v-text="'[Custom]'" />
          <option v-for="l in lects" :key="l" :value="l" v-text="l" />
        </select>
        <btn icon="file_upload" @click="uploadJSON" />
        <btn icon="file_download" @click="downloadJSON" />
        <ConfirmButton
          :disabled="!isDirty"
          message="Reset file?"
          @confirm="resetFile(false)"
        />
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
import { editorRoutes } from "@/router";
import {
  lect,
  resetFile,
  pushFile,
  uploadJSON,
  downloadJSON,
  config,
  isDirty,
  isOutdated,
} from "@/editor";
import { Lect } from "./Home/types";

export default defineComponent({
  name: "EditorNavigation",
  components: { ConfirmButton },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const lects = ref([] as string[]);
    loadJSON("catalogue", []).then(
      (c) => (lects.value = c.map((l: Lect) => l.name))
    );

    const routeName = ref((route.name as string) ?? editorRoutes[0].name);
    watch(routeName, () => router.push({ name: routeName.value }));

    return {
      routeName,
      editorRoutes,
      resetFile,
      pushFile,
      uploadJSON,
      downloadJSON,
      lect,
      lects,
      config,
      isDirty,
      isOutdated,
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
