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
  if (props.extra) return `${defaultHeaderHeight.value + (props.extra || 0)}px`
  return 'var(--header-height)'
})
</script>
<template>
  <div class="h-full" :style="{ paddingTop: paddingTop }">
    <slot :top="paddingTop" />
  </div>
</template>
