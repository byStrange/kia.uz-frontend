<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { useCssVar } from '@vueuse/core';
import { Pagination } from 'swiper/modules';
import { SwiperClass } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { useContainer } from '@/composables/useContainer';

import ButtonCarousel from '@/components/common/ButtonCarousel.vue';

const { bounding } = useContainer();

const swiper = ref<SwiperClass | null>(null);

const swiperActiveIndex = computed(() => {
  return swiper.value ? swiper.value.activeIndex : 0;
});

const swiperLength = computed(() => {
  if (!swiper.value || !swiper.value.pagination) return 0;
  return swiper.value ? swiper.value.pagination.bullets.length : 0;
});

const md = useCssVar('--screen-md');
const lg = useCssVar('--screen-2xl');

watch(bounding.x, () => {
  swiperBreakpoints.value = {
    [md.value ? parseInt(md.value) : 0]: {
      slidesOffsetBefore: bounding.x.value,
      slidesOffsetAfter: bounding.x.value,
      spaceBetween: 35,
    },
    [lg.value ? parseInt(lg.value) : 0]: {
      slidesOffsetBefore: bounding.x.value,
      slidesOffsetAfter: bounding.x.value,
      spaceBetween: 35,
    },
  };
});

const swiperBreakpoints = ref({});

withDefaults(
  defineProps<{
    data: any[];
    spaceBetween?: number;
    slidesOffsetBefore?: number;
    slidesOffsetAfter?: number;
    paginator?: boolean;
    swiperSlideClass?: string;
    navigation?: boolean;
    paginationMt?: string;
  }>(),
  {
    navigation: true,
    paginator: true,
  }
);
</script>
<template>
  <div>
    <Swiper
      :style="{
        '--swiper-pagination-mt': paginationMt,
      }"
      :breakpoints="swiperBreakpoints"
      slides-per-view="auto"
      :modules="[Pagination]"
      :pagination="paginator"
      :slides-offset-before="slidesOffsetBefore"
      :slides-offset-after="slidesOffsetAfter"
      :space-between="spaceBetween"
      class="light-pagination"
      @swiper="swiper = $event"
      :key="bounding.x.value"
      v-bind="$attrs"
    >
      <template #container-start v-if="navigation">
        <div
          class="absolute left-0 top-1/2 z-30 hidden -translate-y-1/2 2xl:block"
          :style="{
            left: bounding.x.value + 'px',
          }"
        >
          <ButtonCarousel
            position="left"
            :hide="swiperActiveIndex === 0"
            @click="swiper?.slidePrev()"
          />
        </div>
        <div
          :style="{
            right: bounding.x.value + 'px',
          }"
          class="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 2xl:block"
        >
          <ButtonCarousel
            position="right"
            :hide="swiperActiveIndex === swiperLength - 1"
            @click="swiper?.slideNext()"
          />
        </div>
      </template>
      <SwiperSlide
        class="md:!w-fit"
        v-for="item in data"
        :class="swiperSlideClass"
      >
        <slot name="slide" :item :bounding> </slot>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
