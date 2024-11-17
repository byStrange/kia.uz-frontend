<script setup lang="ts">
const { bounding } = useContainer()

const props = withDefaults(
  defineProps<{
    defaultTab?: number
    isContentFull?: boolean
    isHeaderFull?: boolean
    isHeaderCenter?: boolean
    headerKey?: string
    contentContainerClass?: string
    tabs: string[] | any[]
    headerClass?: string
  }>(),
  {
    defaultTab: 0,
    isContentFull: false,
    isHeaderCenter: true,
    isHeaderFull: false,
  },
)

const changeTab = (tabIndex: number) => {
  if (tabIndex === activeTab.value) return
  if (tabIndex < 0 || tabIndex >= props.tabs.length) return

  activeTab.value = tabIndex
  emit('tab-change', tabIndex)
}

const activeTab = ref(props.defaultTab)

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
</script>
<template>
  <div class="relative">
    <div :class="{ container: !props.isHeaderFull }">
      <div
        class="flex gap-8 border-b"
        :class="[{ 'justify-center': props.isHeaderCenter }, props.headerClass]"
        :style="{
          padding: props.isHeaderFull ? '0 ' + bounding.x.value + 'px' : '',
        }"
      >
        <template v-for="(tab, index) in tabs">
          <slot
            name="tab-button"
            :tab="{ tab: tab, isActive: index === activeTab }"
          >
            <button
              class="relative pb-5 font-semibold text-primary text-opacity-60 transition-colors"
              :class="{
                '!text-opacity-100': index === activeTab,
              }"
              @click="changeTab(index)"
            >
              {{ headerKey ? tab[headerKey as any] : tab }}
              <span
                :class="{
                  'scale-x-100': index === activeTab,
                }"
                class="absolute -bottom-[1px] left-0 h-0.5 w-full scale-x-0 bg-primary transition-transform duration-300"
              ></span>
            </button>
          </slot>
        </template>
      </div>
    </div>

    <div
      v-if="tabs"
      :class="[{ container: !props.isContentFull }, contentContainerClass]"
      class="mt-4"
    >
      <div>
        <Transition name="slide-fade" mode="out-in">
          <slot
            :name="activeTab + 1"
            :key="activeTab"
            v-bind="{ activeTab, changeTab, tab: tabs[activeTab] }"
          ></slot>
        </Transition>
      </div>
    </div>

    <slot name="default"></slot>
  </div>
</template>
