<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch'
import type useFilteredData from '~/composables/useFilter'
import type { Model, ModelEngine } from '~/server/api/models/[id]/index.get'

export interface ModelFilters {
  isNew: boolean | undefined
  driveType: ('fwd' | 'awd' | 'rwd')[],
  engineType: ('bensin' | 'electric' | 'disel')[]
  seats: (7 | 8)[]
  bodyType: ('sedan' | 'crossover')[]
}

const modelFilters = reactive<ModelFilters>({
  name: 'good',
  isNew: undefined,
  driveType: [],
  engineType: [],
  seats: [],
  bodyType: []
})

const props = defineProps<{ filter?: ReturnType<typeof useFilteredData<ModelEngine, ModelFilters>> }>()

const resetFilters = () => {
  /// 
  emit('clearFilter')
}

const updateFilters = () => {
  props.filter?.updateFilters(modelFilters)
  console.log(modelFilters)
  console.log(props.filter?.data.value)
}

const emit = defineEmits<{
  closeCallback: [],
  clearFilter: [],
  filterChange: [ModelFilters]
  applyFilters: [ModelFilters]
}>()

watch(modelFilters, () => {
  updateFilters()
  emit('filterChange', modelFilters)
})
</script>

<template>
  <div>
    <UIContainer class="py-6 flex justify-between md:px-6 2xl:px-0 2xl:pt-0">
      <span class="text-base text-primary font-semibold">Фильтры</span>
      <button class="2xl:hidden" @click="$emit('closeCallback')">
        <UICloseIcon class="size-5" />
      </button>
    </UIContainer>
    <UIContainer class="space-y-6 text-primary md:px-6 2xl:px-0">
      <div class="flex space-x-2 items-center">
        <ToggleSwitch v-model="modelFilters.isNew" input-id="modelIsNew" />
        <label class="text-sm text-primary cursor-pointer" for="modelIsNew">Новинка</label>
      </div>
      <div class="space-y-4">
        <h3 class="text-sm font-semibold">Тип привода</h3>
        <ul class="space-y-3">
          <li class="flex items-center gap-x-2">
            <PrimeCheckbox v-model="modelFilters.driveType" value="awd" input-id="drive-awd" />
            <label for="drive-awd">Полный</label>
          </li>
          <li class="flex items-center gap-x-2">
            <PrimeCheckbox v-model="modelFilters.driveType" value="fwd" input-id="drive-fwd" />
            <label for="drive-fwd">Передний</label>
          </li>

          <li class="flex items-center gap-x-2">
            <PrimeCheckbox v-model="modelFilters.driveType" value="rwd" input-id="drive-rwd" />
            <label for="drive-rwd">Задний</label>
          </li>
        </ul>
      </div>
      <div class="space-y-4">
        <h3 class="text-sm font-semibold">Тип двигателя</h3>
        <ul class="space-y-3">
          <li class="flex items-center gap-x-2">
            <PrimeCheckbox v-model="modelFilters.engineType" value="bensin" input-id="engine-bensin" />
            <label for="engine-bensin">Бензин</label>
          </li>
          <li class="flex items-center gap-x-2">
            <PrimeCheckbox v-model="modelFilters.engineType" value="electric" input-id="engine-electric" />
            <label for="engine-electric">Электромотор</label>
          </li>
          <li class="flex items-center gap-x-2">
            <PrimeCheckbox v-model="modelFilters.engineType" value="disel" input-id="engine-disel" />
            <label for="engine-disel">Дизель</label>
          </li>
        </ul>
      </div>
      <div class="space-y-4">
        <h3 class="text-sm font-semibold">Количество мест</h3>
        <ul class="space-y-3">
          <li class="flex items-center gap-x-2">
            <PrimeCheckbox v-model="modelFilters.seats" value="7" input-id="seats-7" />
            <label for="seats-7">7 мест</label>
          </li>
          <li class="flex items-center gap-x-2">
            <PrimeCheckbox v-model="modelFilters.seats" value="8" input-id="seats-8" />
            <label for="seats-8">8 мест</label>
          </li>
        </ul>
      </div>
      <div class="space-y-4">
        <h3 class="text-sm font-semibold">Тип авто</h3>
        <ul class="space-y-3">
          <li class="flex items-center gap-x-2">
            <PrimeCheckbox v-model="modelFilters.bodyType" value="sedan" input-id="bodyType-sedan" />
            <label for="bodyType-sedan">Седан</label>
          </li>
          <li class="flex items-center gap-x-2">
            <PrimeCheckbox v-model="modelFilters.bodyType" value="crossover" input-id="bodyType-crossover" />
            <label for="bodyType-crossover">Кроссовер</label>
          </li>
        </ul>
      </div>
    </UIContainer>

    <div
      class="flex border-t border-t-protection absolute bottom-0 w-full 2xl:relative 2xl:border-t-0 2xl:px-6 2xl:mt-10">
      <button class="text-primary w-1/2 flex items-center gap-x-2 justify-center 2xl:w-auto" @click="resetFilters">
        <UIRefreshIcon />
        <span class="text-sm">Сбросить</span>
      </button>
      <AtomButton class="w-1/2 2xl:hidden" label="Далее" color="primary" @click="$emit('applyFilters', modelFilters)" />
    </div>
  </div>
</template>
