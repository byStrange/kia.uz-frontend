<script setup language="ts">
const { locale } = useI18n()
</script>
<template>
  <template v-if="locale == 'uz'">
    <slot />
  </template>
</template>
