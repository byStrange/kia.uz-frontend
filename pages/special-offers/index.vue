<script setup lang="ts">
const modelOptions = ref();
const selectedOption = ref()

const { data: pageData } = await useFetch('/api/special-offers')

const filteredData = (items: SpecialOffer[]) => {
  if (selectedOption.value) {
    return items.filter((offer) => offer.referenced_models.find(rf => rf.id == selectedOption.value))
  }

  return items;
}

useSeoMeta({
  title: () => pageData.value?.seo.title || '',
  ogTitle: () => pageData.value?.seo.title || '',
  description: () => pageData.value?.seo.description || '',
  ogDescription: () => pageData.value?.seo.description || '',
  keywords: () => pageData.value?.seo.keywords || '',
})

onMounted(() => {
  console.log(
    Object.values(pageData.value?.groupedOffers || {})
  )
  modelOptions.value = pageData.value?.models.map((model) => ({
    value: model.id,
    label: model.name
  }))
})

definePageMeta({
  lockHover: true,
})
</script>
<template>
  <UISafeAreaView>
    <div class="container pt-7.5 2xl:pt-6">
      <MoleculeBreadcrumb class="hidden 2xl:block" theme="dark" />
      <h1 class="text-2xl font-semibold text-primary md:text-5xl 2xl:mt-10">
        {{ $t('common.special_offers') }}
      </h1>

      <div class="mt-7.5">
        <MoleculeTabsContainer ref="tabsContainer" :tabs="Object.values(pageData?.groupedOffers || {})"
          header-container-class="w-fit mx-0 !px-0" header-key="categoryName"
          content-container-class="!px-0 mx-0 !max-w-none !mt-10">
          <template #tab-button-right>
            <div class="w-4h 2xl:absolute top-0 right-0 hidden 2xl:flex">
              <AtomDropdownInput v-model:available-options="modelOptions" v-model:selected-option="selectedOption"
                :placeholder="$t('common.choose_model')" class="w-full" />
            </div>
          </template>
          <template #tab="{ tab }">
            <div>
              <AtomDropdownInput v-model:available-options="modelOptions" v-model:selected-option="selectedOption"
                :placeholder="$t('common.choose_model')" class="max-w-4h 2xl:!hidden" />
              <div
                class="space-y-7.5 pt-10 pb-11 md:grid md:grid-cols-2 md:space-y-0 md:gap-7.5 md:place-content-center 2xl:grid-cols-4">
                <NuxtLinkLocale v-for="item in filteredData(tab.items)" :key="item.title"
                  :to="`/special-offers/${item.slug}`">
                  <div class="w-full max-w-[420px] mx-auto">
                    <div class="mx-auto h-full bg-background">
                      <img :src="item.desktop_image" class="h-[190px] w-full object-cover" loading="lazy" />

                      <div class="p-4">
                        <div class="text-left h-[86px]">
                          <h2 class="text-sm font-semibold">
                            {{ item.title }}
                          </h2>
                          <p class="mt-1 text-sm text-primary">
                            {{ item.subtitle }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </NuxtLinkLocale>
              </div>
            </div>
          </template>
        </MoleculeTabsContainer>
      </div>
    </div>
  </UISafeAreaView>
</template>


<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
