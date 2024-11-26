<script setup lang="ts">
const { headerService } = useHeaderService()
defineProps<{ item: HeaderItem }>()

const commonClasses =
  'menu-item py-4.5 text-lg font-semibold text-primary block w-full text-start'
</script>

<template>
  <button
    v-if="item.children?.length"
    :class="commonClasses"
    @click="() => (headerService.extendedMenu = item)"
  >
    <div class="container flex items-center justify-between">
      {{ item.label }}
      <UITickToRight />
    </div>
  </button>
  <NuxtLinkLocale v-else :class="commonClasses" :to="item.to">
    <span class="container block">{{item.label}}</span>
  </NuxtLinkLocale>
</template>
