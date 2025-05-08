<script setup lang="ts">

const { bounding } = useContainer()
const { src } = useUploadcareSource()
const { locale } = useI18n()
const { data: pageData } = useFetch('/api/indexPage', { query: { lang: locale.value } })

useSeoMeta({
  title: () => pageData.value?.seo.title || '',
  ogTitle: () => pageData.value?.seo.title || '',
  description: () => pageData.value?.seo.description || '',
  ogDescription: () => pageData.value?.seo.description || '',
  keywords: () => pageData.value?.seo.keywords || '',
})

const extraLinksCard = [
  {
    title: 'brand',
    href: '/branding',
    image: src('8701cf69-f335-45be-b0d7-2c939d629d0f', { preview: '1000x664' }),
  },
]
</script>

<template>
  <div>
    <OrganismHomeHeroSliders :slides="pageData?.sliders || []" />
    <OrganismHomeModels :models="pageData?.models.sort((a, b) => a?.home_order - b?.home_order) || []" />
    <OrganismHomeSpecialOffers :offers="pageData?.specialOffers || {}" />
    <OrganismHomeCourses :news="pageData?.news || {}" />

    <div class="container pb-12 md:pb-15">
      <div class="relative mx-auto h-full max-w-[420px] bg-caption md:max-w-none">
        <NuxtLinkLocale to="/special-offers/important-installment-plan">
          <picture>
            <source media="(min-width: 1024px)" srcset="~/assets/images/section5-desktop_image.jpg" />
            <source srcset="~/assets/images/section5-tablet_image.jpg" media="(min-width: 768px)" />
            <img
loading="lazy" src="~/assets/images/section5-default_image.jpg"
              class="img h-[187px] w-full max-w-[640px] bg-gray-200 md:absolute md:right-0 md:h-full md:w-1/2 object-cover" />
          </picture>
        </NuxtLinkLocale>
        <div class="px-4 py-8 md:w-1/2 md:px-6 2xl:px-12 2xl:py-14">
          <h2 class="text-lg font-semibold text-white md:text-2xl 2xl:text-5xl">
            {{ $t('index.kia_0_interest') }}
          </h2>
          <p class="mt-2 text-base text-white 2xl:mt-4 md:leading-[24px]">
            {{ $t('index.kia_flexible_rental') }}
          </p>
          <AtomLink
to="/special-offers/important-installment-plan" color="secondary" mode="full"
            :label="$t('common.more')" class="mt-6 md:mt-14 md:leading-[24px]" />
        </div>
      </div>
    </div>

    <div class="pb-12 md:pb-15">
      <h2 class="container text-lg font-semibold text-primary md:text-2xl 2xl:text-3xl">{{ $t('index.more_about_kia')
        }}
      </h2>
      <div
        class="no-scrollbar p-[--padding] mt-6 snap-x space-y-9 overflow-auto 2xl:container md:flex md:gap-x-10 md:space-y-0 2xl:snap-none"
        :style="{ '--padding': `0 ${bounding.x.value}px` }">
        <NuxtLinkLocale v-for="slide in extraLinksCard" :key="slide.title" :to="slide.href">
          <div
            class="relative mx-auto flex h-[208px] max-w-[310px] snap-center justify-center md:mx-0 md:w-[310px] md:max-w-none md:shrink-0 2xl:h-[265px] 2xl:w-[400px] 2xl:snap-none">
            <img :src="slide.image" class="h-full" loading="lazy" />
            <div class="absolute bottom-0 z-10 w-full p-4 md:px-7.5 md:py-5">
              <p class="text-base font-semibold text-white md:text-2xl">
                {{ $t(`common.${slide.title}`) }}
              </p>
            </div>
          </div>
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>
