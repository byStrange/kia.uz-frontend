<template>
  <nav>
    <ul class="flex items-center">
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <div v-if="currentRoute.name !== crumb.name" class="flex items-center">
          <router-link :to="crumb.to" class="text-xs text-caption">
            {{ crumb.label }}
          </router-link>
          <TickToRight />
        </div>
        <div v-else class="text-xs text-primary">
          {{ crumb.label }}
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouteLocation, RouteLocationMatched, useRoute } from 'vue-router';
import { computed } from 'vue';
import TickToRight from '../icons/20x20/TickToRight.vue';

const route = useRoute();
const currentRoute = computed(() => route.matched[route.matched.length - 1]);

const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched;

  return matchedRoutes.map((routeItem) => ({
    label: routeItem.meta.breadcrumb || routeItem.name,
    name: routeItem.name,
    to: getRoutePath(route, routeItem),
  }));
});

const getRoutePath = (
  route: RouteLocation,
  routeItem: RouteLocationMatched
) => {
  const matchedSegments = route.matched.slice(
    0,
    route.matched.indexOf(routeItem) + 1
  );
  return matchedSegments.map((segment) => segment.path).join('/');
};
</script>

<style scoped>
/* Add your breadcrumb styling here */
</style>
