import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: 'model/:id',
    name: 'modelBase',
    component: () => import('@/layouts/model-layout.vue'),
meta: {
      breadcrumb: 'Models',
    },

    children: [
      {
        path: '',
        name: 'model',
        component: () => import('@/views/model/[id]/index.vue'),
        meta: {
          breadcrumb: 'K5',
        },
      },
      {
        path: 'pricing',
        name: 'model-pricing',
        component: () => import('@/views/model/[id]/pricing.vue'),
        meta: {
          breadcrumb: 'Цены',
        },
      },
    ],
  },
];

export default routes;
