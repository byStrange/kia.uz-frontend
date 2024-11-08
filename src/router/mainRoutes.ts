import { RouteRecordRaw } from 'vue-router';

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
  {
    path: 'model/:id',
    name: 'model',
    component: () => import('@/views/model.vue'),
    meta: {
      breadcrumb: 'Модель',
    },
  },
];
