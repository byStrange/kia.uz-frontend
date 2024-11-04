<script setup>
import RouteNavigator from '@/components/home/RouteNavigator.vue';

import Footer from '@/components/layout/Footer.vue';
import Header from '@/components/layout/Header.vue';
</script>
<template>
  <Header />
  <RouteNavigator />
  <router-view />
  <Footer />
</template>
