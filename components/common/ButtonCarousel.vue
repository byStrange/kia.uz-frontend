<script setup lang="ts">
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'

const cButton = tv({
  base: 'bg-primary p-0 hoverable:bg-opacity-40 hoverable:hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all',
  variants: {
    size: {
      lg: 'w-16 h-16',
      sm: 'w-10 h-10',
    },
  },
})

const { bounding } = useContainer()

type ButtonCarouselVariants = VariantProps<typeof cButton>

withDefaults(
  defineProps<{
    position?: 'left' | 'right'
    hide?: boolean
    size?: ButtonCarouselVariants['size']
    mode?: 'normal' | 'oneside-left' | 'free'
  }>(),
  {
    mode: 'normal',
    position: 'left',
    size: 'lg',
  },
)
</script>
<template>
  <div
    class="left-[--left] right-[--right] top-1/2 z-30 hidden 2xl:block"
    :style="{
      [`--${position}`]: mode === 'free' ? 0 : bounding.x.value + 'px',
    }"
    :class="{
      static: mode === 'oneside-left',
      'absolute -translate-y-1/2': mode === 'normal' || mode === 'free',
    }"
  >
    <button
      :class="[cButton({ size }), { 'scale-0': hide }]"
    >
      <slot name="icon" :position="position">
        <template v-if="position === 'left'">
          <UICarouselPrevIcon :class="{ 'w-2.5': size === 'sm' }" />
        </template>

        <template v-else>
          <UICarouselNextIcon :class="{ 'w-2.5': size === 'sm' }" />
        </template>
      </slot>
    </button>
  </div>
</template>
