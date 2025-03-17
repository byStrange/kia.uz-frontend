<script setup lang="ts" generic="T">
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
  label: string | any
  content: T
  icon?: Component | null
}

interface Props {
  items: AccordionItem[]
  classes?: Partial<AccordionClasses>
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false,
})

const currentAccordionIndex = ref(props.defaultOpen ? 0 : -1)

const toggle = (index: number, e: Event) => {
  currentAccordionIndex.value =
    currentAccordionIndex.value === index ? -1 : index
  const bound = e.currentTarget as HTMLElement
  setTimeout(() => {
    if (currentAccordionIndex.value !== -1)
      window.scrollTo({
        top: bound.getBoundingClientRect().top + window.scrollY - 200,
        behavior: 'smooth',
      })
  }, 700)
}
</script>
<template>
  <div
    ref="container"
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
          :toggle="(e: Event) => toggle(index, e)"
        >
          <div>
            {{ item.label }}
            <button @click="currentAccordionIndex = index">
              <slot name="expandicon">
                <UITickToBottom
                  :class="[
                    'text-white transition-transform',
                    { 'rotate-180': index === currentAccordionIndex },
                  ]"
                />
              </slot>
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
          <slot name="content" :content="item.content">
            <p :class="classes?.content">{{ item.content }}</p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
