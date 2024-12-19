<script setup lang="ts">
const { paddingTop: pt } = useSafeArea();
const props = defineProps<{ extra?: number }>()

const paddingTop = computed(() => {
  if (props.extra) return (`calc(${pt.value} + ${(props.extra || 0)}px)`);
  return 'var(--header-height)'
})
</script>
<template>
  <div class="h-full" :style="{ paddingTop: paddingTop }">
    <slot :top="paddingTop" />
  </div>
</template>
