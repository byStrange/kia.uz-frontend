<script setup lang="ts">
defineProps<{ title: string, subtitle?: string, to: string, image: string }>()
</script>
<template>
  <NuxtLinkLocale :to="to">
    <div class="w-full max-w-[420px] mx-auto">
      <div class="mx-auto h-full bg-background">
        <img :src="image" class="h-[190px] w-full object-cover" loading="lazy" />

        <div class="p-4">
          <div class="text-left">
            <h2 class="text-sm font-semibold">
              {{ title }}
            </h2>
            <p v-if="subtitle" class="mt-1 text-sm text-primary">
              {{ subtitle }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLinkLocale>
</template>
