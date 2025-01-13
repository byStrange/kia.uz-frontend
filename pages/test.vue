<script setup lang="ts">
definePageMeta({
  lockHover: true
})

const imageContainer = ref()


const all = use360View(imageContainer, {
  images: 'https://cdn.kia.uz/exterior/Cerato/B4U/',
  extension: 'png',
  prefix: '',
  totalImages: 72,
  preloadBeforeMount: true,
  sensitivity: 10,
  inertia: 0.2,
})
</script>
<template>
  <UISafeAreaView>
    <UIContainer>
      <section class="min-h-screen" ref="imageContainer">
        <img :src="all.currentSrc.value" :draggable="false" />
      </section>
    </UIContainer>
  </UISafeAreaView>
</template>
