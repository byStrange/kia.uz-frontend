<script setup lang="ts">
import CarouselPrevIcon from '../icons/CarouselPrevIcon.vue';
import CarouselNextIcon from '../icons/CarouselNextIcon.vue';
import Button from './Button.vue';
import { tv, VariantProps } from 'tailwind-variants';

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

type ButtonCarouselVariants = VariantProps<typeof cButton>;

defineProps<{
  position: 'left' | 'right';
  hide?: boolean;
  size?: ButtonCarouselVariants['size'];
}>();
</script>
<template>
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
</template>
