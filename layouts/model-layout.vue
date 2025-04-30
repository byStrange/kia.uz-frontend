<script setup lang="ts">
import type { ModelLandingPage } from '~/server/api/models/[id]/index.get';

const route = useRoute()

const { locale } = useI18n()

async function fetchData() {
  if (route.params.id) {
    const sharedPageData = useSharedPageData<ModelLandingPage | undefined>(route.params.id.toString())
    const { data: pageData } = await useFetch(`/api/models/${route.params.id}`, { query: { lang: locale.value } })

    sharedPageData.value = pageData.value as ModelLandingPage;
  }
}

await fetchData()

watch(locale, async () => {
  await fetchData()
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
