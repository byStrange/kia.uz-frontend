<script setup lang="ts">
import { Pagination } from 'swiper/modules'
import type { Swiper } from 'swiper/types'
import type { IndexPageSlider } from '~/server/api/indexPage.get'

defineProps<{ slides: IndexPageSlider[] }>()

const { offset } = useContainer()
const { safe } = useSafeAccessMedia()

const localePath = useLocalePath()

const swiper = ref<Swiper | undefined>()

const prev = () => {
  swiper.value?.slidePrev()
}

const next = () => {
  swiper.value?.slideNext()
}

const onSwiper = (sw: any) => {
  swiper.value = sw
}

const currentIndex = computed(() => {
  return swiper.value?.activeIndex
})

const slidesLength = computed(() => {
  if (swiper.value) return swiper.value.slides.length
  return 0
})
</script>

<template>
  <div class="relative w-full bg-no-repeat">
    <div data-label="Hero shadow top" aria-hidden="true" class="absolute top-0 z-10 h-[140px] w-full" :style="{
      background:
        'linear-gradient(180deg, rgba(5, 20, 31, 0.5) 24.47%, rgba(5, 20, 31, 0) 100%)',
    }" />

    <ClientOnly>
      <Swiper ref="heroSwiper" :slides-per-view="1" class="dark-pagination h-screen" :modules="[Pagination]"
        :free-mode="true" :pagination="{ clickable: true }" @swiper="onSwiper">
        <template #container-start>
          <MoleculeButtonCarousel position="left" :hide="currentIndex === 0" @click="prev" />

          <MoleculeButtonCarousel position="right" :hide="currentIndex === slidesLength - 1" @click="next" />
        </template>
        <SwiperSlide v-for="slide in slides" :key="slide.id">
          <div class="h-full">
            <div data-label="Hero shadow bottom" aria-hidden="true"
              class="hero-slider-shade absolute bottom-0 z-20 h-[356px] w-full" />
            <MoleculeResponsiveImage class="h-[75%] w-full object-cover md:h-[80%] 2xl:h-full" :default-image="safe(slide.default_image)" :desktop-image="safe(slide.desktop_image)" :tablet-image="safe(slide.tablet_image)" />
            
            <div
              class="absolute container 2xl:px-0 left-0 bottom-[88px] z-40 flex w-full max-w-[540px] items-end justify-center md:bottom-[100px] md:justify-start md:pb-0 2xl:left-[--left]"
              :style="{
                '--left': offset.offsetLeft.value + 'px',
              }">
              <div class="flex w-full">
                <div class="w-full md:px-0">
                  <div class="space-y-1 text-white md:space-y-2">
                    <p class="text-sm text-white md:text-lg">{{ slide.pre_title }}</p>
                    <h1 class="text-2xl font-semibold md:text-4xl">{{ slide.title }}</h1>
                    <p class="text-sm md:text-lg">{{ slide.post_title }}</p>

                  </div>
                  <AtomButton :label="$t('common.more')" color="secondary" mode="full" class="mt-6 text-base"
                    @click="$router.push(localePath(slide.target_url))" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </div>
</template>
