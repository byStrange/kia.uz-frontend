import { RouteRecordRaw } from "vue-router";
import index from "@/views/index.vue";

export const mainRoutes: RouteRecordRaw[] = [
  {
    path: "",
    name: "home",
    component: index,
  },
];
