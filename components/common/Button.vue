
<script setup lang="ts">
import { type VariantProps, tv } from 'tailwind-variants';

const button = tv({
  base: 'flex items-center justify-center whitespace-nowrap transition-all outline-none font-semibold',
  variants: {
    color: {
      unstyled: '',
      primary: 'bg-white text-semantic-text border border-disabled',
      secondary:
        'bg-primary border border-city-gray text-white hover:bg-[#434E56] active:bg-[#2D3A43] active:text-[#CDD0D2] disabled:bg-opacity-40 disabled:text-[#CDD0D2]',
      transparent:
        'bg-transparent text-white bg-opacity-60 hover:bg-opacity-100 border border-city-gray',
      danger:
        'bg-secondary text-white focus:ring focus:ring-secondary-300 ring-offset-2 ring-offset-white',
    },
    size: {
      unstyled: '',
      sm: 'px-2 py-2 text-sm md:py-3',
      md: 'px-3  py-[14.5px] text-base md:py-4.5 md:px-10',
      'md+': 'px-3  py-3 text-base md:py-4',
    },
    mode: {
      full: 'w-full md:w-auto',
      normal: '',
    },
    corner: {
      normal: '',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
    corner: 'normal',
    mode: 'normal',
  },
});

type ButtonVariants = VariantProps<typeof button>;

defineProps<{
  color?: ButtonVariants['color'];
  size?: ButtonVariants['size'];
  mode?: ButtonVariants['mode'];
  corner?: ButtonVariants['corner'];
  label?: string;
}>();
</script>

<template>
  <button :class="button({ color, size, mode, corner })">
    <slot>{{ label }}</slot>
  </button>
</template>
