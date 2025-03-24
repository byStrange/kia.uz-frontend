<script setup lang="ts">
const { safe } = useSafeAccessMedia()
const { src } = useUploadcareSource()
const { data: pageData } = await useFetch('/api/service/user-manual')


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
  <UISafeAreaView>
    <UIContainer>
      <div class="pt-10 pb-6 md:pb-5 md:pt-15 2xl:pt-6 2xl:pb-0">
        <UIDesktopOnly>
          <MoleculeBreadcrumb theme="dark" />
        </UIDesktopOnly>
        <h1 class="text-primary text-2xl md:text-4xl 2xl:mt-7.5 2xl:text-5xl">
          {{ $t('common.user_manual') }}
        </h1>
      </div>
      <div
        class="pt-6 pb-15 space-y-12 md:grid md:grid-cols-2 md:gap-grid-12-gap md:space-y-0 2xl:grid-cols-4 2xl:pt-1h">
        <div v-for="model in pageData?.models" :key="model.name">
          <img :src="safe(model.main_image)" alt="" />
          <div class="mt-5">
            <h2 class="text-primary font-semibold text-base md:text-lg 2xl:text-2xl">
              {{ model.name }}
            </h2>
            <a class="flex gap-x-2 mt-2 cursor-pointer" :href="safe(model.user_manual)">
              <UIPDFIcon class="text-primary" />
              <p class="text-base text-primary font-semibold">
                {{ $t('user_manual.download_user_manual') }}
              </p>
            </a>
          </div>
        </div>
      </div>

      <div class="pb-12 md:grid md:grid-cols-2 rtl">
        <picture>
          <source :srcset="src('b233ed8a-dc9a-4e68-9fb2-24cbe43f99ba')"
            media="(min-width: 768px) and (max-width: 1440px)" />
          <img :src="src('062491d2-01fb-48b1-b730-43639a864d04')" alt=""
            class="object-cover md:w-full md:max-h-3h 2xl:max-h-none md:h-full 2xl:h-[388px]" />
        </picture>
        <div
          class="py-8 px-4 bg-caption md:px-6 md:flex md:flex-col md:justify-between md:items-start 2xl:px-12 2xl:py-14 ltr">
          <div class="text-white">
            <h2 class="text-lg font-semibold md:text-2xl 2xl:text-5xl">
              {{ $t('common.warning_indicators') }}
            </h2>
            <p class="mt-2 text-sm md:text-base+ 2xl:mt-4 2xl:text-lg">
              {{ $t('user_manual.service_functions_info') }}
            </p>
          </div>
          <AtomLink :to="`/owners/car-info/warning-indicators`" mode="full" color="secondary" :label="$t('common.more')"
            class="mt-6 !text-base+" />
        </div>
      </div>
    </UIContainer>
  </UISafeAreaView>
</template>
