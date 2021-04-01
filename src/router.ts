import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import("@/Home/index.vue");

const Navigation = () => import("@/Navigation.vue");
const EditorNavigation = () => import("@/EditorNavigation.vue");

// const Phonology = () => import("@/Phonology/index.vue");
const Dictionary = () => import("@/Dictionary/index.vue");

// const PhonologyEditor = () => import("@/Phonology/Editor.vue");

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    component: Navigation,
    children: [
      {
        path: "dictionary",
        name: "Dictionary",
        component: Dictionary,
      },
    ],
  },
  {
    path: "/editor/",
    component: EditorNavigation,
    children: [
      // {
      //   path: "phrasebook/corpus",
      //   name: "PhrasebookCorpusEditor",
      //   component: PhrasebookCorpusEditor,
      // },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    redirect: {
      name: "Home",
    },
  },
] as RouteRecordRaw[];

export default createRouter({
  history: createWebHistory(),
  routes,
});
