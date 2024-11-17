<script setup lang="ts">
defineProps<{ flex?: boolean }>()
</script>
<template>
  <div class="hidden" :class="{ '2xl:flex': flex, '2xl:block': !flex }">
    <slot></slot>
  </div>
</template>
