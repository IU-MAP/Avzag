import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import("@/Home/index.vue");

const Navigation = () => import("@/Navigation.vue");
const EditorNavigation = () => import("@/EditorNavigation.vue");

const Dictionary = () => import("@/Dictionary/index.vue");
const DictionaryEditor = () => import("@/Dictionary/Editor.vue");

export const userRoutes = [
  {
    path: "dictionary",
    name: "dictionary",
    icon: "book",
    component: Dictionary,
  },
];
export const editorRoutes = [
  {
    path: "dictionary",
    name: "dictionaryEditor",
    title: "Dictionary",
    component: DictionaryEditor,
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
