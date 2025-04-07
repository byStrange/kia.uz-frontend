<script lang="ts" setup>
import { Dialog } from 'primevue'
import type { ModelFilters } from '~/components/organisms/InStockFilter.vue';
import useFilteredData from '~/composables/useFilter';
import type { Model, ModelEngine } from '~/server/api/models/[id]/index.get';

const { data: models } = await useFetch('/api/in-stock')
const { headerService } = useHeaderService()

const engines = computed(() => {
  return models.value?.models.map((item) => {
    return item.engines.flat()
  }).flat()
})

const filter = useFilteredData<ModelEngine, ModelFilters>()

if (engines.value) {
  filter.data.value = engines.value;
}

const showModelFilter = ref(false)

const formSteps = ref([
  { step: 'model', label: "Выбор модели", },
  { step: 'configuration', label: "Выбор комплектации" },
  { step: 'colorsAndEquipments', label: "Цвета и аксессуары" },
  { step: 'payment', label: "Кредитные условия" },
  { step: 'result', label: "Результаты" }
])

definePageMeta({
  lockHover: true
})
</script>
<template>
  <UISafeAreaView>
    <Dialog v-model:visible="showModelFilter" modal pt:root="w-full h-full !max-h-none !rounded-none md:!max-w-[480px]"
      pt:mask="md:!justify-end">
      <template #container="{ closeCallback }">
        <div class="w-full h-full relative">
          <OrganismInStockFilter :filter @close-callback="closeCallback" />
        </div>
      </template>
    </Dialog>

    <UIContainer class="pt-12 pb-6 md:pb-8 md:pt-15 2xl:space-y-10 2xl:pb-10 2xl:pt-6">
      <UIDesktopOnly>
        <MoleculeBreadcrumb theme="dark" />
      </UIDesktopOnly>
      <h1 class="text-2xl md:text-4xl 2xl:text-7xl">Авто в наличии</h1>
    </UIContainer>

    <MoleculeStepper :steps="formSteps" step-label-key="label" step-key="step">

      <template #header-after>
        <UIContainer
          class="py-3 border-y border-protection mt-6 md:mt-7.5 sticky bg-white top-0 transition-all duration-300 z-10 2xl:hidden"
          :class="{ '!top-[--header-height]': headerService.isHeaderFixed }">
          <button class="flex items-center gap-x-2.5" @click="showModelFilter = true">
            <UIFilterIcon />
            Фильтры
          </button>
        </UIContainer>
      </template>

      <template #left-sidebar="{ step }">
        <div v-if="step.step === 'model'" class="hidden 2xl:block">
          <OrganismInStockFilter :filter />
        </div>
      </template>

      <template #step-1>
        <UIContainer class="space-y-10 py-6 2xl:pt-0 2xl:pb-16 2xl:space-y-15">
          <h1 class="text-2xl 2xl:text-3xl">Выберите модель</h1>
          <OrganismModelsGroupList :models-group="models?.groupedModels || {}" group-title-class="text-lg 2xl:text-2xl"
            model-name-class="text-base" model-price-class="text-sm mt-1 flex gap-x-2 items-center"
            price-button-class="" />
        </UIContainer>
      </template>

      <template #step-2>
        <div>
          <p>step2</p>
        </div>
      </template>
    </MoleculeStepper>
  </UISafeAreaView>
</template>
