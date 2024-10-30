<script setup lang="ts">
defineProps<{
  hidden?: boolean;
}>();
</script>
<template>
  <div class="burger-wrapper" :class="{ show: !hidden }">
    <div class="hamburger"></div>
  </div>
</template>

<style scoped>
.burger-wrapper {
  @apply cursor-pointer w-5 h-5;
}
.burger-wrapper .hamburger {
  @apply w-full h-full relative before:top-[3px] after:top-[13px] before:left-0 after:left-0;
  background: transparent;
  transition: background 10ms 300ms ease;
}
.burger-wrapper .hamburger:before,
.burger-wrapper .hamburger:after {
  @apply absolute w-5 h-0.5 content-[""] bg-white;
  transition: top 200ms 300ms ease, transform 500ms 200ms ease,
    color 200ms 300ms ease;
}
.menu-trigger.show ~ .burger-wrapper .hamburger {
  background: transparent;
}

.burger-wrapper.light .hamburger:before,
.burger-wrapper.light .hamburger:after {
  @apply bg-semantic-primary;
}

.burger-wrapper.show .hamburger:after,
.burger-wrapper.show .hamburger:before {
  @apply top-2 bg-semantic-primary;
  transition: top 200ms 100ms ease, transform 500ms 300ms ease,
    color 200ms 100ms ease;
}
.burger-wrapper.show .hamburger:before {
  @apply rotate-45;
}
.burger-wrapper.show .hamburger:after {
  @apply -rotate-45;
}
</style>
