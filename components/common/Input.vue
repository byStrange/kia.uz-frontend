<script setup lang="ts">
import { InputText, FloatLabel, type InputTextProps } from 'primevue'
import { tv, type VariantProps } from 'tailwind-variants'

const value = defineModel<any>({ default: '' })

const input = tv(
  {
    base: 'w-full rounded-none hover:border-caption focus:border-primary border-b text-base+ text-primary focus:outline-none',

    variants: {
      theme: {
        light: 'border-protection',
        default: 'border-protection px-4 bg-white',
      },
      size: {
        large: 'pt-6 pb-3', // overally py-4.5
        default: 'pt-5 pb-1', // overall py-3
      },
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
    size?: InputProps['size']
  }>(),
  {
    theme: 'default',
    size: 'default',
    inputProps: undefined,
  },
)
</script>
<template>
  <FloatLabel
    variant="in"
    :class="'theme-' + theme"
    :pt="{ root: { style: '--p-floatlabel-position-x: 16px' } }"
  >
    <InputText
      v-bind="inputProps"
      v-model="value"
      unstyled
      :input-id="inputId"
      :pt="{
        root: (c) => {
          console.log(c.props.invalid)
          return {
            class: [
              { 'p-filled': c.context.filled },
              {
                'p-invalid !border-kia-live-red !text-kia-live-red':
                  c.props.invalid,
              },
              input({ theme, size: { initial: 'default', '2xl': 'large' } }),
            ],
          }
        },
      }"
    />
    <label :for="inputId" class="!text-caption">{{ label }}</label>
  </FloatLabel>
</template>

<style>
.theme-light.p-floatlabel label {
  @apply left-0;
}
</style>
