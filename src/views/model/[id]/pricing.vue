<script setup lang="tsx">
import { onMounted, onUnmounted } from 'vue';

import PricingDetailedProperties from '@/views/model/(components)/pricing/PricingDetailedProperties.vue';
import PricingFilterSidebar from '@/views/model/(components)/pricing/PricingFilterSidebar.vue';
import PricingHero from '@/views/model/(components)/pricing/PricingHero.vue';

import { useHeaderService } from '@/services/headerService';

import SafeAreaView from '@/components/layout/SafeAreaView.vue';

const { headerService } = useHeaderService();

onMounted(() => {
  headerService.value.lockHover = true;
  headerService.value.isHeaderFixed = true;
});

onUnmounted(() => {
  headerService.value.lockHover = false;
});
</script>

<template>
  <SafeAreaView :extra="52">
    <PricingHero />

    <div class="2xl:grid 2xl:grid-cols-12 2xl:border-t border-t-protection">
      <PricingFilterSidebar class="hidden 2xl:block" />
      <PricingDetailedProperties />
    </div>
  </SafeAreaView>
</template>
