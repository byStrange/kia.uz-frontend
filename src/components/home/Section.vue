<script setup lang="ts">
import { VariantProps, tv } from 'tailwind-variants';

const sectionStyle = tv({
  base: '',
  variants: {
    size: {
      md: 'py-12 md:py-15',
      lg: 'py-15',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const textStyle = tv({
  base: 'text-2xl text-primary font-semibold mb-4 md:mb-8 md:text-4xl text-center',
  variants: {
    size: {
      md: 'text-2xl md:text-4xl 2xl:text-5xl',
      lg: 'text-4xl md:text-5xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type SectionVariants = VariantProps<typeof sectionStyle>;

defineProps<{
  sectionTitle: string;
  subtitle?: string;
  size?: SectionVariants['size'];
}>();
</script>
<template>
  <section :class="sectionStyle({ size })">
    <slot
      name="title"
      v-bind="{ sectionTitle, sectionTitleClass: textStyle({ size }) }"
    >
      <h3
        v-if="subtitle"
        class="mb-1.5 text-center text-sm font-semibold text-forest-green"
      >
        {{ subtitle }}
      </h3>
      <h1 :class="textStyle({ size })">
        {{ sectionTitle }}
      </h1>
    </slot>
    <slot name="after-title"></slot>
    <slot />
  </section>
</template>
