<script setup lang="tsx">
import type { ModelLandingPage } from '~/server/api/models/[id]/index.get';

const modelData = useSharedPageData<ModelLandingPage>()
const route = useRoute()
const { data: pageData } = await useFetch(`/api/models/${route.params.id}/properties`)
const filteredConfigurations = ref(pageData.value?.configurationsWithEngines)
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
      <OrganismModelPropertiesSidebar :show-only-differing-configurations
        :configurations="pageData?.configurationsWithEngines || []" class="hidden 2xl:block" @update:filtered-data="(fConfigurations) => {
          filteredConfigurations = fConfigurations
        }" />
      <OrganismModelPropertiesDetails
        :configurations="filteredConfigurations?.length ? filteredConfigurations : pageData?.configurationsWithEngines" />
    </div>
  </UISafeAreaView>
</template>
