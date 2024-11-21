<script setup lang="ts">
defineProps<{ item: HeaderItem }>()

const openMenu = inject<(item: HeaderItem) => void>('openMenu')

const { headerService } = useHeaderService()
</script>
<template>
  <button
    v-if="item.children?.length"
    class="py-7.5 text-sm+ text-primary link-hover link-hover-dark"
    @click="openMenu ? openMenu(item) : void 0"
    :class="{
      hover: headerService.extendedMenu?.label === item.label,
    }"
  >
    {{ item.label }}
  </button>
  <NuxtLink
    v-else
    :to="item.to"
    class="py-7.5 text-sm+ text-primary link-hover link-hover-dark"
  >
    {{ item.label }}
  </NuxtLink>
</template>
