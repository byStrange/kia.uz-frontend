<script setup lang="ts">
import type { ModelWithLessData } from '~/types/server';
import type { GroupedItems } from '~/utils/serverUtils';

const { data: pageData } = useFetch('/api/models/')

const locale = useLocalePath()

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
              :placeholder="$t('common.choose_model')" class="mt-4 md:mt-0 md:max-w-sm" />

          </div>
          <AtomButton v-if="selectedOption" @click="resetFilter">{{ $t('common.reset_filter') }}</AtomButton>
        </div>
      </div>
      <div class="pt-5 pb-10 md:pb-15 2xl:py-20">
        <div v-if="Object.keys(filteredGroupedModels).length === 0" class="text-center py-10">
          <p class="text-xl text-primary">{{ $t('common.model_not_found') }}</p>
          <AtomButton @click="resetFilter">
            {{ $t('common.show_all_models') }}
          </AtomButton>
        </div>
        <OrganismModelsGroupList v-else :models-group="filteredGroupedModels"
          @choose="(slug) => $router.push(locale(`/models/${slug}`))" />
      </div>
    </div>
  </UISafeAreaView>
</template>
