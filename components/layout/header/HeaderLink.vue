<script setup lang="ts">
defineProps<{ item: HeaderItem }>()

const openMenu = inject<(item: HeaderItem) => void>('openMenu')

const { headerService } = useHeaderService()
const route = useRoute()
</script>
<template>
  <button v-if="item.children?.length" class="py-7.5 text-sm+ text-primary link-hover link-hover-dark" :class="{
    hover: headerService.extendedMenu?.label === item.label,
  }" @click="openMenu ? openMenu(item) : void 0">
    {{ item.label }}
  </button>
  <NuxtLinkLocale v-else :to="item.to" :class="{ hover: item.to === route.path }"
    class="py-7.5 text-sm+ text-primary link-hover link-hover-dark">
    {{ item.label }}
  </NuxtLinkLocale>
</template>
