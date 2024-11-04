<script setup lang="ts">
import { computed, ref } from 'vue';

const defaultHeader = ref(65);

const props = defineProps<{ extra?: number }>();

const paddingTop = computed(() => {
  return `${defaultHeader.value + (props.extra || 0)}px`;
});
</script>
<template>
  <div :style="{ paddingTop: paddingTop }">
    <slot :top="paddingTop"></slot>
  </div>
</template>
