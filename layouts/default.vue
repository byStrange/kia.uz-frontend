<script setup lang="ts">
const { locale } = useI18n()
const { insertSpecialOffer } = useHeaderService()
const { data: pageData } = useAsyncData(() => {
  const data = useFetchApi<SpecialOffer[]>('/special-offers/?is_pinned=true', locale.value);
  return data
})

onMounted(() => {
  console.log(pageData.value)
})

if (pageData.value?.length) {
  insertSpecialOffer(pageData.value[0])
}
</script>
<template>
  <div>

    <OrganismHeader />

    <NuxtPage />

    <OrganismFooter />
  </div>
</template>
