<script setup lang="ts">
import { FloatLabel } from 'primevue'
import Select from 'primevue/select'
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'

type Option = {
  label: string
  value: string
}

const availableOptions = defineModel<Option[]>('availableOptions')

const selectedOption = defineModel<string>('selectedOption')

const dropdown = tv({
  base: 'flex justify-between items-center !rounded-none',
  variants: {
    theme: {
      light: {
        root: 'border-b-2 border-disabled has-[:focus]:border-primary bg-white px-0',
        overlay:
          'bg-white border !mt-0 border-disabled bg-red-300 rounded-b-8 shadow-[0_3px_4px_0px_#05141F26] overflow-auto',
        label: {
          base: 'text-base px-0 text-primary line-clamp-1',
          empty: '',
          filled: '',
        },
        option: 'cursor-pointer',
      },
      default: {
        root: 'border border-disabled px-4 bg-white',
        overlay:
          'bg-white border !mt-0 border-disabled rounded-b-8 shadow-[0_3px_4px_0px_#05141F26] overflow-auto',
        label: {
          base: 'text-base focus:outline-none line-clamp-1',
          empty: 'text-caption',
          filled: 'text-primary',
        },
        option: 'cursor-pointer',
      },
    },

    size: {
      default: {
        label: '!p-0',
        root: 'py-3 2xl:py-4.5',
        overlay: 'py-4 px-3',
        option: 'py-2.5 pl-7',
      },
      large: {
        label: '!p-0',
        root: 'py-4.5',
        overlay: 'py-4 px-3',
        option: 'py-2.5 pl-7',
      },
    },
  },
})

type DropdownProps = VariantProps<typeof dropdown>

withDefaults(
  defineProps<{
    optionLabel?: string
    optionValue?: string
    placeholder?: string
    inputId?: string
    size?: DropdownProps['size']
    theme?: DropdownProps['theme']
  }>(),
  {
    inputId: '',
    theme: 'default',
    size: 'default',
    optionLabel: 'label',
    optionValue: 'value',
    placeholder: '',
  },
)
</script>

<template>
  <FloatLabel variant="in" :class="'theme-' + theme">
    <Select
      unstyled
      v-model="selectedOption"
      :options="availableOptions"
      :option-label="optionLabel"
      :option-value="optionValue"
      :input-id="inputId"
      class="w-full"
      :pt="{
        list: '!p-0',
        optionLabel: 'w-[240px] text-balance md:w-auto block',
        dropdown: (props) => {
          return {
            class: [
              'transition-all !w-4 !h-4',
              {
                // @ts-ignore
                'rotate-180': props.state.clicked,
              },
            ],
          }
        },
        label: ({ props }) => {
          return {
            class: [
              dropdown.variants.theme[theme].label.base,
              dropdown.variants.size[size].label,
              {
                [dropdown.variants.theme[theme].label.empty]: !props.modelValue,
                [dropdown.variants.theme[theme].label.filled]: props.modelValue,
                'p-inputwrapper-filled p-select-label': props.modelValue,
              },
            ],
          }
        },
        option: {
          class: [
            dropdown.variants.theme[theme].option,
            dropdown.variants.size[size].option,
          ],
        },
        root: {
          class: [
            dropdown.base,
            dropdown.variants.theme[theme].root,
            dropdown.variants.size[size].root,
          ],
        },

        overlay: {
          class: [
            dropdown.variants.theme[theme].overlay,
            dropdown.variants.size[size].overlay,
          ],
        },
      }"
    />
    <label :for="inputId">{{ placeholder }}</label>
  </FloatLabel>
</template>
<style>
.theme-light.p-floatlabel.p-floatlabel-in label {
  @apply left-0;
}

.p-floatlabel .p-select-label {
  @apply translate-y-2;
}

.p-select-option.p-select-option-selected:not(:hover),
.p-select-option.p-select-option-selected.p-focus:not(:hover) {
  @apply bg-[color:inherit] text-inherit;
}
</style>
