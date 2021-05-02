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
        <p v-if="isOutdated" class="icon">schedule</p>
        <p v-if="isDirty" class="icon">edit</p>
        <template v-if="!config.global">
          <select v-model="lect" @change="$event.target.value = lect ?? ''">
            <option value="" v-text="'[Custom]'" />
            <option v-for="l in lects" :key="l" :value="l" v-text="l" />
          </select>
        </template>
        <btn
          v-if="lect"
          :disabled="!isDirty"
          icon="cloud_upload"
          @click="pushFile"
        />
        <btn icon="file_upload" @click="uploadJSON" />
        <btn icon="file_download" @click="downloadJSON" />
        <ConfirmButton
          :disabled="!isDirty"
          message="Reset file?"
          @confirm="resetFile"
        />
      </div>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import ConfirmButton from "@/components/ConfirmButton.vue";
import { ref, watch, defineComponent, computed } from "vue";
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

    loadJSON("catalogue", []).then(
      (c) => (lects.value = c.map((l: Lect) => l.name))
    );
    const lects = ref([] as string[]);
    const lect_ = computed({
      get: () => lect.value,
      set: (l) => {
        if (window.confirm("Changing language will discard all local edits!"))
          lect.value = l;
      },
    });
    const routeName = ref((route.name as string) ?? editorRoutes[0].name);
    watch(routeName, () => router.push({ name: routeName.value }));

    return {
      routeName,
      editorRoutes,
      resetFile,
      pushFile,
      uploadJSON,
      downloadJSON,
      lect: lect_,
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
