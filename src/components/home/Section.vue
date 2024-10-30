<script setup lang="ts">
defineProps<{ sectionTitle: string }>();
</script>
<template>
  <section class="py-12 md:py-15">
    <slot name="title" v-bind="{ sectionTitle }">
      <h1
        class="text-center text-2xl text-semantic-primary font-semibold mb-4 md:mb-8 md:text-4xl 2xl:text-5xl"
      >
        {{ sectionTitle }}
      </h1>
    </slot>
    <slot />
  </section>
</template>
