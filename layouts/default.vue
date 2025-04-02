<script setup lang="ts">
</script>
<template>
  <div>

    <RenderCacheable>
      <OrganismHeader />
    </RenderCacheable>

    <NuxtPage />

    <RenderCacheable>
      <OrganismFooter />
    </RenderCacheable>
  </div>
</template>
