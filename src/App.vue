<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue';

import I18nProvider from './components/I18nProvider.vue';
</script>
<template>
  <Analytics />
  <I18nProvider>
    <router-view />
  </I18nProvider>
</template>
