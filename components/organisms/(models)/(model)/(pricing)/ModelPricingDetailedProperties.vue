<script setup lang="tsx">
import type { ModelPricingAndDetailsPage } from '~/server/api/models/[id]/features.get';

defineProps<{ pageData: ModelPricingAndDetailsPage | null }>()
</script>
<template>
  <div class="col-span-9">
    <OrganismConfigurationAndFeaturesList
      :standard-features="pageData?.standard_features || []" :grouped-features="pageData?.grouped_features || {}"
      :configurations="pageData?.filtered_configurations || []" />
  </div>
</template>
