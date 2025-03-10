<script setup lang="ts">
import type { IndexPageNews } from '~/server/api/indexPage.get';

const { bounding } = useContainer()

defineProps<{ news: IndexPageNews[] }>()
</script>
<template>
  <MoleculeSection section-title="Будьте в курсе">
    <template #title="{ sectionTitle, sectionTitleClass }">
      <h1 class="container" :class="sectionTitleClass">
        {{ sectionTitle }}
      </h1>
    </template>

    <MoleculeTabsContainer :tabs="['Видео-обзоры', 'Новости']" :is-content-full="true">
      <template #1>
        <ElementSlideView :data="news.filter((n) => n.type == 'review')">
          <template #slide="{ item }">
            <div
:style="{ '--padding': `0 ${bounding.x.value}px` }"
              class="h-[408px] p-[--padding] md:w-[310px] md:px-0">
              <div class="mx-auto h-full max-w-[310px] bg-background">
                <div class="relative flex h-[222px] w-full items-center justify-center bg-gray-200">
                  <img :src="item.banner_image" loading="lazy" class="h-full w-full object-cover" />
                  <UIPlayIcon2 class="absolute" />
                </div>

                <div class="p-4">
                  <p class="text-sm font-semibold text-primary">
                    {{ item.title }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </ElementSlideView>
      </template>

      <template #2>
        <ElementSlideView :data="news.filter((n) => n.type == 'news')">
          <template #slide="{ item }">
            <div
:style="{ '--padding': `0 ${bounding.x.value}px` }"
              class="h-[408px] p-[--padding] md:w-[310px] md:!px-0">
              <div class="mx-auto h-full max-w-[310px] bg-background">
                <div class="relative flex h-[222px] w-full items-center justify-center bg-gray-200">
                  <img :src="item.banner_image" loading="lazy" class="h-full w-full object-cover" />
                  <UIPlayIcon2 class="absolute" />
                </div>

                <div class="p-4">
                  <p class="text-sm font-semibold text-primary">
                    {{ item.title }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </ElementSlideView>
      </template>

      <template #default>
        <button
          class="container mt-4 flex items-center gap-2.5 text-primary md:absolute md:right-[--right] md:top-0 md:mt-0 md:w-auto md:px-0"
          :style="{ '--right': bounding.x.value + 'px' }">
          <UIPlayIcon class="md:hidden" />
          <div class="flex">
            <p class="text-base font-semibold">Все видео-обзоры</p>
            <UITickToRight />
          </div>
        </button>
      </template>
    </MoleculeTabsContainer>
  </MoleculeSection>
</template>
