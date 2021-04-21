<template>
  <div class="section small grid">
    <div class="col">
      <input type="text" placeholder="Meanings, tags, forms..." />
      <div class="scroll long col">
        <btn text="word 1" is-on />
        <btn text="word 2" />
        <btn text="word 3" />
        <btn text="word 4" />
        <btn text="word 5" />
        <btn text="word 6" />
        <btn text="word 7" />
      </div>
    </div>
    <div class="col-2">
      <EditorCard icon="tag" header="Tags">
        <TagsInput v-model="entry.tags" />
      </EditorCard>
      <NotesEditor v-model="entry.notes" />
      <EditorCard icon="tune" header="Forms">
        <template #header>
          <ArrayControl
            v-model="entry.forms"
            v-model:item="form"
            :add="() => ({ plain: 'from #' + entry.forms.length })"
            shift-two
            remove
          />
        </template>
        <div class="col scroll">
          <btn
            v-for="(f, i) in entry.forms"
            :key="i"
            :text="f.plain"
            :is-on="form === f"
            @click="form = f"
          />
        </div>
      </EditorCard>
      <EditorCard v-if="form" icon="segment" header="Form Texts">
        <input v-model="form.plain" type="text" placeholder="plain" />
        <input v-model="form.ipa" type="text" placeholder="ipa" />
        <input v-model="form.glossed" type="text" placeholder="glossed" />
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
        <EditorCard icon="lightFbulb" header="Concept">
          <div class="row">
            <input v-model="usecase.meaning" style="flex: 0.5" type="text" />
            <TagsInput v-model="usecase.tags" class="flex" />
          </div>
        </EditorCard>
        <NotesEditor v-model="usecase.notes" />
        <EditorCard icon="format_list_numbered" header="Samples">
          <template #header>
            <ArrayControl
              v-model="usecase.samples"
              v-model:item="sample"
              :add="() => ({ plain: 'sample #' + usecase.samples.length })"
              shift-two
              remove
            />
          </template>
          <div class="col">
            <btn
              v-for="(s, i) in usecase.samples"
              :key="i"
              :text="s.plain"
              :is-on="sample === s"
              @click="sample = s"
            />
          </div>
        </EditorCard>
        <EditorCard v-if="sample" icon="segment" header="Sample Texts">
          <input v-model="sample.plain" type="text" placeholder="plain" />
          <input v-model="sample.ipa" type="text" placeholder="ipa" />
          <input v-model="sample.glossed" type="text" placeholder="glossed" />
          <input
            v-model="sample.translation"
            type="text"
            placeholder="translation"
          />
        </EditorCard>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import ArrayControl from "@/components/ArrayControl.vue";
import EditorCard from "@/components/EditorCard.vue";
import NotesEditor from "@/components/Notes/Editor.vue";
import TagsInput from "@/components/TagsInput.vue";

import { computed, ref, defineComponent, reactive } from "vue";
import { setupEditor } from "@/editor";

export default defineComponent({
  components: { EditorCard, ArrayControl, NotesEditor, TagsInput },
  setup() {
    // const phoneme = ref<PhonemeUse>();
    // const file = setupEditor<PhonemeUse[]>({
    //   defaultFile: [],
    //   filename: "phonology",
    //   storage: "editor.phonology",
    // });

    const entry = ref({ uses: [] });
    const usecase = ref();
    const form = ref();
    const sample = ref();
    return { entry, usecase, form, sample };
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
.scroll {
  max-height: 192px;
  &.long {
    max-height: 512px;
  }
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 100%;
  }
}
</style>
