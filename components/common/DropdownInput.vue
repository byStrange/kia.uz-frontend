<script setup lang="ts">
import { IftaLabel } from 'primevue'
import Select from 'primevue/select'

type Option = {
  label: string
  value: string
}

const availableOptions = defineModel<Option[]>('availableOptions')

const selectedOption = defineModel<string>('selectedOption')

withDefaults(
  defineProps<{
    optionLabel?: string
    optionValue?: string
    placeholder?: string
    inputId?: string
    hasBorder?: boolean
    overlayClass?: string
    optionClass?: string
    rootClass?: string
    ifta?: boolean
  }>(),
  {
    inputId: '',
    optionClass: 'py-2 pl-7 cursor-pointer',
    hasBorder: true,
    rootClass: 'flex justify-between items-center px-4 py-3',
    overlayClass:
      '!mt-0 bg-white overflow-auto py-4 px-3 rounded-b-8 shadow-[0_3px_4px_0px_#05141F26]',
    ifta: false,
    optionLabel: 'label',
    optionValue: 'value',
    placeholder: '',
  },
)
</script>

<template>
  <template v-if="ifta">
    <IftaLabel>
      <Select
        v-model="selectedOption"
        :options="availableOptions"
        :option-label="optionLabel"
        :option-value="optionValue"
        :input-id="inputId"
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
          option: {
            class: [optionClass],
          },
          root: {
            class: [
              {
                'has-[:focus]:border-primary border border-disabled hover:border-caption':
                  hasBorder,
              },
              rootClass,
            ],
          },

          overlay: {
            class: [
              { 'border border-t-0 border-disabled ': hasBorder },
              overlayClass,
            ],
          },
        }"
      />
      <label :for="inputId">{{ placeholder }}</label>
    </IftaLabel>
  </template>

  <template v-else>
    <Select
      v-model="selectedOption"
      :options="availableOptions"
      :option-label="optionLabel"
      :option-value="optionValue"
      :input-id="inputId"
      :placeholder
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
        option: {
          class: [optionClass],
        },
        root: {
          class: [
            {
              'has-[:focus]:border-primary border border-disabled hover:border-caption':
                hasBorder,
            },
            rootClass,
          ],
        },

        overlay: {
          class: [
            { 'border border-t-0 border-disabled ': hasBorder },
            overlayClass,
          ],
        },
      }"
    />
  </template>
</template>
<style>
.p-iftalabel label {
  left: 0 !important;
}
</style>
