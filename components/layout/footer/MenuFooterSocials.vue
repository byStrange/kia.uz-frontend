<script setup lang="ts">
const { headerService } = useHeaderService()
</script>
<template>
  <div class="mt-12 space-y-2.5">
    <h3 class="text-sm+ text-disabled">{{ $t('menu.kia_in_social_networks') }}</h3>
    <div class="flex gap-2">
      <a v-for="item in headerService.socials" :key="item.link" :href="item.link" target="_blank" class="text-white"
        :aria-label="item?.name">
        <component :is="item.icon" class="size-7.5 text-white" />
      </a>
    </div>
  </div>
</template>
