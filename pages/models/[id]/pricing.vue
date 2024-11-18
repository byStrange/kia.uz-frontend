<script setup lang="tsx">
const { headerService } = useHeaderService()
definePageMeta({
  layout: 'model-layout',
})

onMounted(() => {
  headerService.value.lockHover = true
  headerService.value.isHeaderFixed = true
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
