<script setup lang="ts">
import Select from 'primevue/select'

type Option = {
  label: string
  value: string
}

const availableOptions = defineModel<Option[]>('availableOptions')

const selectedOption = defineModel<Option | null | Option[]>('selectedOption')

withDefaults(
  defineProps<{
    optionLabel?: string
    optionValue?: string
  }>(),
  {
    optionLabel: 'label',
    optionValue: 'value',
  },
)
</script>

<template>
  <Select
    v-model="selectedOption"
    :options="availableOptions"
    :optionLabel="optionLabel"
    :optionValue="optionValue"
    placeholder="Выберите модель"
    class="w-full"
    unstyled
    :pt="{
      dropdown: (props) => {
        return {
          class: [
            'transition-all w-4 h-4',
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
            'text-base focus:outline-none',
            {
              'text-caption': !props.modelValue,
              'text-primary': props.modelValue,
            },
          ],
        }
      },
      option: 'py-2 pl-7 cursor-pointer',
      root: 'flex has-[:focus]:border-primary justify-between items-center border border-disabled px-4 py-3 hover:border-caption',
      overlay:
        '!mt-0 bg-white overflow-auto py-4 px-3 rounded-b-8 border border-t-0 border-disabled shadow-[0_3px_4px_0px_#05141F26]',
    }"
  />
</template>
