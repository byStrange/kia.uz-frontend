<script setup lang="ts">
import type { SearchResultItem } from '~/server/api/search.post';

const searchBarOpen = defineModel('show');
const searchTerm = ref('')
const localePath = useLocalePath()
const results = ref<SearchResultItem[]>([])
const showResultMenu = ref(true)
const router = useRouter()

const sharedPageData = useSharedPageData()

const makeRoute = (item: SearchResultItem): string => {
  switch (item.result_type) {
    case 'model':
      return `/models/${item.slug}`
    case 'news':
      return `/news/${item.slug}`
    case 'special_offer':
      return `/special-offers/${item.slug}`
  }
}

const handleResultItemClick = (item: SearchResultItem) => {
  sharedPageData.value = null;
  router.push(localePath(makeRoute(item)))
  showResultMenu.value = false;
}

watch(searchTerm, async () => {
  showResultMenu.value = true;
  const res = await $fetch('/api/search', { method: 'post', body: JSON.stringify({ term: searchTerm.value }) })
  if (Array.isArray(res)) {
    results.value = res;
  }
})
</script>
<template>
  <div class="relative">
    <div class="flex w-full p-4 bg-white md:justify-center">
      <button class="hidden md:flex items-center justify-center size-12 md:size-15">
        <UILenseIcon class="size-5 text-primary" />
      </button>
      <AtomInput
v-model="searchTerm" label="search" theme="light" size="large" input-id="searhInput"
        class="flex-1 max-w-[616px]" border="full" />
      <AtomButton label="Search" color="primary" type="submit" class="!text-white" />
      <button class="flex items-center justify-center size-12 md:size-15" @click="searchBarOpen = false">
        <UICloseIcon class="size-5 text-primary" />
      </button>
    </div>
    <Transition name="blur-fade">
      <div
v-if="results.length && showResultMenu"
        class="absolute h-[calc(100dvh-var(--header-height))] bg-white w-full max-w-7.5h 2xl:h-fit 2xl:left-1/2 2xl:-translate-x-1/2 2xl:rounded-b-8 2xl:px-3 2xl:py-4 2xl:border-disabled 2xl:border 2xl:top-full 2xl:-translate-y-4">
        <ul class="px-4 w-full mx-auto md:px-0 2xl:pl-7">
          <li
v-for="item in results" :key="item.id" class="py-2.5 text-base cursor-pointer"
            @click="handleResultItemClick(item)">
            {{ item.title }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
