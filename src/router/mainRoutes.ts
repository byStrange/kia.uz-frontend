import { RouteRecordRaw } from 'vue-router';

import modelRoutes from './modelRoutes';

export const mainRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    component: () => import('@/views/index.vue'),
    meta: {
      breadcrumb: 'Главная',
    },
  },
  {
    path: 'models',
    name: 'models',
    component: () => import('@/views/models.vue'),
    meta: {
      breadcrumb: 'Модели',
    },
  },

  ...modelRoutes,
];
