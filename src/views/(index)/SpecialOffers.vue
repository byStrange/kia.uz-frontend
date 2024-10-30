<script setup lang="ts">
import TabsContainer from "@/components/common/TabsContainer.vue";
import Section from "@/components/home/Section.vue";
import { useT } from "@/composables/useT";

import { Swiper, SwiperSlide } from "swiper/vue";
import { useSpecialsService } from "@/services/specialsService";

import { useContainer } from "@/composables/useContainer";
import { SwiperClass } from "swiper/react";
import { computed, ref } from "vue";
import ServiceRegistrationIcon from "@/components/icons/ServiceRegistrationIcon.vue";
import TickToRight from "@/components/icons/20x20/TickToRight.vue";
import { useCssVar } from "@vueuse/core";
import { watch } from "vue";
import ButtonCarousel from "@/components/common/ButtonCarousel.vue";
import { Pagination } from "swiper/modules";

const { bounding } = useContainer();

const { specials } = useSpecialsService();

const { T } = useT();

const specialsSwiper = ref<SwiperClass | null>(null);

const specialsSwiperActiveIndex = computed(() => {
  if (specialsSwiper.value && specialsSwiper.value.activeIndex) {
    // firstly, we need to calculate the index, we have an index of the slide, but we need to know the group
    // but also, sometimes, the slides length is not divisible by the group, so we need to calculate the remainder
    // and add it to the index
    return (
      specialsSwiper.value.activeIndex /
      (specialsSwiper.value.params.slidesPerGroup || 1)
    );
  }
  return 0;
});

const specialsSwiperLength = computed(() => {
  if (
    specialsSwiper.value &&
    specialsSwiper.value.slides &&
    specialsSwiper.value.params
  ) {
    return (
      specialsSwiper.value.slides?.length /
      (specialsSwiper.value.params.slidesPerGroup || 1)
    );
  }
  return 0;
});

const md = useCssVar("--screen-md");
const lg = useCssVar("--screen-2xl");

watch(bounding.x, () => {
  specialsSwiperBreakpoints.value = {
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

const specialsSwiperBreakpoints = ref({});
</script>
<template>
  <Section :sectionTitle="T('app', 'Special Offers')">
    <template #title="{ sectionTitle, sectionTitleClass }">
      <h1 class="container" :class="sectionTitleClass">
        {{ sectionTitle }}
      </h1>
    </template>

    <TabsContainer :tabs="['Покупка', 'Сервис']" :isContentFull="true">
      <template #1>
        <div>
          <Swiper
            :breakpoints="specialsSwiperBreakpoints"
            slides-per-view="auto"
            :modules="[Pagination]"
            pagination
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
            <SwiperSlide class="md:!w-fit" v-for="speciaility in specials">
              <div
                :style="{ padding: `0 ${bounding.x.value}px` }"
                class="md:!px-0 md:w-[310px] h-[408px]"
              >
                <div class="bg-background h-full max-w-[310px] mx-auto">
                  <img :src="speciaility.thumbnail" class="w-full h-[222px]" />

                  <div class="p-4">
                    <div class="text-left">
                      <h2 class="text-base font-semibold">
                        {{ speciaility.title }}
                      </h2>
                      <p class="text-base text-semantic-primary mt-2">
                        {{ speciaility.description }}
                      </p>
                    </div>
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
            :modules="[Pagination]"
            pagination
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
            <SwiperSlide class="md:!w-fit" v-for="speciaility in specials">
              <div
                :style="{ padding: `0 ${bounding.x.value}px` }"
                class="md:!px-0 md:w-[310px] h-[408px]"
              >
                <div class="bg-background h-full max-w-[310px] mx-auto">
                  <img :src="speciaility.thumbnail" class="w-full h-[222px]" />

                  <div class="p-4">
                    <div class="text-left">
                      <h2 class="text-base font-semibold">
                        {{ speciaility.title }}
                      </h2>
                      <p class="text-base text-semantic-primary mt-2">
                        {{ speciaility.description }}
                      </p>
                    </div>
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
          <ServiceRegistrationIcon class="md:hidden" />
          <div class="flex">
            <p class="text-base font-semibold">Все спецпредложения</p>
            <TickToRight />
          </div>
        </button>
      </template>
    </TabsContainer>
  </Section>
</template>

<style>
.swiper-pagination-bullet {
  @apply border border-semantic-primary bg-transparent opacity-100;
}

.swiper-pagination-bullet-active {
  @apply bg-semantic-primary;
}

.specials-swiper .swiper-pagination {
  @apply text-white static mt-10;
}
</style>
