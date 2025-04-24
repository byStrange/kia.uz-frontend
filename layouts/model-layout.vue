<script setup lang="ts">
import type { ModelLandingPage } from '~/server/api/models/[id]/index.get';

const sharedPageData = useSharedPageData<ModelLandingPage | undefined>()
const route = useRoute()

const { locale } = useI18n()

if (route.params.id) {
  const { data: pageData } = await useFetch(`/api/models/${route.params.id}`, { query: { lang: locale.value } })

  sharedPageData.value = pageData.value as ModelLandingPage;
}

watch(locale, async () => {
  const { data: pageData } = await useFetch(`/api/models/${route.params.id}`, { query: { lang: locale.value } })
  sharedPageData.value = pageData.value as ModelLandingPage
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
