<script setup lang="ts">
import type { ModelLandingPage } from '~/server/api/models/[id]/index.get';

const sharedPageData = useSharedPageData<ModelLandingPage>()
const route = useRoute()
const { data: pageData } = await useFetch(`/api/models/${route.params.id}`)

sharedPageData.value = pageData.value;
</script>

<template>
  <div>
    <OrganismHeader />
    <OrganismModelBar />
    <NuxtPage />
    <OrganismFooter />
  </div>
</template>
