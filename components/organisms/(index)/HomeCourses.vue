<script setup lang="ts">
import { Dialog } from 'primevue'

const { bounding } = useContainer()
const selectedNews = ref<null | News>(null)
const router = useRouter()
const locale = useLocalePath()
const showModal = ref(false)

const handleCardClick = (item: News) => {
  if (item.video_url) {
    showModal.value = true;
    selectedNews.value = item
  }
  else {
    router.push(locale(`/news/${item.slug}`))
  }
}

defineProps<{ news: GroupedNews }>()
</script>
<template>
  <Dialog v-model:visible="showModal" :dismissable-mask="true" modal class="relative overflow-hidden border-none"
    pt:root:class="!border-0">
    <template #container="{ closeCallback }">
      <div class="absolute -right-6 -top-6">
        <button type="button" @click="closeCallback">
          <UIXIcon />
        </button>
      </div>
      <iframe :src="selectedNews?.video_url" width="1000" height="600" allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        frameborder="0" />
    </template>
  </Dialog>

  <MoleculeSection :section-title="$t('index.be_notified')">
    <template #title="{ sectionTitle, sectionTitleClass }">
      <h1 class="container" :class="sectionTitleClass">
        {{ sectionTitle }}
      </h1>
    </template>

    <MoleculeTabsContainer :tabs="sortArrayOfObjectsByOrder(Object.values(news))" header-key="categoryName"
      :is-content-full="true">
      <template #tab="{ tab }">
        <ElementSlideView :data="tab.items.slice(0, 8)">
          <template #slide="{ item }">
            <button :aria-label="item.title" @click="handleCardClick(item)">
              <div :style="{ '--padding': `0 ${bounding.x.value}px` }"
                class="h-[408px] p-[--padding] md:w-[310px] md:px-0">
                <div class="mx-auto h-full max-w-[310px] bg-background">
                  <div class="relative flex h-[222px] w-full items-center justify-center bg-gray-200">
                    <MoleculeImage loading="lazy" :base-url="item.desktop_image ? item.desktop_image : item.default_image"
                      class="h-full w-full object-cover" />
                    <UIPlayIcon2 v-if="item.video_url" class="absolute" />
                  </div>

                  <div class="p-4">
                    <p class="text-sm font-semibold text-primary">
                      {{ item.title }}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </template>
        </ElementSlideView>
      </template>

      <template #default>
        <NuxtLinkLocale to="/media-center"
          class="container mt-4 flex items-center gap-2.5 text-primary md:absolute md:right-[--right] md:top-0 md:mt-0 md:w-auto md:px-0"
          :style="{ '--right': bounding.x.value + 'px' }">
          <UIPlayIcon class="md:hidden" />
          <div class="flex">
            <p class="text-base font-semibold">{{ $t('index.all_video_reviews') }}</p>
            <UITickToRight />
          </div>
        </NuxtLinkLocale>
      </template>
    </MoleculeTabsContainer>
  </MoleculeSection>
</template>
