<script setup lang="ts">
const defaultHeader = ref(80)

const props = defineProps<{ extra?: number }>()

const paddingTop = computed(() => {
  return `${defaultHeader.value + (props.extra || 0)}px`
})
</script>
<template>
  <div :style="{ paddingTop: paddingTop }" class="h-full">
    <slot :top="paddingTop" />
  </div>
</template>
