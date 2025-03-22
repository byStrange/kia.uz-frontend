<script setup lang="ts">
import { UIInfoIcon, UITickToRight } from '#components'

const { data: pageData } = useFetch('/api/models/')
const locale = useLocalePath()
const { safe } = useSafeAccessMedia()

const availableOptions = ref([
  { label: 'Carens', value: 'car' },
  { label: 'Carnival', value: 'carnival' },
  { label: 'Ceed', value: 'ceed' },
  { label: 'Ceed GT', value: 'ceed-gt' },
  { label: 'Ceed SW', value: 'ceed-sw' },
  { label: 'Carnival', value: 'carnival' },
  { label: 'Seed', value: 'seed' },
  { label: 'Seed', value: 'seed' },
  { label: 'Seed', value: 'seed' },
  { label: 'Seed', value: 'seed' },
])

const selectedOption = ref('')

definePageMeta({
  lockHover: true,
})
</script>

<template>
  <UISafeAreaView class="bg-white">
    <div class="container">
      <MoleculeBreadcrumb class="hidden mt-6 2xl:block" theme="dark" />
      <div class="pt-10 pb-5 md:pt-15 2xl:pt-9">
        <h1 class="text-3xl font-semibold text-primary md:text-5xl">
          Все модели Kia
        </h1>
        <AtomDropdownInput v-model:selected-option="selectedOption" v-model:available-options="availableOptions"
          placeholder="Выберите модель" class="mt-4 md:mt-7.5 md:max-w-sm" />
      </div>

      <div class="pt-5 pb-10 md:pb-15 2xl:py-20">
        <div class="space-y-10 md:space-y-12 2xl:space-y-15">
          <div v-for="[id, group] in Object.entries(pageData?.groupedModels || {})" :key="id">
            <h1 class="text-2xl font-semibold text-primary md:text-3xl">
              {{ group.categoryName }}
            </h1>
            <div class="flex-wrap mt-4 md:mt-8 md:flex md:gap-9 2xl:mt-10">
              <div v-for="model in group.models" :key="model.name" class="max-w-md md:min-w-[310px] md:max-w-[310px]">
                <img :src="safe(model.main_image)" class="object-cover w-full" />
                <div class="mt-4">
                  <h2 class="text-lg font-semibold text-primary">
                    {{ model.name }}
                  </h2>
                  <p class="mt-1.5 flex gap-3 text-primary">
                    {{ $t('prefixes.from', { price: formatPrice(model.starting_price) }) }}
                    <UIInfoIcon class="text-disabled" />
                  </p>
                </div>
                <button class="flex items-center mt-1 link-hover link-hover-dark" :style="{ '--l-bottom': '-2px' }"
                  @click="$router.push(locale(`/models/${model.slug}`))">
                  <span class="text-base font-semibold text-primary">Цены</span>
                  <UITickToRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UISafeAreaView>
</template>
