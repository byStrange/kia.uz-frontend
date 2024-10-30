<script setup lang="tsx">
import InfoIcon from "@/components/icons/20x20/InfoIcon.vue";
import Button from "@/components/common/Button.vue";
import Section from "@/components/home/Section.vue";
import { SwiperSlide, Swiper } from "swiper/vue";
import { useCssVar } from "@vueuse/core";
import { computed, ref } from "vue";
import { SwiperClass } from "swiper/react";
import { Controller } from "swiper/modules";
import { useModelsService, Model } from "@/services/modelsService";
import ElectroCarIcon from "@/components/icons/ElectroCarIcon.vue";
import ButtonCarousel from "@/components/common/ButtonCarousel.vue";

const modelsThumbSwiper = ref<SwiperClass | null>(null);
const modelsSwiper = ref<SwiperClass | null>(null);

const slidesLength = computed(() =>
  modelsThumbSwiper.value ? modelsThumbSwiper.value.slides.length : 0
);

const slidePrev = () => {
  modelsSwiper.value?.slidePrev();
};

const slideNext = () => {
  modelsSwiper.value?.slideNext();
};

const { models } = useModelsService();

const activeModelIndex = ref(0);

const pagePadding = useCssVar("--page-padding");

const thumbSlidersBreakpoints = computed(() => {
  const md = useCssVar("--screen-md");
  const largeDesktop = useCssVar("--screen-lg");
  return {
    [md.value ? parseInt(md.value) : 0]: {
      slidesPerView: 5,
    },
    [largeDesktop.value ? parseInt(largeDesktop.value) : 0]: {
      slidesPerView: 10,
    },
  };
});

const MiniThumbCard = ({ model }: { model: Model }) => {
  return (
    <div
      class={[
        "py-2 px-1 rounded-xl border w-fit border-transparent transition-colors relative md:py-3 md:px-1.5",
        {
          "!border-semantic-primary":
            activeModelIndex.value === models.value.indexOf(model),
        },
      ]}
    >
      {model.electric && <ElectroCarIcon class="absolute top-2 right-1" />}

      <img
        src={model.images.small}
        class="w-[84px] h-[40px] md:w-[108px] md:h-[52px]"
      />
      <p class="text-xs text-semantic-primary text-center md:text-base mt-1 md:mt-3">
        {model.title}
      </p>
    </div>
  );
};

const ModelCard = ({ model }: { model: Model }) => {
  return (
    <div data-label="card">
      <div data-label="image wrapper">
        <img
          src={model.images.medium}
          class="w-full md:max-w-[500px] md:mx-auto 2xl:max-w-[742px]"
        />
      </div>
      <div class="text-center">
        <h2 class="text-semantic-primary text-lg md:font-semibold md:text-2xl 2xl:text-3xl">
          {model.title}
        </h2>
        <div class="mt-2">
          <p class="text-semantic-primary text-sm flex justify-center gap-x-1 md:text-base">
            от  199 900 000 сум
            <InfoIcon class="text-disabled-elements" />
          </p>
          <p class="text-caption text-sm md:text-base">выгода: 50 000 сум</p>
        </div>
      </div>
      <Button
        label="Подробнее о модели"
        color="secondary"
        size="md"
        mode="full"
        class="mt-4 mx-auto md:mt-8"
      />
    </div>
  );
};
</script>
<template>
  <Section sectionTitle="Модели Kia" class="bg-background 2xl:container">
    <Swiper
      :modules="[Controller]"
      :controller="{ control: modelsSwiper }"
      :breakpoints="thumbSlidersBreakpoints"
      @swiper="modelsThumbSwiper = $event"
      @slideChange="(e) => (activeModelIndex = e.activeIndex)"
      :slides-per-view="3"
      :centered-slides="true"
      :space-between="8"
    >
      <template #container-start>
        <div
          class="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden 2xl:block"
        >
          <ButtonCarousel
            position="left"
            :hide="activeModelIndex === 0"
            size="sm"
            @click="slidePrev"
          />
        </div>
        <div
          class="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden 2xl:block"
        >
          <ButtonCarousel
            position="right"
            :hide="activeModelIndex === slidesLength - 1"
            size="sm"
            @click="slideNext"
          />
        </div>
        <div
          :style="{
            background:
              'linear-gradient(-90deg, rgba(248, 248, 248, 0) 0%, #F8F8F8 100%)',
          }"
          class="absolute left-0 h-full z-10 w-[94px]"
        ></div>
        <div
          :style="{
            background:
              'linear-gradient(90deg, rgba(248, 248, 248, 0) 0%, #F8F8F8 100%)',
          }"
          class="absolute right-0 h-full z-10 w-[94px]"
        ></div>
      </template>
      <SwiperSlide v-for="model in models">
        <MiniThumbCard :model="model" />
      </SwiperSlide>
    </Swiper>
    <div class="mt-4 md:mt-8">
      <Swiper
        :modules="[Controller]"
        :controller="{ control: modelsThumbSwiper }"
        @swiper="modelsSwiper = $event"
        :slides-per-view="1"
        :centered-slides="true"
        :space-between="16"
        :slides-offset-after="parseInt(pagePadding + '')"
      >
        <template #container-start>
          <div
            class="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden 2xl:block"
          >
            <ButtonCarousel
              position="left"
              :hide="activeModelIndex === 0"
              @click="slidePrev"
            />
          </div>
          <div
            class="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden 2xl:block"
          >
            <ButtonCarousel
              position="right"
              :hide="activeModelIndex === slidesLength - 1"
              @click="slideNext"
            />
          </div>
        </template>
        <SwiperSlide v-for="model in models" class="px-[var(--page-padding)]">
          <ModelCard :model="model" />
        </SwiperSlide>
      </Swiper>
    </div>
  </Section>
</template>
