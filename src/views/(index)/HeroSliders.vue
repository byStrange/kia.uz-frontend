<script setup lang="ts">
import { computed, ref } from "vue";
import { SwiperSlide, Swiper } from "swiper/vue";
import { Pagination } from "swiper/modules";
import Button from "@/components/common/Button.vue";
import ButtonCarousel from "@/components/common/ButtonCarousel.vue";
import { SwiperClass } from "swiper/react";
import { useContainer } from "@/composables/useContainer";

const slides = ref([
  {
    title: "Надежный атмосферный двигатель",
    description: "Ежемесячный платеж от 2 965 000 сум",
    image: "test/kia-test-hero-img.png",
  },
  {
    title: "Надежный атмосферный двигатель",
    description: "Ежемесячный платеж от 2 965 000 сум",
    image: "test/kia-test-hero-img.png",
  },
]);

const { bounding, offset } = useContainer();
console.log(offset);

const swiper = ref<SwiperClass | undefined>();

const prev = () => {
  swiper.value?.slidePrev();
};

const next = () => {
  swiper.value?.slideNext();
};

const onSwiper = (sw: any) => {
  swiper.value = sw;
};

const currentIndex = computed(() => {
  return swiper.value?.activeIndex;
});

const slidesLength = computed(() => {
  if (swiper.value) return swiper.value.slides.length;
  return 0;
});
</script>

<template>
  <div class="w-full bg-no-repeat relative">
    <div
      data-label="Hero shadow top"
      aria-hidden="true"
      class="absolute top-0 w-full h-[140px] z-10"
      :style="{
        background:
          'linear-gradient(180deg, rgba(5, 20, 31, 0.5) 24.47%, rgba(5, 20, 31, 0) 100%)',
      }"
    ></div>

    <Swiper
      @swiper="onSwiper"
      :slides-per-view="1"
      class="h-screen dark-pagination"
      :modules="[Pagination]"
      :freeMode="true"
      :pagination="{ clickable: true }"
    >
      <template #container-start>
        <div
          class="absolute left-0 top-1/2 -translate-y-1/2 z-30 hidden 2xl:block"
          :style="{
            left: bounding.x.value + 'px',
          }"
        >
          <ButtonCarousel
            position="left"
            :hide="currentIndex === 0"
            @click="prev"
          />
        </div>
        <div
          :style="{
            right: bounding.x.value + 'px',
          }"
          class="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden 2xl:block"
        >
          <ButtonCarousel
            position="right"
            :hide="currentIndex === slidesLength - 1"
            @click="next"
          />
        </div>
      </template>
      <SwiperSlide v-for="i in 3" :key="i">
        <div class="h-full">
          <div
            data-label="Hero shadow bottom"
            aria-hidden="true"
            class="absolute bottom-0 w-full h-[356px] z-10 hero-slider-shade"
          ></div>
          <picture class="w-full h-full">
            <source
              srcset="@/assets/test/kia-test-hero-img.png"
              media="(min-width: 1024px)"
            />

            <source
              srcset="@/assets/test/kia-test-hero-img-tablet.png"
              media="(min-width: 768px)"
            />
            <img
              src="@/assets/test/kia-test-hero-img-mobile.png"
              class="w-full h-full object-cover"
            />
          </picture>
          <div
            class="flex items-end z-40 justify-center md:justify-start md:pb-0 absolute bottom-[88px] md:bottom-[100px]"
            :style="{ left: offset.offsetLeft.value + 'px' }"
          >
            <div class="flex md:max-w-[540px] w-full">
              <div class="min-w-full md:px-0">
                <div class="text-white space-y-2.5 md:space-y-2">
                  <p class="text-white md:text-lg">
                    {{ slides[0].title }}
                  </p>

                  <h1
                    class="text-2xl font-semibold md:text-[56px] md:leading-[64px]"
                  >
                    Kia Sonet
                  </h1>
                  <p class="w-[20ch] md:text-lg md:w-auto">
                    {{ slides[0].description }}
                  </p>
                </div>
                <Button
                  label="Подробнее"
                  color="primary"
                  size="md"
                  mode="full"
                  class="mt-7.5 md:!w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style>
.swiper-pagination {
  @apply !bottom-10 md:!bottom-12 flex justify-center;
}
</style>
