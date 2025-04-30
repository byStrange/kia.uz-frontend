<script setup lang="ts">
import type { ModelLandingPage } from '~/server/api/models/[id]/index.get';
import type { ModelPricingAndDetailsPage } from '~/server/api/models/[id]/features.get';

const { bounding } = useContainer()
const route = useRoute()
const modelData = useSharedPageData<ModelLandingPage>(route.params.id.toString())

const props = defineProps<{
  pageData: ModelPricingAndDetailsPage | null,
  showOnlyDifferingConfigurations: boolean
}>()

const emit = defineEmits(['update:filteredData'])

const selectedEngines = ref<string[]>([])
const selectedConfigurations = ref<uuid[]>([])
const selectedFeatures = ref<uuid[]>([])

// Combined watcher that handles all filters together
watch([selectedEngines, selectedConfigurations, selectedFeatures], () => {
  if (!props.pageData) return

  let filteredConfigurations = [...props.pageData.filtered_configurations]

  // Apply engine filter if any engines are selected
  if (selectedEngines.value.length > 0) {
    filteredConfigurations = filteredConfigurations.filter(config =>
      selectedEngines.value.includes(config.engine || '')
    )
  }

  // Apply configuration filter if any configurations are selected
  if (selectedConfigurations.value.length > 0) {
    filteredConfigurations = filteredConfigurations.filter(config =>
      selectedConfigurations.value.includes(config.id || '')
    )
  }

  if (selectedFeatures.value.length > 0) {
    filteredConfigurations = filteredConfigurations.filter((config) => {
      // Get all feature IDs from this configuration
      const configFeatureIds = config.feature_groups
        .flatMap(group => group.features) // Flatten all features from all groups
        .map(feature => feature.id); // Extract just the IDs

      // Check if ANY of our selected features exist in this config's features
      return selectedFeatures.value.every(selectedId =>
        configFeatureIds.includes(selectedId)
      );
    });
  }

  if (props.showOnlyDifferingConfigurations && filteredConfigurations.length > 1) {
    // First, collect all feature IDs and their occurrence counts
    const featureOccurrences = new Map();

    filteredConfigurations.forEach(config => {
      config.feature_groups.forEach(group => {
        group.features.forEach(feature => {
          const count = featureOccurrences.get(feature.id) || 0;
          featureOccurrences.set(feature.id, count + 1);
        });
      });
    });

    // Find features that don't appear in all configurations
    const differingFeatureIds = Array.from(featureOccurrences.entries())
      .filter(([_, count]) => count < filteredConfigurations.length)
      .map(([id, _]) => id);

    // Keep only configurations that have at least one differing feature
    filteredConfigurations = filteredConfigurations.filter(config => {
      const configFeatureIds = config.feature_groups
        .flatMap(group => group.features)
        .map(feature => feature.id);

      return configFeatureIds.some(id => differingFeatureIds.includes(id));
    });
  }

  // Emit the filtered data to the parent
  emit('update:filteredData', filteredConfigurations.sort((a, b) => a.price - b.price))
})

</script>
<template>
  <div class="col-span-3 bg-background border-r border-r-protection pl-[--padding-x] pb-15"
    :style="{ '--padding-x': bounding.x.value + 'px' }">
    <div class="py-5">
      <h3 class="text-base font-semibold">{{ $t("spare_parts.engine") }}</h3>
      <ul class="space-y-2.5 mt-4">
        <li v-for="engine in modelData?.model.engines" :key="engine.id" class="flex gap-2">
          <PrimeCheckbox v-model="selectedEngines" :input-id="'engineInput' + engine.id"
            :value="engine.name + ' / ' + engine.desc" />
          <label :for="'engineInput' + engine.id" class="text-base">{{ engine.name + " / " + engine.desc }}</label>
        </li>
      </ul>
    </div>
    <div class="py-5">
      <h3 class="text-base font-semibold">{{ $t('common.configuration') }}</h3>
      <ul class="space-y-2.5 mt-4">
        <li v-for="configuration in modelData?.configurations" :key="configuration.id" class="flex gap-2">
          <PrimeCheckbox v-model="selectedConfigurations" :input-id="'configurationInput' + configuration.id"
            :value="configuration.id" />
          <label :for="'configurationInput' + configuration.id" class="text-base">{{ configuration.name }}</label>
        </li>
      </ul>
    </div>
    <div class="pt-15 pr-5">
      <h2 class="text-lg font-semibold">{{ $t('common.options') }}</h2>
      <div class="mt-5 border-t border-t-protection">
        <PrimeAccordion unstyled class="divide-y divide-protection" value="0">
          <template #collapseicon>
            <UITickToTop class="min-w-5" />
          </template>
          <template #expandicon>
            <UITickToBottom class="min-w-5" />
          </template>

          <PrimeAccordionPanel
            v-for="group in Object.entries(pageData?.grouped_features || {}).map(([groupName, features]) => ({ label: groupName, content: features })) || []"
            :key="group.label" :value="group.label" unstyled>
            <PrimeAccordionHeader unstyled
              class="py-5 w-full justify-between items-center flex text-left text-base font-semibold">{{ group.label }}
            </PrimeAccordionHeader>
            <PrimeAccordionContent unstyled>
              <ul class="space-y-2.5 mt-4">
                <li v-for="feature in group.content" :key="feature.id" class="flex gap-2">
                  <PrimeCheckbox v-model="selectedFeatures" :input-id="'featureInput' + feature.id"
                    :value="feature.id" />
                  <label :for="'featureInput' + feature.id" class="text-base">{{ feature.name
                    }}</label>
                </li>
              </ul>
            </PrimeAccordionContent>
          </PrimeAccordionPanel>
        </PrimeAccordion>
      </div>
    </div>
  </div>
</template>
