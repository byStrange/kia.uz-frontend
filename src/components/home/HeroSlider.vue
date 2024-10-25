<script setup>
import { useDynamicHeight } from "@/composables/useDynamicHeight";
import { getImageUrl } from "@/utils";
import Button from "../common/Button.vue";
</script>

<template>
  <div
    :style="{
      backgroundImage: `url(${getImageUrl('test/kia-test-hero-img.png')})`,
      backgroundSize: '100% auto',
      backgroundRepeat: 'no-repeat',
    }"
    class="w-full bg-black hero-slider-shade h-screen md:hidden"
  >
    <div class="container h-full flex items-end relative z-20 pb-10">
      <div class="w-full">
        <div class="text-white space-y-2.5">
          <p class="text-white font-semibold">Надежный атмосферный двигатель</p>
          <h1 class="text-2xl font-semibold">Kia Sonet</h1>
          <p class="w-[20ch]">Ежемесячный платеж от 2 965 000 сум</p>
        </div>
        <Button
          label="Подробнее"
          color="primary"
          size="md"
          mode="full"
          class="mt-7.5"
        />

        <div class="slider-controls flex gap-3 justify-center mt-7.5">
          <button
            v-for="i in 5"
            :class="{ 'bg-white border-none' : i === 4 }"
            class="w-2 h-2 rounded-full border border-semantic-secondary"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
