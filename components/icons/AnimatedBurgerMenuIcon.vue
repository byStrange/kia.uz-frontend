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
  @apply h-5 w-5 cursor-pointer;
}
.burger-wrapper .hamburger {
  @apply relative h-full w-full before:left-0 before:top-[3px] after:left-0 after:top-[13px];
  background: transparent;
  transition: background 10ms 300ms ease;
}
.burger-wrapper .hamburger:before,
.burger-wrapper .hamburger:after {
  @apply absolute h-0.5 w-5 bg-white content-[""];
  transition:
    top 200ms 300ms ease,
    transform 500ms 200ms ease,
    color 200ms 300ms ease;
}
.menu-trigger.show ~ .burger-wrapper .hamburger {
  background: transparent;
}

.burger-wrapper.light .hamburger:before,
.burger-wrapper.light .hamburger:after {
  @apply bg-primary;
}

.burger-wrapper.show .hamburger:after,
.burger-wrapper.show .hamburger:before {
  @apply top-2 bg-primary;
  transition:
    top 200ms 100ms ease,
    transform 500ms 300ms ease,
    color 200ms 100ms ease;
}
.burger-wrapper.show .hamburger:before {
  @apply rotate-45;
}
.burger-wrapper.show .hamburger:after {
  @apply -rotate-45;
}
</style>
