<script setup lang="ts">
const defaultHeaderHeight = ref(0)

onMounted(() => {
  const headerHeight = useCssVar('--header-height')
  if (headerHeight.value) {
    defaultHeaderHeight.value = parseInt(headerHeight.value)
  }
})

const props = defineProps<{ extra?: number }>()

const paddingTop = computed(() => {
  return `${defaultHeaderHeight.value + (props.extra || 0)}px`
})
</script>
<template>
  <div class="h-full" :style="{ paddingTop: paddingTop }">
    <slot :top="paddingTop" />
  </div>
</template>
