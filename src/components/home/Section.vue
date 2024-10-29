<script setup lang="ts">
defineProps<{ sectionTitle: string }>();
</script>
<template>
  <section class="py-12">
    <slot name="title" v-bind="{ sectionTitle }">
      <h1 class="text-center text-2xl text-semantic-primary font-semibold mb-4">
        {{ sectionTitle }}
      </h1>
    </slot>
    <slot />
  </section>
</template>
