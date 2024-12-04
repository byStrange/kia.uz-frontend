<script setup lang="tsx">
definePageMeta({
  layout: 'model-layout',
  lockHover: true,
})
</script>

<template>
  <UISafeAreaView :extra="52">
    <SectionPricingBanner />

    <div class="2xl:grid 2xl:grid-cols-12 2xl:border-t border-t-protection">
      <SectionPricingFilterSidebar class="hidden 2xl:block" />
      <SectionPricingDetailedProperties />
    </div>
  </UISafeAreaView>
</template>
