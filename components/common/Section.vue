<script setup lang="ts">
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'

const sectionStyle = tv({
  base: '',
  variants: {
    size: {
      md: 'py-12 md:py-15',
      lg: 'py-12 md:py-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const textStyle = tv({
  base: 'text-2xl text-primary font-semibold mb-4 md:mb-8 md:text-4xl text-center',
  variants: {
    size: {
      md: 'text-2xl md:text-4xl 2xl:text-5xl',
      lg: 'text-4xl md:text-5xl',
    },
    align: {
      center: 'text-center',
      left: 'text-left',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'md',
    align: 'center',
  },
})

const subtitleStyle = tv({
  base: 'text-forest-green font-semibold text-sm mb-1.25',
  variants: {
    align: {
      center: 'text-center',
      left: 'text-left',
      right: 'text-right',
    },
  },
  defaultVariants: {
    align: 'center',
  },
})

type SectionVariants = VariantProps<typeof sectionStyle>
type SectionTitleVariants = VariantProps<typeof textStyle>

defineProps<{
  sectionTitle: string
  subtitle?: string
  size?: SectionVariants['size']
  align?: SectionTitleVariants['align']
}>()
</script>
<template>
  <section :class="sectionStyle({ size })">
    <slot
      name="title"
      v-bind="{
        sectionTitle,
        sectionTitleClass: textStyle({ size, align }),
        subtitle,
        subtitleClass: subtitleStyle({ align }),
      }"
    >
      <h3 v-if="subtitle" :class="subtitleStyle({ align })">
        {{ subtitle }}
      </h3>
      <h1 :class="textStyle({ size, align })">
        {{ sectionTitle }}
      </h1>
    </slot>
    <slot
      name="after-title"
      :align="textStyle.variants.align[align || 'center']"
    />
    <slot />
  </section>
</template>
