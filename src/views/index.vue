<script setup lang="ts">
import HeroSlider from "@/components/home/HeroSlider.vue";
import FloatingContactButton from "@/components/home/FloatingContactButton.vue";
import Section from "@/components/home/Section.vue";
import { SwiperSlide, Swiper } from "swiper/vue";
import { useCssVar } from "@vueuse/core";
import { ref } from "vue";
import { SwiperClass } from "swiper/react";
import { Controller } from "swiper/modules";
import InfoIcon from "@/components/icons/20x20/InfoIcon.vue";
import Button from "@/components/common/Button.vue";

const modelsThumbSwiper = ref<SwiperClass | null>(null);
const modelsSwiper = ref<SwiperClass | null>(null);

const models = ref([
  {
    title: "Sonet",
    electric: true,
    images: {
      small:
        "https://ucarecdn.com/548a3e08-011b-41b5-a074-a0b06917d3e9/-/preview/336x160/",
      medium:
        "https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/",
    },
  },
  {
    title: "K5",
    electric: false,
    images: {
      small:
        "https://ucarecdn.com/0573bd47-db16-48a2-b4df-ced019edc53c/-/preview/336x160/",
      medium:
        "https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/",
    },
  },
  {
    title: "Sportage",
    electric: false,
    images: {
      small:
        "https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/",
      medium:
        "https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/",
    },
  },
  {
    title: "Sportage",
    electric: false,
    images: {
      small:
        "https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/",
      medium:
        "https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/",
    },
  },
  {
    title: "Sportage",
    electric: false,
    images: {
      small:
        "https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/",
      medium:
        "https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/",
    },
  },
]);

const activeModelIndex = ref(0);

const pagePadding = useCssVar("--page-padding");
</script>

<template>
  <FloatingContactButton />
  <HeroSlider />

  <Section sectionTitle="Модели Kia" class="bg-background">
    <Swiper
      :modules="[Controller]"
      :controller="{ control: modelsSwiper }"
      @swiper="modelsThumbSwiper = $event"
      @slideChange="(e) => (activeModelIndex = e.activeIndex)"
      :slides-per-view="3"
      :centered-slides="true"
      :slides-offset-before="parseInt(pagePadding + '')"
      :slides-offset-after="parseInt(pagePadding + '')"
      :space-between="8"
    >
      <template #container-start>
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[94px] h-[76px] rounded-xl border border-semantic-primary hidden"
        ></div>
      </template>
      <SwiperSlide v-for="model in models" class="">
        <div
          class="py-2 px-1 rounded-xl border space-y-1 w-fit border-transparent transition-colors"
          :class="{
            '!border-semantic-primary':
              activeModelIndex === models.indexOf(model),
          }"
        >
          <img :src="model.images.small" class="w-[84px] h-[40px]" />
          <p class="text-xs text-semantic-primary text-center">
            {{ model.title }}
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="mt-4">
      <Swiper
        :modules="[Controller]"
        :controller="{ control: modelsThumbSwiper }"
        @swiper="modelsSwiper = $event"
        :slides-per-view="1"
        :centered-slides="true"
        :space-between="16"
        :slides-offset-after="parseInt(pagePadding + '')"
      >
        <SwiperSlide v-for="model in models" class="px-[var(--page-padding)]">
          <div data-label="card">
            <div data-label="image wrapper">
              <img :src="model.images.medium" class="w-full" />
            </div>
            <div class="text-center">
              <h2 class="text-semantic-primary text-lg">{{ model.title }}</h2>
              <div class="mt-2">
                <p
                  class="text-semantic-primary text-sm flex justify-center gap-x-1"
                >
                  от  199 900 000 сум
                  <InfoIcon class="text-disabled-elements" />
                </p>
                <p class="text-caption text-sm">выгода: 50 000 сум</p>
              </div>
            </div>
            <Button
              label="Подробнее"
              color="secondary"
              size="md"
              mode="full"
              class="mt-4"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </Section>
</template>
