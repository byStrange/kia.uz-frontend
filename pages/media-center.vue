<script setup lang="ts">
import { Dialog } from 'primevue'
const options = ref([{ label: 'model', value: 'model' }])
const selectedOption = ref()

const { safe } = useSafeAccessMedia()
const { data } = await useFetch('/api/media-center')
const router = useRouter()
const locale = useLocalePath()
const showModal = ref(false)
const selectedNews = ref<null | News>(null)

const handleCardClick = (item: News) => {
  if (item.video_url) {
    showModal.value = true;
    selectedNews.value = item
  }
  else {
    router.push(locale(`/news/${item.slug}`))
  }
}

useSeoMeta({
  title: () => data.value?.seo.title || '',
  ogTitle: () => data.value?.seo.title || '',
  description: () => data.value?.seo.description || '',
  ogDescription: () => data.value?.seo.description || '',
  keywords: () => data.value?.seo.keywords || '',
})

console.log(data)

definePageMeta({
  lockHover: true,
})
</script>
<template>
  <UISafeAreaView>
    <Dialog
v-model:visible="showModal" :dismissable-mask="true" modal class="relative overflow-hidden border-none"
      pt:root:class="!border-0">
      <template #container="{ closeCallback }">
        <div class="absolute -right-6 -top-6">
          <button type="button" @click="closeCallback">
            <UIXIcon />
          </button>
        </div>
        <iframe
:src="selectedNews?.video_url" width="1000" height="600" allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          frameborder="0" />
      </template>
    </Dialog>
    <div class="container pt-7.5 2xl:pt-6">
      <h1 class="text-2xl font-semibold text-primary md:text-5xl 2xl:mt-10">{{ $t('common.media_center')}}</h1>

      <div class="mt-7.5">
        <MoleculeTabsContainer
ref="tabsContainer" :tabs="Object.values(data?.groupedNews || {})"
          header-key="categoryName" header-container-class="w-fit mx-0 !px-0"
          content-container-class="!px-0 mx-0 !max-w-none !mt-10">
          <template #tab-button-right="{ tab }">
            <Transition name="slide-fade">
              <div v-if="tab.activeTab === 1" class="w-4h 2xl:absolute top-0 right-0 hidden 2xl:flex">
                <AtomDropdownInput
v-model:available-options="options" v-model:selected-option="selectedOption"
                  placeholder="Выберите модель" class="w-full" />
              </div>
            </Transition>
          </template>
          <template #tab="{ tab }">
            <div>
              <div
                class="space-y-7.5 pb-11 md:grid md:grid-cols-2 md:space-y-0 md:gap-7.5 md:place-content-center 2xl:grid-cols-4">
                <button v-for="item in tab.items" :key="item.title" class="inline-block" @click="handleCardClick(item)">
                  <div class="w-full max-w-[420px] mx-auto">
                    <div class="mx-auto h-full bg-background">
                      <div class="relative flex w-full items-center justify-center">
                        <img :src="safe(item.desktop_image)" class="h-[190px] w-full object-cover" />
                        <UIPlayIcon2 v-if="item.video_url" class="absolute" />
                      </div>
                      <div class="p-4">
                        <div class="text-left">
                          <h2 class="text-sm font-semibold md:text-base 2xl:pb-8">
                            {{ item.title }}
                          </h2>
                          <p class="mt-4 text-base+ text-caption md:mt-7.5">
                            {{ $d(new Date(item.created_at)) }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </template>
        </MoleculeTabsContainer>
      </div>
    </div>
  </UISafeAreaView>
</template>
