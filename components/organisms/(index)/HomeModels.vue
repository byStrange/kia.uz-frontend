<script setup lang="tsx">
import { Thumbs } from 'swiper/modules'
import type { Swiper } from 'swiper/types'

const { t } = useI18n()

const props = defineProps<{
  models: ModelWithLessData[]
}>()

const thumbsSwiper = ref<Swiper | null>(null)
const mainSwiper = ref<Swiper | null>(null)
const { safe } = useSafeAccessMedia()

// Get focused model (Sonet) if available
const focusedModel = props.models.find((m) => m.name.toLowerCase() === 'sonet')
const focusedModelIndex = computed(() => {
  if (focusedModel) {
    return props.models.indexOf(focusedModel)
  }
  return 0
})

// Track active index for both sliders
const activeModelIndex = ref(focusedModelIndex.value)

// Helper function to navigate backward
const slidePrev = () => {
  mainSwiper.value?.slidePrev()
}

// Helper function to navigate forward
const slideNext = () => {
  mainSwiper.value?.slideNext()
}

const pagePadding = useCssVar('--page-padding')

onMounted(() => {
  // Initialize with the focused model after mount
  nextTick(() => {
    if (focusedModel && mainSwiper.value) {
      mainSwiper.value.slideToLoop(focusedModelIndex.value)
    }
  })
})

const changeSlides = useDebounceFn(() => {
  mainSwiper.value?.slideToLoop(activeModelIndex.value)
  thumbsSwiper.value?.slideToLoop(activeModelIndex.value)
}, 300)

watch(activeModelIndex, () => {
  changeSlides()
})
</script>

<template>
  <MoleculeSection :section-title="t('index.models_of_kia')" class="bg-background">
    <div class="2xl:container">
      <!-- Thumbnails Slider -->
      <div class="relative">
        <MoleculeButtonCarousel position="left" mode="free" size="sm" @click="slidePrev" />
        <MoleculeButtonCarousel position="right" mode="free" size="sm" @click="slideNext" />

        <div class="overflow-hidden px-12">
          <Swiper :modules="[Thumbs]" :slides-per-view="'auto'" :space-between="8" :watch-slides-progress="true"
            :centered-slides="true" :loop="true" :initial-slide="focusedModelIndex" @swiper="thumbsSwiper = $event"
            @slide-change="(swiper) => activeModelIndex = swiper.realIndex">
            <SwiperSlide v-for="model in models" :key="model.name" class="!w-fit">
              <div :class="[
                'relative w-fit rounded-xl border border-transparent px-1 py-2 transition-colors md:px-1.5 md:py-3 cursor-pointer',
                { '!border-primary': activeModelIndex === models.indexOf(model) },
              ]">
                <MoleculeImage loading="lazy" :base-url="model.main_image"
                  class="h-[40px] w-[84px] md:h-[52px] md:w-[108px]" />
                <p class="mt-1 text-center text-xs text-primary md:mt-3 md:text-base">
                  {{ model.name }}
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div :style="{
          background: 'linear-gradient(-90deg, rgba(248, 248, 248, 0) 0%, #F8F8F8 100%)',
        }" class="absolute left-0 z-10 h-full w-[94px]" />
        <div :style="{
          background: 'linear-gradient(90deg, rgba(248, 248, 248, 0) 0%, #F8F8F8 100%)',
        }" class="absolute right-0 z-10 h-full w-[94px]" />
      </div>

      <!-- Main Slider -->
      <div class="mt-4 md:mt-8">
        <Swiper :modules="[Thumbs]" :thumbs="{ swiper: thumbsSwiper }" :loop="true" :initial-slide="focusedModelIndex"
          :slides-per-view="1" :centered-slides="true" :space-between="16"
          :slides-offset-after="parseInt(pagePadding + '')" @swiper="mainSwiper = $event"
          @slide-change="(swiper) => activeModelIndex = swiper.realIndex">
          <template #container-start>
            <MoleculeButtonCarousel position="left" :hide="false" mode="free" @click="slidePrev" />
            <MoleculeButtonCarousel position="right" :hide="false" mode="free" @click="slideNext" />
          </template>
          <SwiperSlide v-for="model in models" :key="model.name" class="container 2xl:px-0">
            <div data-label="card">
              <div data-label="image wrapper">
                <MoleculeImage :base-url="safe(model.main_image)"
                  class="w-full md:mx-auto md:max-w-[500px] 2xl:max-w-[742px]" />
              </div>
              <div class="text-center">
                <h2 class="text-lg text-primary md:text-2xl md:font-semibold 2xl:text-3xl">
                  {{ model.name }}
                </h2>
                <div class="mt-2">
                  <p class="flex justify-center gap-x-1 text-sm text-primary md:text-base">
                    {{ formatPrice(model.starting_price, $t('prefixes.sum')) }}
                    <UIInfoIcon class="text-disabled" />
                  </p>
                </div>
              </div>
              <NuxtLinkLocale :to="`/models/${model.slug}/`" :prefetch="false" no-client>
                <AtomButton :label="$t('index.more_about_model')" color="primary" mode="full"
                  class="mx-auto mt-4 md:mt-8" />
              </NuxtLinkLocale>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </MoleculeSection>
</template>
