<template>
  <nav>
    <ul class="flex items-center">
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <slot name="item">
          <div
            v-if="currentRoute.name !== crumb.name"
            class="flex items-center"
          >
            <router-link
              :to="crumb.to ? crumb.to : '/'"
              :class="[
                styles({ theme }),
                { '!text-caption': theme === 'dark' },
              ]"
            >
              {{ crumb.label }}
            </router-link>
            <BreadCrumbsTickToRight
              :class="theme === 'light' ? 'text-white' : 'text-primary'"
            />
          </div>
          <div v-else :class="styles({ theme })" class="font-semibold">
            {{ crumb.label }}
          </div>
        </slot>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { VariantProps, tv } from 'tailwind-variants';
import { useRoute } from 'vue-router';

import { useBreadCrumb } from '@/composables/useBreadCrumb';

import BreadCrumbsTickToRight from '../icons/20x20/BreadCrumbsTickToRight.vue';

const styles = tv({
  base: 'text-xs',
  variants: {
    theme: {
      light: 'text-white',
      dark: 'text-primary',
    },
  },
  defaultVariants: {
    theme: 'dark',
  },
});
type StyleProps = VariantProps<typeof styles>;

defineProps<{ theme: StyleProps['theme'] }>();

const route = useRoute();
const { breadcrumbs } = useBreadCrumb(route);

const currentRoute = computed(() => route.matched[route.matched.length - 1]);
</script>

<style scoped>
/* Add your breadcrumb styling here */
</style>
