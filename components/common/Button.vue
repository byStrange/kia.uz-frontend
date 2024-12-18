<script setup lang="ts">
import { type VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center whitespace-nowrap transition-all outline-none font-semibold text-base+',
  variants: {
    color: {
      unstyled: '',
      secondary: 'bg-primary-white text-primary border border-disabled hover:border-caption hover:bg-primary hover:bg-opacity-[0.04] active:bg-ptransparent active:border-description disabled:border-protection disabled:text-disabled',
      primary:
        'bg-primary text-primary-white hover:bg-description active:bg-[#2D3A43] active:text-protection disabled:disabled disabled:text-protection',
      primaryDark: 'bg-transparent border-city-gray text-primary-white hover:bg-white/5 hover:border-protection active:border-city-gray active:text-protection active:bg-primary/5 disabled:opacity-40',
      secondaryDark: 'bg-primary-white text-primary hover:bg-[#F0F1F1] active:bg-[#E0E3E4] disabled:opacity-40'
    },
    size: {
      unstyled: '',
      sm: 'py-3 px-5',
      md: 'py-4.5 px-10',
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
})

type ButtonVariants = VariantProps<typeof button>

defineProps<{
  color?: ButtonVariants['color']
  size?: ButtonVariants['size']
  mode?: ButtonVariants['mode']
  corner?: ButtonVariants['corner']
  label?: string
}>()
</script>

<template>
  <button :class="button({ color, size, mode, corner })">
    <slot>{{ label }}</slot>
  </button>
</template>
