<script setup lang="ts">
import type { ModelLandingPage } from '~/server/api/models/[id]/index.get';

const sharedPageData = useSharedPageData<ModelLandingPage | undefined>()
const route = useRoute()
const { locale } = useI18n()
const { data: pageData } = await useFetch(`/api/models/${route.params.id}`, { query: { lang: locale.value } })

sharedPageData.value = pageData.value;

watch(locale, async () => {
  const { data: pageData } = await useFetch(`/api/models/${route.params.id}`, { query: { lang: locale.value } })
  sharedPageData.value = pageData.value
})
</script>

<template>
  <div>
    <OrganismHeader />
    <OrganismModelBar />
    <NuxtPage />
    <OrganismFooter />
  </div>
</template>
