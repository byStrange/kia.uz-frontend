import { computed } from 'vue';
import { ref } from 'vue';

import {
  RouteLocationMatched,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';

const _breadcrumbsRaw = ref<RouteLocationMatched[] | RouteRecordRaw[]>([]);

export const useBreadCrumb = (route: RouteLocationNormalized) => {
  _breadcrumbsRaw.value = route.matched;
  const breadcrumbs = computed(() => {
    const matchedRoutes = _breadcrumbsRaw.value;

    return matchedRoutes.map((routeItem) => ({
      label: routeItem.meta?.breadcrumb || routeItem.name,
      name: routeItem.name,
      to: routeItem.path,
    }));
  });

  return {
    _breadcrumbsRaw,
    breadcrumbs,
  };
};
