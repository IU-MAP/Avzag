<template>
  <div class="section small grid">
    <div class="col">
      <btn text="one" />
      <btn text="two" />
      <btn text="three" />
      <btn text="four" />
      <btn text="five" />
      <btn text="six" />
      <btn text="seven" />
    </div>
    <div class="col-2">
      <EditorCard icon="tag" header="Tags">
        <input v-model="entry.tags" type="text" />
      </EditorCard>
      <NotesEditor v-model="entry.notes" />
      <EditorCard icon="tune" header="Forms">
        <input v-model="entry.tags" type="text" />
      </EditorCard>
    </div>
    <div class="col-2">
      <EditorCard icon="textsms" header="Uses">
        <template #header>
          <ArrayControl
            v-model="entry.uses"
            v-model:item="usecase"
            :add="() => ({ meaning: 'meaning #' + entry.uses.length })"
            shift-two
            remove
          />
        </template>
        <div class="col scroll">
          <btn
            v-for="(u, i) in entry.uses"
            :key="i"
            :text="u.meaning"
            :is-on="usecase === u"
            @click="usecase = u"
          />
        </div>
      </EditorCard>
      <template v-if="usecase">
        <EditorCard icon="lightbulb" header="Concept">
          <div class="row">
            <input v-model="usecase.meaning" style="flex: 1" type="text" />
            <input v-model="usecase.tags" style="flex: 2" type="text" />
          </div>
        </EditorCard>
        <NotesEditor v-model="usecase.notes" />
        <EditorCard icon="format_list_numbered" header="Samples">
          <template #header>
            <ArrayControl
              v-model="usecase.samples"
              :add="() => ({ plain: 'samples #' + usecase.samples.length })"
              shift-two
              remove
            />
          </template>
          <div class="col">
            <btn v-for="(s, i) in usecase.samples" :key="i" :text="s.plain" />
          </div>
        </EditorCard>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import ArrayControl from "@/components/ArrayControl.vue";
import EditorCard from "@/components/EditorCard.vue";
import NotesEditor from "@/components/Notes/Editor.vue";

import { computed, ref, defineComponent, reactive } from "vue";
import { setupEditor } from "@/editor";

export default defineComponent({
  components: { EditorCard, ArrayControl, NotesEditor },
  setup() {
    // const phoneme = ref<PhonemeUse>();
    // const file = setupEditor<PhonemeUse[]>({
    //   defaultFile: [],
    //   filename: "phonology",
    //   storage: "editor.phonology",
    // });

    const entry = ref({ uses: [] });
    const usecase = ref();
    return { entry, usecase };
  },
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 192px minmax(0, 1fr) minmax(0, 1fr);
  gap: map-get($margins, "double");
}
.sample input {
  width: 64px;
}
// @media only screen and (max-width: $mobile-width) {
//   .grid {
//     grid-template-columns: 100%;
//   }
// }

.scroll {
  max-height: 128px;
}
</style>
