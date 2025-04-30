<script setup lang="ts">
import type { SearchResultItem } from '~/server/api/search.post';

const searchBarOpen = defineModel('show');
const searchTerm = useState('searchTerm')
const localePath = useLocalePath()
const results = ref<SearchResultItem[]>([])
const showResultMenu = ref(true)
const searchInput = useTemplateRef('searchInput')
const router = useRouter()

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
  router.push(localePath(makeRoute(item)))
  showResultMenu.value = false;
}

const handleSearchClose = () => {
  searchBarOpen.value = false
  searchTerm.value = "";
}

const highlight = (text: string, term: string) => {
  if (!text || !term) return text;
  const regex = new RegExp(`(${term})`, 'gi');
  text = text.replace(/<img[^>]*>|<br\s*\/?>|<hr\s*\/?>/gi, '');
  return `${text.replace(regex, '<mark>$1</mark>')}...`; // Wrap matches in <mark> (yellow highlight)
};

const fetchResult = async () => {
  showResultMenu.value = true;
  const res = await $fetch('/api/search', { method: 'post', body: JSON.stringify({ term: searchTerm.value }) })
  if (Array.isArray(res)) {
    results.value = res;
  }
}

watch(searchTerm, async () => {
  await fetchResult()
})

onMounted(() => {
  if (searchTerm) {
    fetchResult()
  }

  if (searchInput.value) {
    searchInput.value.$el.querySelector('input').focus()
  }
})
</script>
<template>
  <div class="relative">
    <div class="flex w-full p-4 bg-white md:justify-center">
      <button class="hidden md:flex items-center justify-center size-12 md:size-15">
        <UILenseIcon class="size-5 text-primary" />
      </button>
      <AtomInput ref="searchInput" v-model="searchTerm"
        :input-props="{ class: 'md:pt-6 md:pb-3', onBlur: () => showResultMenu = false, onFocus: () => showResultMenu = true }"
        :label="$t('common.search')" theme="light" size="large" input-id="searhInput" class="flex-1 max-w-[616px]"
        border="full" />
      <AtomButton :label="$t('common.search')" color="primary" type="submit" class="!text-white" />
      <button class="flex items-center justify-center size-12 md:size-15" @click="handleSearchClose">
        <UICloseIcon class="size-5 text-primary" />
      </button>
    </div>
    <Transition name="blur-fade">
      <div v-if="results.length && showResultMenu" data-lenis-prevent
        class="absolute h-[calc(100dvh-var(--header-height))] bg-white w-full max-w-7.5h 2xl:h-fit md:max-h-5.5h overflow-y-auto overscroll-contain md:left-1/2 md:-translate-x-1/2 md:rounded-b-8 md:px-3 md:py-4 md:border-disabled md:border 2xl:top-full md:-translate-y-4">
        <ul class="px-4 w-full mx-auto md:px-0 md:pl-7">
          <li v-for="item in results" :key="item.id" class="py-2.5 text-base cursor-pointer"
            @click="handleResultItemClick(item)">
            <span>{{ item.title }}</span>
            <p v-if="item.preview" class="text-xs md:text-sm text-disabled mt-1.5"
              v-html="highlight(item.preview, searchTerm)"></p>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
