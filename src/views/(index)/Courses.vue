<script setup lang="ts">
import TabsContainer from "@/components/common/TabsContainer.vue";
import Section from "@/components/home/Section.vue";

import { Swiper, SwiperSlide } from "swiper/vue";

import { useContainer } from "@/composables/useContainer";
import { SwiperClass } from "swiper/react";
import { computed, ref } from "vue";
import TickToRight from "@/components/icons/20x20/TickToRight.vue";
import { useCssVar } from "@vueuse/core";
import { watch } from "vue";
import ButtonCarousel from "@/components/common/ButtonCarousel.vue";
import PlayIcon from "@/components/icons/PlayIcon.vue";
import PlayIcon2 from "@/components/icons/PlayIcon2.vue";
import { useCoursesService } from "@/services/coursesService";
import { Pagination } from "swiper/modules";

const { bounding } = useContainer();
const { courses } = useCoursesService();

const specialsSwiper = ref<SwiperClass | null>(null);

const specialsSwiperActiveIndex = computed(() => {
  return specialsSwiper.value ? specialsSwiper.value.activeIndex : 0;
});

const specialsSwiperLength = computed(() => {
  return specialsSwiper.value ? specialsSwiper.value.slides?.length : 0;
});

const md = useCssVar("--screen-md");
const lg = useCssVar("--screen-2xl");

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
                class="absolute left-0 top-1/2 -translate-y-1/2 z-30 hidden 2xl:block"
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
                class="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden 2xl:block"
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
                class="md:!px-0 md:w-[310px]"
              >
                <div class="bg-background max-w-[310px] mx-auto">
                  <div
                    class="w-full h-[222px] bg-gray-200 relative flex justify-center items-center"
                  >
                    <img
                      :src="course.thumbnail"
                      class="w-full h-full object-cover"
                    />
                    <PlayIcon2 class="absolute" />
                  </div>

                  <div class="p-7.5">
                    <p class="text-base text-semantic-primary font-semibold">
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
                class="absolute left-0 top-1/2 -translate-y-1/2 z-30 hidden 2xl:block"
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
                class="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden 2xl:block"
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
                class="md:!px-0 md:w-[310px]"
              >
                <div class="bg-background max-w-[310px] mx-auto">
                  <div
                    class="w-full h-[222px] bg-gray-200 relative flex justify-center items-center"
                  >
                    <img
                      :src="course.thumbnail"
                      class="w-full h-full object-cover"
                    />
                    <PlayIcon2 class="absolute" />
                  </div>

                  <div class="p-7.5">
                    <p class="text-base text-semantic-primary font-semibold">
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
          class="text-semantic-primary flex gap-2.5 items-center mt-4 container md:absolute md:top-0 md:right-0 md:w-auto md:px-0 md:mt-0"
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
