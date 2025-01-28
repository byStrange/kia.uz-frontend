<script setup lang="ts">
const { headerService } = useHeaderService()
</script>
<template>
  <div
    class="flex justify-center bg-primary py-4.5 fixed top-0 w-full transition-all z-20 duration-300"
    :class="{
      '!top-[--header-height]': headerService.isHeaderFixed,
      '!z-30': headerService.isMenuOpen,
    }"
  >
    <div class="flex gap-x-7.5">
      <button class="text-white text-base+">Манифест</button>
      <button class="text-white text-base+">Логотип</button>
      <button class="text-white text-base+">Философия</button>
      <button class="text-white text-base+">Вдохновение</button>
      <button class="text-white text-base+">Ценности</button>
      <button class="text-white text-base+">Цель</button>
    </div>
  </div>
</template>
