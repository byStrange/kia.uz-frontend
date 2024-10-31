import { RouteRecordRaw } from 'vue-router';
import index from '@/views/index.vue';
import model from '@/views/model.vue';

export const mainRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    component: index,
    meta: {
      breadcrumb: 'Главная',
    },
  },
  {
    path: 'model/:id',
    name: 'model',
    component: model,
    meta: {
      breadcrumb: 'Модель',
    },
  },
];
