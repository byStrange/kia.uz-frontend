<script setup lang="ts">

const { src } = useUploadcareSource()
const { bounding } = useContainer()
const { locale } = useI18n()

const { data: pageData } = useAsyncData('seo', () => {
  return useFetchApi<SEO>('/pages/~history~kia-history', locale.value)
})

useSeoMeta({
  title: () => pageData.value?.seo.title || '',
  ogTitle: () => pageData.value?.seo.title || '',
  description: () => pageData.value?.seo.description || '',
  ogDescription: () => pageData.value?.seo.description || '',
  keywords: () => pageData.value?.seo.keywords || '',
})


const extraLinksCard = [
  {
    title: 'common.brand',
    href: '/branding',
    image: src('8701cf69-f335-45be-b0d7-2c939d629d0f', { preview: '1000x664' }),
  },
]

definePageMeta({
  lockHover: true
})
</script>
<template>
  <UISafeAreaView>
    <div data-label="hero" class="relative">

      <UIBackgroundLayerContainer>
        <UIBackgroundLayer class="md:bg-primary/40" />
      </UIBackgroundLayerContainer>

      <picture>
        <source :srcset="src('1f7d6285-aea7-4205-a2a9-01c339c4494e')" media="(min-width: 768px)" />
        <img :src="src('2e5cd080-9205-4f4b-b2e7-c69bfb15d624')" alt="kia sponsoring"
          class="w-full md:h-[420px] object-cover 2xl:h-[calc(100vh-var(--header-height))]">
      </picture>

      <div class="container absolute top-0 z-10 py-5">
        <MoleculeBreadcrumb theme="light" />
      </div>

      <div
        class="relative z-20 py-7.5 container space-y-4 text-primary bg-background md:absolute md:bottom-0 md:bg-transparent md:text-white md:pb-10 2xl:top-15 2xl:pt-2.5">
        <h1 class="text-2xl md:text-4xl 2xl:text-9xl">{{ $t('common.kia_sponsorships') }}</h1>
        <p class="text-base md:text-base+ 2xl:text-lg">{{ $t('sponsorships.kia_activity') }}</p>
      </div>

    </div>

    <div class="pt-12">

      <UISplitLayout title="Australian Open" :class-names="{
        'leftContainerClass': '2xl:!col-start-1',
        'rightContainerClass': '!col-start-6 !col-span-7',
        'containerClass': '!py-0 md:!pb-7.5 2xl:!pb-0'
      }">
        <template #left="{ sectionTitle }">
          <div class="2xl:pt-5 2xl:pb-16">
            <h1 :class="[
              'text-base font-semibold md:text-2xl 2xl:text-lg',
            ]">
              {{ sectionTitle }}
            </h1>
            <p :class="{
            }" class="text-sm md:text-base+ text-primary mt-3 md:mt-5 2xl:mt-10 split-left__description">
              {{ $t('sponsorships.kia_australian_open_sponsorship_since_2002') }}
              <br /> <br />

              {{ $t('sponsorships.kia_annually_provides_100_cars_for_australian_open') }}
              <br /> <br />

              {{ $t('sponsorships.kia_arena_built_for_21st_anniversary_with_5000_seats') }}
            </p>
          </div>
        </template>
        <template #right>
          <picture>
            <img :src="src('546abb9a-ea37-45b2-a8e5-388b26337b76')" />
          </picture>
        </template>
      </UISplitLayout>

      <UISplitLayout title="FIFA" :class-names="{
        'leftContainerClass': '2xl:!col-start-1',
        'rightContainerClass': '!col-start-6 !col-span-7',
        'containerClass': '!py-0 md:!py-7.5 2xl:!py-0'
      }">
        <template #left="{ sectionTitle }">
          <div class="2xl:pt-5 2xl:pb-16">
            <h1 :class="[
              'text-base font-semibold md:text-2xl 2xl:text-lg',
            ]">
              {{ sectionTitle }}
            </h1>
            <p :class="{
            }" class="text-sm md:text-base+ text-primary mt-3 md:mt-5 2xl:mt-10 split-left__description">
              {{ $t('sponsorships.kia_fifa_partnership_since_2006_with_next_world_cup_in_2026') }}

              <br /> <br />

              {{ $t('sponsorships.kia_provided_400_vehicles_for_2018_world_cup_in_russia') }}
            </p>
          </div>
        </template>
        <template #right>
          <picture>
            <img :src="src('ce002b39-e0fe-48e7-a4fa-cf9622787013')" />
          </picture>
        </template>
      </UISplitLayout>

      <UISplitLayout :title="$t('sponsorships.league_of_legends_european_championship')" :class-names="{
        'leftContainerClass': '2xl:!col-start-1',
        'rightContainerClass': '!col-start-6 !col-span-7',
        'containerClass': '!py-0 md:!pt-7.5 2xl:!pt-0'
      }">
        <template #left="{ sectionTitle }">
          <div class="2xl:pt-5 2xl:pb-16">
            <h1 :class="[
              'text-base font-semibold md:text-2xl 2xl:text-lg',
            ]">
              {{ sectionTitle }}
            </h1>
            <p :class="{
            }" class="text-sm md:text-base+ text-primary mt-3 md:mt-5 2xl:mt-10 split-left__description">
              {{ $t('sponsorships.kia_partnership_with_lec_for_marketing_and_youth_engagement') }}</p>
          </div>
        </template>
        <template #right>
          <picture>
            <img :src="src('b68ff466-f88f-4b61-a970-f1f6229ba8b8')" />
          </picture>
        </template>
      </UISplitLayout>
      <div class="container">
        <div class="divider w-full h-1px bg-protection my-12 md:my-15 2xl:my-16"></div>
      </div>
    </div>

    <div class="pb-12 md:pb-15">
      <h2 class="container text-lg font-semibold text-primary md:text-2xl 2xl:text-3xl">
        {{ $t('index.more_about_kia') }}
      </h2>
      <div
        class="no-scrollbar p-[--padding] mt-6 snap-x space-y-9 overflow-auto 2xl:container md:flex md:gap-x-10 md:space-y-0 2xl:snap-none"
        :style="{ '--padding': `0 ${bounding.x.value}px` }">
        <NuxtLinkLocale v-for="slide in extraLinksCard" :key="slide.title" :to="slide.href"
          class="relative mx-auto flex h-[208px] max-w-[310px] snap-center justify-center md:mx-0 md:w-[310px] md:max-w-none md:shrink-0 2xl:h-[265px] 2xl:w-[400px] 2xl:snap-none">
          <img :src="slide.image" class="h-full" loading="lazy" />
          <div class="absolute bottom-0 z-10 w-full p-4 md:px-7.5 md:py-5">
            <p class="text-base font-semibold text-white md:text-2xl">
              {{ $t(slide.title) }}
            </p>
          </div>
        </NuxtLinkLocale>
      </div>
    </div>
  </UISafeAreaView>
</template>
