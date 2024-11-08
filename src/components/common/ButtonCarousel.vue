<script setup lang="ts">
import { VariantProps, tv } from 'tailwind-variants';

import { useContainer } from '@/composables/useContainer';

import CarouselNextIcon from '../icons/CarouselNextIcon.vue';
import CarouselPrevIcon from '../icons/CarouselPrevIcon.vue';
import Button from './Button.vue';

const cButton = tv({
  base: 'bg-primary p-0 bg-opacity-40 hover:bg-opacity-100',
  variants: {
    size: {
      lg: 'w-16 h-16',
      sm: 'w-10 h-10',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

const { bounding } = useContainer();

type ButtonCarouselVariants = VariantProps<typeof cButton>;

defineProps<{
  position: 'left' | 'right';
  hide?: boolean;
  size?: ButtonCarouselVariants['size'];
}>();
</script>
<template>
  <div
    class="absolute left-[--left] right-[--right] top-1/2 z-30 hidden -translate-y-1/2 2xl:block"
    :style="{
      [`--${position}`]: bounding.x.value + 'px',
    }"
  >
    <Button
      :class="[cButton({ size }), { 'scale-0': hide }]"
      corner="full"
      color="unstyled"
      size="unstyled"
    >
      <slot name="icon" :position="position">
        <template v-if="position === 'left'">
          <CarouselPrevIcon :class="{ 'w-2.5': size === 'sm' }" />
        </template>

        <template v-else>
          <CarouselNextIcon :class="{ 'w-2.5': size === 'sm' }" />
        </template>
      </slot>
    </Button>
  </div>
</template>
