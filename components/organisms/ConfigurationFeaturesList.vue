<script setup lang="ts">
import type { ModelPricingAndDetailsPage } from '~/server/api/models/[id]/features.get';
import type { Configuration } from '~/server/api/models/[id]/index.get';

defineProps<{ featureGroups: Configuration['feature_groups'], standardFeatures: ModelPricingAndDetailsPage['standard_features'] }>()
</script>

<template>
  <div>
    <MoleculeAccordion
:default-open="true" :classes="{
      contentContainer: 'duration-700',
      contentWrapper: 'duration-700',
    }" :items="[{ label: $t('common.standard_featues'), content: '' }]">

      <template #expandicon>
        <UITickToBottom class="min-w-5" />
      </template>

      <template #header="{ toggle, expanded }">
        <div
          class="py-3 cursor-pointer flex justify-between w-full items-center text-base font-semibold text-primary text-left md:py-4 md:text-lg 2xl:text-2xl border-b-2 border-protection"
          @click="toggle">
          <span>{{ $t('common.standard_features') }}</span>
          <button @click="toggle">
            <UITickToBottom class="text-primary transition-transform" :class="{ '!rotate-180': expanded }" />
          </button>
        </div>
      </template>

      <template #content>
        <div class="space-y-6 md:space-y-7.5 pt-7.5 pb-15 px-0 md:pt-10 text-primary">
          <div v-for="group in standardFeatures" :key="group.name" class="group">
            <h2 class="text-sm font-semibold text-primary md:text-base 2xl:text-lg">
              {{ group.name }}
            </h2>
            <ul class="mt-2.5 list-disc list-inside 2xl:grid 2xl:grid-cols-2 2xl:gap-x-10">
              <li v-for="feature in group.values" :key="feature" class="text-sm text-primary md:text-base">
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </template>
    </MoleculeAccordion>

    <MoleculeAccordion
:default-open="true" :classes="{
      contentContainer: 'duration-700',
      contentWrapper: 'duration-700',
    }" :items="[{ label: $t('models.configuration_options'), content: null }]">

      <template #expandicon>
        <UITickToBottom class="min-w-5" />
      </template>


      <template #header="{ item, toggle, expanded }">
        <div
          class="py-3 flex justify-between w-full items-center text-base font-semibold text-primary text-left md:py-4 md:text-lg 2xl:text-2xl border-b-2 border-protection cursor-pointer"
          @click="toggle">
          <span>
            {{ item.label }}
          </span>
          <button @click="toggle">
            <UITickToBottom
class="text-primary transition-transform duration-700"
              :class="{ '!rotate-180': expanded }" />
          </button>
        </div>
      </template>


      <template #content>
        <div class="space-y-6 md:space-y-7.5 pt-7.5 pb-15 px-0 md:pt-10 text-primary">
          <div v-for="group in featureGroups" :key="group.name" class="group">
            <h2 class="text-sm font-semibold text-primary md:text-base 2xl:text-lg">
              {{ group.name }}
            </h2>
            <ul class="mt-2.5 list-disc list-inside 2xl:grid 2xl:grid-cols-2 2xl:gap-x-10">
              <li v-for="feature in group.features" :key="feature.id" class="text-sm text-primary md:text-base">
                {{ feature.name }}
              </li>
            </ul>
          </div>
        </div>
      </template>
    </MoleculeAccordion>
  </div>
</template>
