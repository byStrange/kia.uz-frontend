<script setup lang="ts">
const { locale } = useI18n()
const { data: pageData } = useFetch('/api/models/test-drive', { query: { lang: locale.value } })
const { safe } = useSafeAccessMedia()


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
        <h1 class="text-3xl font-semibold text-primary md:text-5xl">{{ $t('common.sign_up_for_test_drive') }}</h1>
      </div>

      <div class="pt-5 pb-10 md:pb-15 2xl:py-20">
        <div class="space-y-10 md:space-y-12 2xl:space-y-15">
          <div v-for="[id, group] in Object.entries(pageData?.groupedModels || {})" :key="id">
            <h1 class="text-2xl font-semibold text-primary md:text-3xl">
              {{ group.categoryName }}
            </h1>
            <div class="flex-wrap mt-4 md:mt-8 md:flex md:gap-9 2xl:mt-10">
              <NuxtLinkLocale v-for="model in group.items" :key="model.name" :to="`/models/${model.slug}/test-drive`">
                <div class="max-w-md md:min-w-[310px] md:max-w-[310px]">
                  <img :src="safe(model.main_image)" class="object-cover w-full" />
                  <div class="mt-4">
                    <h2 class="text-lg font-semibold text-primary">
                      {{ model.name }}
                    </h2>
                  </div>
                </div>
              </NuxtLinkLocale>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UISafeAreaView>
</template>
