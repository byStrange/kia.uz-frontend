<template>
  <div class="absolute w-full h-full left-0 top-0" :class="[gradientOptions.class]"
    :style="[gradientOptions.style, { zIndex: layer }]">

  </div>
</template>

<script setup lang="ts">
type ResponsiveGradient = {
  default?: string;
  md?: string;
  '2xl': string;
}

type GradientProp = 'string' | ResponsiveGradient

interface Props {
  gradient: GradientProp
  layer?: number
}

const props = defineProps<Props>()

const gradientOptions = computed(() => {
  let defaults = {
    '--gradient': '',
    '--gradient-md': '',
    '--gradient-2xl': ''
  }

  if (typeof props.gradient === 'string') {
    return {
      style: Object.assign(defaults, { '--gradient': props.gradient }),
      class: 'bg-[image:--gradient]'
    }
  }

  defaults['--gradient'] = props.gradient.default || ''
  defaults['--gradient-md'] = props.gradient.md || ''
  defaults['--gradient-2xl'] = props.gradient['2xl'] || ''

  return {
    style: defaults,
    class: 'bg-[image:--gradient] md:bg-[image:--gradient-md] 2xl:bg-[image:--gradient-2xl]'
  }
})
</script>
