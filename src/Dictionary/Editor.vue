<template>
  <div v-if="file" class="section small grid">
    <div class="col">
      <btn icon="add" text="New word" @click="newEntry" />
      <hr />
      <div class="row seeker">
        <btn
          class="flex"
          icon="lightbulb"
          text="Meanings"
          :is-on="!lect"
          @click="lect = ''"
        />
        <btn
          class="flex"
          icon="tune"
          text="Forms"
          :is-on="!!lect"
          @click="lect = 'l'"
        />
      </div>
      <div class="row seeker">
        <Seeker :seek="progress['l']" />
        <input
          v-model="query"
          type="text"
          placeholder="Meanings, tags, forms..."
        />
      </div>
      <div class="scroll long col">
        <div
          v-for="(es, m) in results"
          :key="m"
          scholar
          :meaning="m"
          :entries="es"
          class="col"
        >
          <i class="text-faded" v-text="m" />
          <btn
            v-for="(e, i) in es['l']"
            :key="i"
            :text="e.forms[0].plain"
            :is-on="entry === e"
            @click="entry = e"
          />
        </div>
      </div>
    </div>
    <template v-if="entry">
      <div class="col-2">
        <EditorCard icon="tag" header="Tags">
          <TagsInput v-model="entry.tags" placeholder="Grammatical tags" />
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
          <EditorCard icon="lightbulb" header="Concept">
            <div class="row">
              <input
                v-model="usecase.meaning"
                placeholder="Meaning"
                style="flex: 0.5"
                type="text"
              />
              <TagsInput
                v-model="usecase.tags"
                placeholder="Semantic tags"
                class="flex"
              />
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
    </template>
  </div>
</template>

<script lang="ts">
import ArrayControl from "@/components/ArrayControl.vue";
import EditorCard from "@/components/EditorCard.vue";
import NotesEditor from "@/components/Notes/Editor.vue";
import TagsInput from "@/components/TagsInput.vue";
import Seeker from "@/components/Seeker.vue";

import { ref, defineComponent, computed, watch } from "vue";
import { configure, file, lect as editorLect } from "@/editor";
import { Entry } from "./types";
import Searcher from "./search";

export default defineComponent({
  components: { EditorCard, ArrayControl, NotesEditor, TagsInput, Seeker },
  setup() {
    configure({ default: [], filename: "dictionary" });

    const dictionary = computed(() => ({
      l: file.value as Entry[],
    }));
    const searcher = new Searcher(dictionary);

    const lect = ref("l");
    const query = ref("");
    watch([query, lect], () => searcher.search(lect.value, query.value));
    watch(editorLect, () => {
      entry.value = undefined;
      query.value = "";
    });

    const entry = ref();
    const usecase = ref();
    const form = ref();
    const sample = ref();

    function newEntry() {
      const e = {
        forms: [{ plain: "a form" }],
        uses: [{ meaning: "word" }],
      };
      (file.value as Entry[]).push(e);
      entry.value = e;
    }

    return {
      file,
      entry,
      usecase,
      form,
      sample,
      results: searcher.results,
      progress: searcher.progress,
      lect,
      query,
      newEntry,
    };
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
