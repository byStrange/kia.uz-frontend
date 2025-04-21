<script setup lang="ts">
const { headerService } = useHeaderService()
</script>
<template>
  <div
class="flex justify-center bg-primary py-4.5 fixed top-0 w-full transition-all z-20 duration-300" :class="{
    '!top-[--header-height]': headerService.isHeaderFixed,
    '!z-30': headerService.isMenuOpen,
  }">
    <div class="flex gap-x-7.5">
      <a href="#manifest" class="text-white text-base+">{{ $t('branding.manifest') }}</a>
      <a href="#logo" class="text-white text-base+">{{ $t('branding.logo') }}</a>
      <a href="#philosophy" class="text-white text-base+">{{ $t('branding.philosophy') }}</a>
      <a href="#insipiration" class="text-white text-base+">{{ $t('branding.insipiration') }}</a>
      <a href="#values" class="text-white text-base+">{{ $t('branding.values') }}</a>
      <a href="#target" class="text-white text-base+">{{ $t('branding.target') }}</a>
    </div>
  </div>
</template>
