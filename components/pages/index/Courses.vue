<script setup lang="ts">
const { bounding } = useContainer()
const { courses } = useStore()
</script>
<template>
  <UISection sectionTitle="Будьте в курсе">
    <template #title="{ sectionTitle, sectionTitleClass }">
      <h1 class="container" :class="sectionTitleClass">
        {{ sectionTitle }}
      </h1>
    </template>

    <UITabsContainer :tabs="['Видео-обзоры', 'Новости']" :isContentFull="true">
      <template #1>
        <UISlideView :data="courses">
          <template #slide="{ item, bounding }">
            <div
              :style="{ '--padding': `0 ${bounding.x.value}px` }"
              class="h-[408px] p-[--padding] md:w-[310px] md:px-0"
            >
              <div class="mx-auto h-full max-w-[310px] bg-background">
                <div
                  class="relative flex h-[222px] w-full items-center justify-center bg-gray-200"
                >
                  <img
                    :src="item.thumbnail"
                    loading="lazy"
                    class="h-full w-full object-cover"
                  />
                  <UIPlayIcon2 class="absolute" />
                </div>

                <div class="p-7.5">
                  <p class="text-base font-semibold text-primary">
                    {{ item.title }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </UISlideView>
      </template>

      <template #2>
        <UISlideView :data="courses">
          <template #slide="{ item, bounding }">
            <div
              :style="{ '--padding': `0 ${bounding.x.value}px` }"
              class="h-[408px] p-[--padding] md:w-[310px] md:!px-0"
            >
              <div class="mx-auto h-full max-w-[310px] bg-background">
                <div
                  class="relative flex h-[222px] w-full items-center justify-center bg-gray-200"
                >
                  <img
                    :src="item.thumbnail"
                    loading="lazy"
                    class="h-full w-full object-cover"
                  />
                  <UIPlayIcon2 class="absolute" />
                </div>

                <div class="p-7.5">
                  <p class="text-base font-semibold text-primary">
                    {{ item.title }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </UISlideView>
      </template>

      <template #default>
        <button
          class="container mt-4 flex items-center gap-2.5 text-primary md:absolute md:right-[--right] md:top-0 md:mt-0 md:w-auto md:px-0"
          :style="{ '--right': bounding.x.value + 'px' }"
        >
          <UIPlayIcon class="md:hidden" />
          <div class="flex">
            <p class="text-base font-semibold">Все видео-обзоры</p>
            <UITickToRight />
          </div>
        </button>
      </template>
    </UITabsContainer>
  </UISection>
</template>
