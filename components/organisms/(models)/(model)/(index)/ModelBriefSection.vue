<script setup lang="ts">
const { sections } = useStore()

function is(type: 'triple' | 'double', section: any) {
  return type === section.type
}
</script>
<template>
  <template v-for="section in sections">
    <OrganismModelUIDoubleTab v-if="is('double', section) && section?.meta?.tabs" :section />
    <OrganismModelUIDoubleSlides v-if="is('double', section) && section?.meta?.slides" :section />
    <OrganismModelUITriple v-if="is('triple', section)" :section />
  </template>
</template>
