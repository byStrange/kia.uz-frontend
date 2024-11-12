import { computed } from 'vue';
import { ref } from 'vue';

import { useTitle } from '@vueuse/core';
import {
  RouteLocationMatched,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';

const _breadcrumbsRaw = ref<RouteLocationMatched[] | RouteRecordRaw[]>([]);
const title = useTitle();

export const useBreadCrumb = (route: RouteLocationNormalized) => {
  _breadcrumbsRaw.value = route.matched;
  const breadcrumbs = computed(() => {
    const matchedRoutes = _breadcrumbsRaw.value;

    return matchedRoutes.map((routeItem) => ({
      label:
        (typeof routeItem.meta?.breadcrumb === 'function'
          ? routeItem.meta?.breadcrumb({ route, title })
          : routeItem.meta?.breadcrumb) || routeItem.name,
      name: routeItem.name,
      to: routeItem.path,
    }));
  });

  return {
    _breadcrumbsRaw,
    breadcrumbs,
  };
};
