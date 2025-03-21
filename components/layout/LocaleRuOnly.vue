<script setup language="ts">
const { locale } = useI18n()
</script>
<template>
  <template v-if="locale == 'ru'">
    <slot />
  </template>
</template>
