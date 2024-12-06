<script setup lang="ts">
interface AccordionClasses {
  root: string
  rootExpanded: string

  panel: string
  panelExpanded: string

  header: string
  headerExpanded: string

  contentContainer: string
  contentContainerExpanded: string

  contentWrapper: string
  contentWrapperExpanded: string

  content: string
}

interface AccordionItem {
  label: string
  content: string
  icon: Component | null
}

interface Props {
  items: AccordionItem[]
  classes?: Partial<AccordionClasses>
}

defineProps<Props>()

const currentAccordionIndex = ref(0)
</script>
<template>
  <div
    :class="[
      classes?.root,
      { [classes?.rootExpanded || '']: currentAccordionIndex > -1 },
    ]"
  >
    <div
      v-for="(item, index) in items"
      :key="item.label"
      :class="[
        classes?.panel,
        { [classes?.panelExpanded || '']: index === currentAccordionIndex },
      ]"
    >
      <div
        :class="[
          classes?.header,
          { [classes?.headerExpanded || '']: index === currentAccordionIndex },
        ]"
      >
        <slot
          name="header"
          :item="item"
          :expanded="index === currentAccordionIndex"
          :open="() => (currentAccordionIndex = index)"
          :toggle="
            () =>
              (currentAccordionIndex =
                currentAccordionIndex === index ? -1 : index)
          "
        >
          <div>
            {{ item.label }}
            <button @click="currentAccordionIndex = index">
              <component v-if="item.icon" :component="item.icon" />
            </button>
          </div>
        </slot>
      </div>
      <div
        :class="[
          classes?.contentContainer,
          'grid grid-rows-[0fr] overflow-hidden transition-all',
          { '!grid-rows-[1fr]': index === currentAccordionIndex },
          {
            [classes?.contentContainerExpanded || '']:
              index === currentAccordionIndex,
          },
        ]"
      >
        <div
          :class="[
            classes?.contentWrapper,
            'invisible flex min-h-0 flex-col space-y-0.5 text-white opacity-0 transition-all',
            { '!visible opacity-100': index === currentAccordionIndex },
            {
              [classes?.contentWrapperExpanded || '']:
                index === currentAccordionIndex,
            },
          ]"
        >
          <slot name="content">
            <p :class="classes?.content">{{ item.content }}</p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
