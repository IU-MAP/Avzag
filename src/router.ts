import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import("@/Home/index.vue");

const Navigation = () => import("@/Navigation.vue");
const EditorNavigation = () => import("@/EditorNavigation.vue");

const Phonology = () => import("@/Phonology/index.vue");
const Converter = () => import("@/Converter/index.vue");
const Phrasebook = () => import("@/Phrasebook/index.vue");
const Dictionary = () => import("@/Dictionary/index.vue");

const PhonologyEditor = () => import("@/Phonology/Editor.vue");
const ConverterEditor = () => import("@/Converter/Editor.vue");
const PhrasebookEditor = () => import("@/Phrasebook/Editor.vue");
const PhrasebookCorpusEditor = () => import("@/Phrasebook/CorpusEditor.vue");

export const userRoutes = [
  {
    path: "phonology",
    name: "phonology",
    icon: "audiotrack",
    component: Phonology,
  },
  {
    path: "converter",
    name: "converter",
    icon: "sync_alt",
    component: Converter,
  },
  {
    path: "phrasebook",
    name: "phrasebook",
    icon: "chat",
    component: Phrasebook,
  },
  {
    path: "dictionary",
    name: "dictionary",
    icon: "book",
    component: Dictionary,
  },
];
export const editorRoutes = [
  {
    path: "phonology",
    title: "Phonology",
    name: "phonologyEditor",
    component: PhonologyEditor,
  },
  {
    path: "converter",
    title: "Converter",
    name: "converterEditor",
    component: ConverterEditor,
  },
  {
    path: "phrasebook",
    title: "Phrasebook",
    name: "phrasebookEditor",
    component: PhrasebookEditor,
  },
  {
    path: "phrasebookСorpus",
    title: "Phrasebook Corpus",
    name: "phrasebookCorpusEditor",
    component: PhrasebookCorpusEditor,
  },
];

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/",
    component: Navigation,
    children: userRoutes,
  },
  {
    path: "/editor/",
    component: EditorNavigation,
    children: editorRoutes,
  },
  {
    path: "/:pathMatch(.*)",
    redirect: {
      name: "home",
    },
  },
] as RouteRecordRaw[];

export default createRouter({
  history: createWebHistory(),
  routes,
});
