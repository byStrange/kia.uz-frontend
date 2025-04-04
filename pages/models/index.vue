<script setup lang="ts">
import { UIInfoIcon, UITickToRight } from '#components'
import type { ModelWithLessData } from '~/types/server';
import type { GroupedItems } from '~/utils/serverUtils';

const { data: pageData } = useFetch('/api/models/')
const locale = useLocalePath()
const { safe } = useSafeAccessMedia()

const availableOptions = ref(pageData.value?.models.map((model) => ({ label: model.name, value: model.id })))
const selectedOption = ref('')

const filteredGroupedModels = computed(() => {
  if (!selectedOption.value || !pageData.value?.groupedModels) {
    return pageData.value?.groupedModels || {}
  }

  const result: GroupedItems<ModelWithLessData> = {}

  for (const [id, group] of Object.entries(pageData.value.groupedModels)) {
    const filteredItems = group.items.filter(model => model.id === selectedOption.value)

    if (filteredItems.length > 0) {
      result[id] = {
        ...group,
        items: filteredItems
      }
    }
  }

  return result
})

// Reset filter function
const resetFilter = () => {
  selectedOption.value = ''
}

useSeoMeta({
  title: () => pageData.value?.seo.title || '',
  ogTitle: () => pageData.value?.seo.title || '',
  description: () => pageData.value?.seo.description || '',
  ogDescription: () => pageData.value?.seo.description || '',
  keywords: () => pageData.value?.seo.keywords || '',
})

definePageMeta({
  lockHover: true,
})
</script>
<template>
  <UISafeAreaView class="bg-white">
    <div class="container">
      <MoleculeBreadcrumb class="hidden mt-6 2xl:block" theme="dark" />
      <div class="pt-10 pb-5 md:pt-15 2xl:pt-9">
        <h1 class="text-3xl font-semibold text-primary md:text-5xl">{{ $t('common.kia_all_models') }}</h1>
        <div class="flex items-center md:mt-7.5 max-w-4h gap-x-4">
          <div class="flex-grow">
            <AtomDropdownInput v-model:selected-option="selectedOption" v-model:available-options="availableOptions"
              placeholder="Выберите модель" class="mt-4 md:mt-0 md:max-w-sm" />

          </div>
          <AtomButton v-if="selectedOption" @click="resetFilter">{{ $t('common.reset_filter') }}</AtomButton>
        </div>
      </div>
      <div class="pt-5 pb-10 md:pb-15 2xl:py-20">
        <div v-if="Object.keys(filteredGroupedModels).length === 0" class="text-center py-10">
          <p class="text-xl text-primary">Модели не найдены</p>
          <AtomButton @click="resetFilter">
            Показать все модели
          </AtomButton>
        </div>
        <div v-else class="space-y-10 md:space-y-12 2xl:space-y-15">
          <div v-for="[id, group] in Object.entries(filteredGroupedModels)" :key="id">
            <h1 class="text-2xl font-semibold text-primary md:text-3xl">
              {{ group.categoryName }}
            </h1>
            <div class="flex-wrap mt-4 md:mt-8 md:flex md:gap-9 2xl:mt-10">
              <div v-for="model in group.items" :key="model.name" class="max-w-md md:min-w-[310px] md:max-w-[310px]">
                <NuxtLinkLocale :to="`/models/${model.slug}`">
                  <img :src="safe(model.main_image)" class="object-cover w-full" />
                </NuxtLinkLocale>
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
