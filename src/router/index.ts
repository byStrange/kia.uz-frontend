import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import mainLayout from '../layouts/main.vue';
import { mainRoutes } from './mainRoutes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MainLayout',
    component: mainLayout,
    children: [...mainRoutes],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
