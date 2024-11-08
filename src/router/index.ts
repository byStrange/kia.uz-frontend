import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import { mainRoutes } from './mainRoutes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MainLayout',
    component: () => import('../layouts/main.vue'),
    children: [...mainRoutes],
    meta: {
      breadcrumb: 'Главная',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
