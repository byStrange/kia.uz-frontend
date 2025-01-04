<script setup lang="ts">
import { Pagination } from 'swiper/modules'
import type { Swiper } from 'swiper/types'

const slides = ref([
  {
    title: 'Надежный атмосферный двигатель',
    description: 'Ежемесячный платеж от 2 965 000 сум',
    image: 'test/kia-test-hero-img.png',
  },
  {
    title: 'Надежный атмосферный двигатель',
    description: 'Ежемесячный платеж от 2 965 000 сум',
    image: 'test/kia-test-hero-img.png',
  },
])

const { offset } = useContainer()

const localePath = useLocalePath();

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
        <SwiperSlide v-for="i in 3" :key="i">
          <div class="h-full">
            <div data-label="Hero shadow bottom" aria-hidden="true"
              class="hero-slider-shade absolute bottom-0 z-10 h-[356px] w-full" />
            <picture class="h-full w-full">
              <source srcset="@/assets/test/kia-test-hero-img.png" media="(min-width: 1024px)" />

              <source srcset="@/assets/test/kia-test-hero-img-tablet.png" media="(min-width: 768px)" />
              <img loading="lazy" src="@/assets/test/kia-test-hero-img-mobile.png"
                class="h-[75%] w-full object-cover md:h-[80%] 2xl:h-full" />
            </picture>
            <div
              class="absolute container 2xl:px-0 left-0 bottom-[88px] z-40 flex w-full max-w-[540px] items-end justify-center md:bottom-[100px] md:justify-start md:pb-0 2xl:left-[--left]"
              :style="{
                '--left': offset.offsetLeft.value + 'px',
              }">
              <div class="flex w-full">
                <div class="w-full md:px-0">
                  <div class="space-y-1 text-white md:space-y-2">
                    <p class="text-sm text-white md:text-lg">
                      {{ slides[0].title }}
                    </p>

                    <h1 class="text-2xl font-semibold md:text-4xl">
                      Kia Sonet
                    </h1>
                    <p class="text-sm md:text-lg">
                      {{ slides[0].description }}
                    </p>
                  </div>
                  <AtomButton @click="$router.push(localePath('/models/sonet'))" label="Подробнее" color="secondary"
                    mode="full" class="mt-6 text-base" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </div>
</template>
