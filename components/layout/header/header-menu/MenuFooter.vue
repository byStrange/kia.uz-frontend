<script setup lang="ts">
const { headerService } = useHeaderService()
</script>
<template>
  <div
    :class="[
      'border-t border-t-protection border-opacity-60 py-4.5',
      { '2xl:hidden': !headerService.extendedMenu },
    ]"
  >
    <div class="container space-y-7.5">
      <div class="space-y-2.5">
        <h3 class="text-sm+ text-caption">Горячая линия Kia</h3>
        <p class="font-semibold text-primary">
          {{ headerService.phoneLine1 }}
        </p>
      </div>
      <div class="space-y-2.5">
        <h3 class="text-sm+ text-caption">Информационная линия Kia</h3>
        <p class="font-semibold text-primary">
          {{ headerService.phoneLine2 }}
        </p>
      </div>
      <div class="space-y-2.5">
        <h3 class="text-sm+ text-caption">Kia в соцсетях</h3>
        <div class="flex gap-2">
          <a
            v-for="item in headerService.socials"
            :key="item.link"
            :href="item.link"
            target="_blank"
            class="text-primary"
          >
            <component :is="item.icon" class="w-7.5 h-7.5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
