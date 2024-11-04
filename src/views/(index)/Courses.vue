<script setup lang="ts">
import { computed, ref } from 'vue';
import { watch } from 'vue';

import { useCssVar } from '@vueuse/core';
import { Pagination } from 'swiper/modules';
import { SwiperClass } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { useCoursesService } from '@/services/coursesService';

import { useContainer } from '@/composables/useContainer';

import ButtonCarousel from '@/components/common/ButtonCarousel.vue';
import TabsContainer from '@/components/common/TabsContainer.vue';

import Section from '@/components/home/Section.vue';

import TickToRight from '@/components/icons/20x20/TickToRight.vue';
import PlayIcon2 from '@/components/icons/PlayIcon2.vue';
import PlayIcon from '@/components/icons/PlayIcon.vue';

const { bounding } = useContainer();
const { courses } = useCoursesService();

const specialsSwiper = ref<SwiperClass | null>(null);

const specialsSwiperActiveIndex = computed(() => {
  return specialsSwiper.value ? specialsSwiper.value.activeIndex : 0;
});

const specialsSwiperLength = computed(() => {
  if (!specialsSwiper.value || !specialsSwiper.value.pagination) return 0;

  return specialsSwiper.value
    ? specialsSwiper.value.pagination?.bullets.length
    : 0;
});

const md = useCssVar('--screen-md');
const lg = useCssVar('--screen-2xl');

watch(bounding.x, () => {
  specialsSwiperBreakpoints.value = {
    [md.value ? parseInt(md.value) : 0]: {
      slidesOffsetBefore: bounding.x.value,
      slidesOffsetAfter: bounding.x.value,
      spaceBetween: 35,
      centeredSlides: false,
    },
    [lg.value ? parseInt(lg.value) : 0]: {
      slidesOffsetBefore: bounding.x.value,
      slidesOffsetAfter: bounding.x.value,
      spaceBetween: 35,
      centeredSlides: false,
    },
  };
});

const specialsSwiperBreakpoints = ref({});
</script>
<template>
  <Section sectionTitle="Будьте в курсе">
    <template #title="{ sectionTitle, sectionTitleClass }">
      <h1 class="container" :class="sectionTitleClass">
        {{ sectionTitle }}
      </h1>
    </template>

    <TabsContainer :tabs="['Видео-обзоры', 'Новости']" :isContentFull="true">
      <template #1>
        <div>
          <Swiper
            :breakpoints="specialsSwiperBreakpoints"
            slides-per-view="auto"
            pagination
            :modules="[Pagination]"
            class="specials-swiper"
            @swiper="specialsSwiper = $event"
            :key="bounding.x.value"
          >
            <template #container-start>
              <div
                class="absolute left-0 top-1/2 z-30 hidden -translate-y-1/2 2xl:block"
                :style="{
                  left: bounding.x.value + 'px',
                }"
              >
                <ButtonCarousel
                  position="left"
                  :hide="specialsSwiperActiveIndex === 0"
                  @click="specialsSwiper?.slidePrev()"
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
                  :hide="specialsSwiperActiveIndex === specialsSwiperLength - 1"
                  @click="specialsSwiper?.slideNext()"
                />
              </div>
            </template>
            <SwiperSlide class="md:!w-fit" v-for="course in courses">
              <div
                :style="{ padding: `0 ${bounding.x.value}px` }"
                class="h-[408px] md:w-[310px] md:!px-0"
              >
                <div class="mx-auto h-full max-w-[310px] bg-background">
                  <div
                    class="relative flex h-[222px] w-full items-center justify-center bg-gray-200"
                  >
                    <img
                      :src="course.thumbnail"
                      class="h-full w-full object-cover"
                    />
                    <PlayIcon2 class="absolute" />
                  </div>

                  <div class="p-7.5">
                    <p class="text-base font-semibold text-primary">
                      {{ course.title }}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </template>

      <template #2>
        <div>
          <Swiper
            :breakpoints="specialsSwiperBreakpoints"
            slides-per-view="auto"
            pagination
            :modules="[Pagination]"
            class="specials-swiper"
            @swiper="specialsSwiper = $event"
            :key="bounding.x.value"
          >
            <template #container-start>
              <div
                class="absolute left-0 top-1/2 z-30 hidden -translate-y-1/2 2xl:block"
                :style="{
                  left: bounding.x.value + 'px',
                }"
              >
                <ButtonCarousel
                  position="left"
                  :hide="specialsSwiperActiveIndex === 0"
                  @click="specialsSwiper?.slidePrev()"
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
                  :hide="specialsSwiperActiveIndex === specialsSwiperLength - 1"
                  @click="specialsSwiper?.slideNext()"
                />
              </div>
            </template>
            <SwiperSlide class="md:!w-fit" v-for="course in courses">
              <div
                :style="{ padding: `0 ${bounding.x.value}px` }"
                class="h-[408px] md:w-[310px] md:!px-0"
              >
                <div class="mx-auto h-full max-w-[310px] bg-background">
                  <div
                    class="relative flex h-[222px] w-full items-center justify-center bg-gray-200"
                  >
                    <img
                      :src="course.thumbnail"
                      class="h-full w-full object-cover"
                    />
                    <PlayIcon2 class="absolute" />
                  </div>

                  <div class="p-7.5">
                    <p class="text-base font-semibold text-primary">
                      {{ course.title }}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </template>

      <template #default>
        <button
          class="container mt-4 flex items-center gap-2.5 text-primary md:absolute md:right-0 md:top-0 md:mt-0 md:w-auto md:px-0"
          :style="{ right: bounding.x.value + 'px' }"
        >
          <PlayIcon class="md:hidden" />
          <div class="flex">
            <p class="text-base font-semibold">Все видео-обзоры</p>
            <TickToRight />
          </div>
        </button>
      </template>
    </TabsContainer>
  </Section>
</template>
