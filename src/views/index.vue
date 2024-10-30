<script setup lang="ts">
import HeroSliders from "./(index)/HeroSliders.vue";
import FloatingContactButton from "@/components/home/FloatingContactButton.vue";
import SpecialOffers from "./(index)/SpecialOffers.vue";
import Models from "./(index)/Models.vue";
import Courses from "./(index)/Courses.vue";
import Button from "@/components/common/Button.vue";

import { useContainer } from "@/composables/useContainer";

const { bounding } = useContainer();

const extraLinksCard = [
  {
    title: "Бренд",
    href: "#",
    image:
      "https://ucarecdn.com/8701cf69-f335-45be-b0d7-2c939d629d0f/-/preview/1000x664/",
  },
  {
    title: "Kia в Узбекистане",
    href: "#",
    image:
      "https://ucarecdn.com/907872e6-383c-4eee-8d95-4779a60485ca/-/preview/1000x664/",
  },
  {
    title: "Технологии",
    href: "#",
    image:
      "https://ucarecdn.com/b3436484-91af-4e8c-9678-d36a564a1a3f/-/preview/1000x664/",
  },
];
</script>

<template>
  <FloatingContactButton />
  <HeroSliders />
  <Models />
  <SpecialOffers />
  <Courses />

  <div class="container pb-12 md:pb-15">
    <div class="bg-caption h-full relative max-w-[420px] mx-auto md:max-w-none">
      <picture>
        <source
          media="(min-width: 1024px)"
          srcset="
            https://ucarecdn.com/47fd9450-1106-44ba-b977-dfe1795a0f05/-/preview/1000x720/
          "
        />
        <source
          srcset="
            https://ucarecdn.com/32d3bffb-f001-4406-a6c0-517ca367af7f/-/preview/827x999/
          "
          media="(min-width: 768px)"
        />
        <img
          src="https://ucarecdn.com/9ae43504-1cfc-4d2b-9137-b40a5473ffce/-/preview/1000x597/"
          class="img w-full h-[187px] bg-gray-200 md:absolute md:right-0 md:h-full md:w-1/2 max-w-[640px]"
        />
      </picture>
      <div class="px-4 py-8 md:w-1/2 md:px-6 2xl:px-12 2xl:py-14">
        <h2 class="text-white font-semibold text-lg md:text-2xl 2xl:text-5xl">
          Беспроцентная рассрочка на автомобили Kia
        </h2>
        <p class="text-white text-base mt-2 md:leading-[24px] md:mt-4">
          Успейте воспользоваться уникальным предложением от официального
          дистрибьютора Kia в Узбекистане — любой доступный автомобиль
          в рассрочку без переплат.
        </p>
        <Button
          color="primary"
          mode="full"
          label="Подробнее"
          class="mt-6 md:leading-[24px] md:mt-14"
        />
      </div>
    </div>
  </div>

  <div class="pb-12 md:pb-15">
    <h2 class="text-semantic-primary text-lg font-semibold container">
      Подробнее о Kia
    </h2>
    <div
      class="space-y-9 mt-6 md:flex md:space-y-0 md:gap-x-10 overflow-auto snap-x no-scrollbar 2xl:container 2xl:snap-none"
      :style="{ padding: `0 ${bounding.x.value}px` }"
    >
      <div
        class="h-[208px] max-w-[310px] mx-auto md:max-w-none md:w-[310px] md:shrink-0 relative snap-center 2xl:snap-none 2xl:flex-1 flex justify-center"
        v-for="slide in extraLinksCard"
      >
        <img :src="slide.image" class="h-full" />
        <div class="p-4 absolute bottom-0 z-10">
          <p class="text-base text-white">{{ slide.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
