<script setup lang="ts">
import CarouselPrevIcon from "../icons/CarouselPrevIcon.vue";
import CarouselNextIcon from "../icons/CarouselNextIcon.vue";
import Button from "./Button.vue";
defineProps<{ position: "left" | "right"; hide?: boolean }>();
</script>
<template>
  <Button
    class="w-16 h-16 !p-0 transition-transform duration-300"
    color="secondary"
    corner="full"
    :class="{ 'scale-0': hide }"
  >
    <slot name="icon" :position="position">
      <template v-if="position === 'left'">
        <CarouselPrevIcon />
      </template>

      <template v-else>
        <CarouselNextIcon />
      </template>
    </slot>
  </Button>
</template>
