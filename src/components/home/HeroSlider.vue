<script setup lang="ts">
import Button from "../common/Button.vue";
import { computed, ref } from "vue";
import { getImageUrl } from "@/utils";
import { onMounted } from "vue";

const activeSlideIndex = ref(0);

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

const sliderContainer = ref<HTMLElement | null>(null);

const childrenWidth = ref(0);

const goToSlide = (index: number) => {
  activeSlideIndex.value = index;
  sliderContainer.value?.scrollTo({
    left: index * childrenWidth.value,
    behavior: "smooth",
  });
};

onMounted(() => {
  if (sliderContainer.value !== null) {
    // @ts-ignore
    childrenWidth.value = sliderContainer.value.children[0].offsetWidth;
    sliderContainer.value.addEventListener("scrollend", () => {
      const scrollLeft = sliderContainer.value?.scrollLeft;
      const scrollWidth = sliderContainer.value?.scrollWidth;
      const index = Math.round(parseInt(scrollLeft + "") / childrenWidth.value);

      goToSlide(index);

      console.log(scrollLeft, scrollWidth);
    });
  }
});

const activeSlideBackground = computed(() => {
  return getImageUrl(slides.value[activeSlideIndex.value].image);
});
</script>

<template>
  <div
    :style="{
      backgroundImage: `url(${activeSlideBackground})`,
      backgroundSize: '100% auto',
    }"
    class="w-full bg-black hero-slider-shade h-[600px] md:hidden bg-no-repeat relative"
  >
    <div
      class="container h-full flex items-end relative z-20 pb-12 justify-center"
    >
      <div class="flex min-w-full overflow-auto" ref="sliderContainer">
        <div class="min-w-full snap-center px-2.5" v-for="slide in slides">
          <div class="text-white space-y-2.5">
            <p class="text-white font-semibold">
              {{ slide.title }}
            </p>
            <h1 class="text-2xl font-semibold">Kia Sonet</h1>
            <p class="w-[20ch]">{{ slide.description }}</p>
          </div>
          <Button
            label="Подробнее"
            color="primary"
            size="md"
            mode="full"
            class="mt-7.5"
          />
        </div>
      </div>
      <div
        class="slider-controls flex gap-3 justify-center mt-7.5 absolute bottom-6"
      >
        <button
          v-for="i in slides.length"
          @click="goToSlide(i - 1)"
          :class="{ 'bg-white border-none': i - 1 === activeSlideIndex }"
          class="w-2 h-2 rounded-full border border-semantic-secondary"
        ></button>
      </div>
    </div>
  </div>
</template>
