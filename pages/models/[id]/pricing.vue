<script setup lang="tsx">
definePageMeta({
  layout: 'model-layout',
  lockHover: true,
})
</script>

<template>
  <UISafeAreaView :extra="52">
    <OrganismModelPricingBanner />

    <div class="2xl:grid 2xl:grid-cols-12 2xl:border-t border-t-protection">
      <OrganismModelPricingFilterSidebar class="hidden 2xl:block" />
      <OrganismModelPricingDetailedProperties />
    </div>
  </UISafeAreaView>
</template>
