import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import("@/Home/index.vue");

const Navigation = () => import("@/Navigation.vue");
const EditorNavigation = () => import("@/EditorNavigation.vue");

const Dictionary = () => import("@/Dictionary/index.vue");
const DictionaryEditor = () => import("@/Dictionary/Editor.vue");

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/",
    component: Navigation,
    children: [
      {
        path: "dictionary",
        name: "dictionary",
        component: Dictionary,
      },
    ],
  },
  {
    path: "/editor/",
    component: EditorNavigation,
    children: [
      {
        path: "dictionary",
        name: "dictionaryEditor",
        component: DictionaryEditor,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    redirect: {
      name: "home",
    },
  },
] as RouteRecordRaw[];

export default createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === "production" ? "/avzag/" : "/"
  ),
  routes,
});
