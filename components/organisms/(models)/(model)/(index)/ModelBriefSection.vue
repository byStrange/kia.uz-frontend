<script setup lang="ts">
function is(type: ModelBlock['type'], section: ModelBlock) {
  return type === section.type
}

defineProps<{ blocks: ModelBlock[] }>()
</script>
<template>
  <template v-for="section in blocks">
    <OrganismModelUIDoubleSlides v-if="is('doubleSlide', section)" :key="section.title" :section />
    <OrganismModelUITriple v-if="is('triple', section)" :key="section.title" :section />
  </template>
</template>
