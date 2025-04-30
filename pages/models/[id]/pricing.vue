<script setup lang="tsx">
import type { ModelLandingPage } from '~/server/api/models/[id]/index.get';
import type { ModelPricingAndDetailsPage } from '~/server/api/models/[id]/features.get';


const route = useRoute()
const modelData = useSharedPageData<ModelLandingPage>(route.params.id.toString())
const { locale } = useI18n()
const { data: pageData } = await useFetch(`/api/models/${route.params.id}/features`, { query: { lang: locale.value }})
const filteredConfigurations = ref(pageData.value?.filtered_configurations)
const showOnlyDifferingConfigurations = ref(false);

definePageMeta({
  layout: 'model-layout',
  lockHover: true,
})
</script>

<template>
  <UISafeAreaView :extra="52">
    <OrganismModelPricingBanner v-model="modelData" v-model:diff-conf="showOnlyDifferingConfigurations" />
    <div class="2xl:grid 2xl:grid-cols-12 2xl:border-t border-t-protection">
      <OrganismModelPricingFilterSidebar
:show-only-differing-configurations="showOnlyDifferingConfigurations"
        :page-data="pageData" class="hidden 2xl:block" @update:filtered-data="(fConfigurations) => {
          filteredConfigurations = fConfigurations
        }" />
      <OrganismModelPricingDetailedProperties
        :page-data="{ ...pageData, filtered_configurations: filteredConfigurations } as ModelPricingAndDetailsPage" />
    </div>
  </UISafeAreaView>
</template>
