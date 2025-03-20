<script setup lang="ts">
defineProps<{ item: HeaderItem }>()

const openMenu = inject<(item: HeaderItem) => void>('openMenu')

const { headerService } = useHeaderService()
const { t } = useI18n()
const route = useRoute()
</script>
<template>
  <button v-if="item.children?.length" class="py-7.5 text-sm+ text-primary link-hover link-hover-dark" :class="{
    hover: headerService.extendedMenu?.label === item.label,
  }" @click="openMenu ? openMenu(item) : void 0">
    {{ t(item.label) }}
  </button>
  <NuxtLinkLocale v-else :to="item.to" :class="{ hover: item.to === route.path }"
    class="py-7.5 text-sm+ text-primary link-hover link-hover-dark">
    {{ t(item.label) }}
  </NuxtLinkLocale>
</template>
