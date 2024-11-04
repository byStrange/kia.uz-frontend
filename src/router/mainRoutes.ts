import index from '@/views/index.vue';
import model from '@/views/model.vue';
import models from '@/views/models.vue';

import { RouteRecordRaw } from 'vue-router';

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
    path: 'models',
    name: 'models',
    component: models,
    meta: {
      breadcrumb: 'Модели',
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
