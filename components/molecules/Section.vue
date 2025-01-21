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
  sectionTitle?: string
  subtitle?: string
  size?: SectionVariants['size']
  align?: SectionTitleVariants['align']
}>()

const { gsap } = useGsap()
const moleculeSection = useTemplateRef('moleculeSection')

const pageAnimations = {
  default: () => {
    if (!moleculeSection.value) return;

    let title = moleculeSection.value.querySelector('.molecule-section_title')

    if (title) {
      gsap.fromTo(title, {
        opacity: 0,
        yPercent: -40
      }, {
        ease: 'power2.inOut',
        opacity: 1,
        yPercent: 0,
        duration: 1,
        scrollTrigger: {
          trigger: moleculeSection.value,
          start: 'top 80%',
          end: '+=300',
        },
      })
    }


    let subtitle = moleculeSection.value.querySelector('.molecule-section_subtitle')
    if (subtitle) {
      gsap.fromTo(subtitle, {
        opacity: 0,
        yPercent: -40
      }, {
        opacity: 1,
        duration: 1,
        yPercent: 0,
        scrollTrigger: {
          trigger: moleculeSection.value,
          start: 'top 80%',
          end: '+=300',
        },
      })
    }
  }
}

onMounted(() => {
  pageAnimations.default()
})
</script>
<template>
  <section :class="sectionStyle({ size })" class="molecule-section" ref="moleculeSection">
    <slot name="title" v-bind="{
      sectionTitle,
      sectionTitleClass: textStyle({ size, align }),
      subtitle,
      subtitleClass: subtitleStyle({ align }),
    }">
      <h3 v-if="subtitle" :class="subtitleStyle({ align })" class="molecule-section_subtitle">
        {{ subtitle }}
      </h3>
      <h1 v-if="sectionTitle" :class="textStyle({ size, align })" class="molecule-section_title">
        {{ sectionTitle }}
      </h1>
    </slot>
    <slot name="after-title" :align="textStyle.variants.align[align || 'center']" />
    <slot />
  </section>
</template>
