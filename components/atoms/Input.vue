<script setup lang="ts">
import { InputText, FloatLabel, type InputTextProps } from 'primevue'
import { tv, type VariantProps } from 'tailwind-variants'

const value = defineModel<any>({ default: '' })

const input = tv(
  {
    base: 'w-full 2xl:pt-6 2xl:pb-3 pt-5 pb-1 rounded-none hover:border-disabled focus:border-primary text-base+ text-primary focus:outline-none',

    variants: {
      theme: {
        light: 'border-disabled',
        default: 'border-disabled px-4 bg-white',
      },
      size: {
        large: '', // overally py-4.5
        default: '', // overall py-3
      },
      border: {
        bottom: 'border-b',
        full: 'border px-3'
      }
    },
  },
  {
    responsiveVariants: ['md', '2xl'],
  },
)

type InputProps = VariantProps<typeof input>

withDefaults(
  defineProps<{
    inputId: string
    label: string
    inputProps?: InputTextProps
    theme?: InputProps['theme']
    size?: InputProps['size'],
    border?: InputProps['border']
  }>(),
  {
    theme: 'default',
    size: 'default',
    border: 'bottom',
    inputProps: undefined,
  },
)
</script>
<template>
  <FloatLabel variant="in" :class="'theme-' + theme" :pt="{ root: {} }">
    <InputText
v-bind="inputProps" v-model="value" unstyled :input-id="inputId" :pt="{
      root: (c) => {
        return {
          class: [
            { 'p-filled': c.context.filled },
            {
              'p-invalid !border-kia-live-red !text-kia-live-red':
                c.props.invalid,
            },
            input({ theme, size: { initial: 'default', '2xl': 'large' }, border }),
          ],
        }
      },
    }" />
    <label :for="inputId" class="!text-caption" :class="{ '!left-3': border === 'full' }">{{ label }}</label>
  </FloatLabel>
</template>

<style>
.theme-light.p-floatlabel label {
  @apply left-0;
}
</style>
