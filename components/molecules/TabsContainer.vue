<script setup lang="ts" generic="T">
const { bounding } = useContainer()
const props = withDefaults(
  defineProps<{
    defaultTab?: number
    isContentFull?: boolean
    isHeaderFull?: boolean
    isHeaderCenter?: boolean
    headerKey?: keyof T
    contentContainerClass?: string
    headerContainerClass?: string
    tabs: T[]
    headerClass?: string
    cache?: boolean
    animated?: boolean
    // New prop to define dynamic slot mapping
    slotKey?: keyof T
  }>(),
  {
    animated: true,
    cache: false,
    headerKey: undefined,
    contentContainerClass: undefined,
    headerClass: undefined,
    headerContainerClass: undefined,
    defaultTab: 0,
    isContentFull: false,
    isHeaderCenter: true,
    isHeaderFull: false,
    slotKey: undefined,
  },
)

const changeTab = (tabIndex: number) => {
  if (tabIndex === activeTab.value) return
  if (tabIndex < 0 || tabIndex >= props.tabs.length) return
  activeTab.value = tabIndex
  emit('tab-change', tabIndex)
}

const activeTab = useSessionStorage('activeTab' + Math.random(), () => props.defaultTab)
const emit = defineEmits<{
  (e: 'tab-change', tabIndex: number): void
}>()

const getActiveTab = computed(() => props.tabs[activeTab.value])
const getActiveTabIndex = computed(() => activeTab.value)

defineExpose({
  changeTab,
  activeTab: getActiveTab,
  activeTabIndex: getActiveTabIndex,
})

// New function to dynamically resolve slot name
const resolveSlotName = (tab: T, index: number) => {
  // If slotKey is provided, use its value as the slot name
  if (props.slotKey && tab[props.slotKey]) {
    return String(tab[props.slotKey])
  }

  // Fallback to index-based slot naming
  return String(index + 1)
}
</script>

<template>
  <div class="relative">
    <div :class="[{ container: !props.isHeaderFull }, headerContainerClass]">
      <div
class="flex gap-8 border-b overflow-x-auto pb-[1px]" :class="[{ 'justify-center': props.isHeaderCenter }, props.headerClass]" :style="{
        '--padding-left': bounding.x.value + 'px',
        padding: props.isHeaderFull ? '0 var(--padding-left)' : '',
      }">
        <template v-for="(tab, index) in tabs" :key="tab">
          <slot name="tab-button" :tab="{ tab: tab, isActive: index === activeTab }">
            <button
class="relative pb-5 font-semibold text-primary text-opacity-60 transition-colors" :class="{
              '!text-opacity-100': index === activeTab,
            }" @click="(event) => {
              const element = event.currentTarget as HTMLElement
              const parentElement = element.parentElement!;
              parentElement.scroll({ left: element.offsetLeft - bounding.x.value, behavior: 'smooth' });
              changeTab(index)
            }">
              {{ headerKey ? tab[headerKey] : tab }}
              <span
:class="{
                'scale-x-100': index === activeTab,
              }"
                class="absolute -bottom-[1px] left-0 h-0.5 w-full scale-x-0 bg-primary transition-transform duration-300" />
            </button>
          </slot>
        </template>
        <slot name="tab-button-right" :tab="{ tab: tabs[activeTab], activeTab }" />
      </div>
    </div>
    <div v-if="tabs" :class="[{ container: !props.isContentFull }, contentContainerClass]" class="mt-4">
      <slot name="tab" v-bind="{ activeTab, changeTab, tab: tabs[activeTab] }"></slot>
      <div v-if="cache">
        <div
v-for="(tab, index) in tabs" :key="index" :class="{
          'transition-all duration-500': animated,
          'invisible absolute -z-10': index !== activeTab,
          'opacity-0 -translate-y-4 ': animated && index !== activeTab,
        }">
          <slot :name="resolveSlotName(tab, index)" v-bind="{ activeTab, changeTab, tab }" fallback>
          </slot>
        </div>
      </div>
      <div v-else>
        <Transition name="slide-fade" mode="out-in">
          <slot
:key="activeTab" :name="resolveSlotName(tabs[activeTab], activeTab)"
            v-bind="{ activeTab, changeTab, tab: tabs[activeTab] }" fallback>
          </slot>
        </Transition>
      </div>
    </div>
    <slot name="default" />
  </div>
</template>
