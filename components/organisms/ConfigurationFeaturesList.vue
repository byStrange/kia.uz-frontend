<script setup lang="ts">
import type { ModelPricingAndDetailsPage } from '~/server/api/models/[id]/features.get';

defineProps<{ features: ModelPricingAndDetailsPage['grouped_features'] }>() 
</script>
<template>
  <MoleculeAccordion
:default-open="true" :classes="{
    contentContainer: 'duration-700',
    contentWrapper: 'duration-700',
  }"
    :items="Object.entries(features || {}).map(([groupName, features]) => ({ label: groupName, content: features })) || []">

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
          <UITickToBottom class="text-primary transition-transform duration-700" :class="{ '!rotate-180': expanded }" />
        </button>
      </div>
    </template>


    <template #content="{ content }">
      <div class="space-y-6 md:space-y-7.5 pt-7.5 pb-15 px-0 md:pt-10 text-primary">
        <div class="group">
          <ul class="mt-2.5 list-disc list-inside 2xl:grid 2xl:grid-cols-2 2xl:gap-x-10">
            <li v-for="feature in content" :key="feature.name" class="text-sm text-primary md:text-base">
              {{ feature.name }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </MoleculeAccordion>
</template>
