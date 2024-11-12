import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

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
  history: createWebHashHistory(),
  routes,
});

export default router;
