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

type GradientProp = string | ResponsiveGradient

interface Props {
  gradient?: GradientProp
  background?: GradientProp
  layer?: number
}

const props = defineProps<Props>()

const gradientOptions = computed(() => {
  let defaultGradients = {
    '--background': '',
    '--background-md': '',
    '--background-2xl': ''
  }

  if (typeof props.gradient === 'string') {
    return {
      style: Object.assign(defaultGradients, { '--background': props.gradient }),
      class: 'bg-[image:--background]'
    }
  }

  else if (props.gradient) {
    defaultGradients['--background'] = props.gradient.default || ''
    defaultGradients['--background-md'] = props.gradient.md || ''
    defaultGradients['--background-2xl'] = props.gradient['2xl'] || ''

    return {
      style: defaultGradients,
      class: 'bg-[image:--background] md:bg-[image:--background-md] 2xl:bg-[image:--background-2xl]'
    }
  }

  if (!props.background) {
    return { style: {}, class: {} }
  }

  if (typeof props.background === 'string') {
    return {
      style: Object.assign(defaultGradients, { '--background': props.background }),
      class: 'bg-[--background]'
    };
  }
  defaultGradients['--background'] = props.background.default || ''
  defaultGradients['--background-md'] = props.background.md || ''
  defaultGradients['--background-2xl'] = props.background['2xl'] || ''

  return {
    style: defaultGradients,
    class: 'bg-[--background] md:bg-[--background-md] 2xl:bg-[--background-2xl]'
  }
})
</script>
