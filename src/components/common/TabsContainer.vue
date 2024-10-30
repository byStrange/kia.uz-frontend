<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    defaultTab?: number;
    isContentFull?: boolean;
    isHeaderFull?: boolean;
    tabs: string[];
  }>(),
  {
    defaultTab: 0,
    isContentFull: false,
    isHeaderFull: false,
  }
);

const activeTab = ref(props.defaultTab);

const emit = defineEmits<{
  (e: "tab-change", tab: string): void;
}>();
</script>
<template>
  <div class="relative">
    <div :class="{ container: !props.isHeaderFull }">
      <div class="flex justify-center gap-8 border-b">
        <template v-for="(tab, index) in tabs">
          <slot
            name="tab-button"
            :tab="{ tab: tab, isActive: index === activeTab }"
          >
            <button
              class="pb-5 text-semantic-primary text-opacity-60 relative transition-colors font-semibold"
              :class="{
                '!text-opacity-100': index === activeTab,
              }"
              @click="
                activeTab = index;
                emit('tab-change', tab);
              "
            >
              {{ tab }}
              <span
                :class="{
                  'scale-x-100': index === activeTab,
                }"
                class="absolute scale-x-0 transition-transform left-0 -bottom-[1px] w-full h-0.5 duration-300 bg-semantic-primary"
              ></span>
            </button>
          </slot>
        </template>
      </div>
    </div>

    <div v-if="tabs" :class="{ container: !props.isContentFull }" class="mt-4">
      <div>
        <Transition name="slide-fade" mode="out-in">
          <slot :name="activeTab + 1" :key="activeTab"></slot>
        </Transition>
      </div>
    </div>

    <slot name="default"></slot>
  </div>
</template>
