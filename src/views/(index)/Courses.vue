<script setup lang="ts">
import { useCoursesService } from '@/services/coursesService';

import { useContainer } from '@/composables/useContainer';

import SlideView from '@/components/common/SlideView.vue';
import TabsContainer from '@/components/common/TabsContainer.vue';

import Section from '@/components/home/Section.vue';

import TickToRight from '@/components/icons/20x20/TickToRight.vue';
import PlayIcon2 from '@/components/icons/PlayIcon2.vue';
import PlayIcon from '@/components/icons/PlayIcon.vue';

const { bounding } = useContainer();
const { courses } = useCoursesService();
</script>
<template>
  <Section sectionTitle="Будьте в курсе">
    <template #title="{ sectionTitle, sectionTitleClass }">
      <h1 class="container" :class="sectionTitleClass">
        {{ sectionTitle }}
      </h1>
    </template>

    <TabsContainer :tabs="['Видео-обзоры', 'Новости']" :isContentFull="true">
      <template #1>
        <SlideView :data="courses">
          <template #slide="{ item, bounding }">
            <div
              :style="{ padding: `0 ${bounding.x.value}px` }"
              class="h-[408px] md:w-[310px] md:!px-0"
            >
              <div class="mx-auto h-full max-w-[310px] bg-background">
                <div
                  class="relative flex h-[222px] w-full items-center justify-center bg-gray-200"
                >
                  <img
                    :src="item.thumbnail"
                    class="h-full w-full object-cover"
                  />
                  <PlayIcon2 class="absolute" />
                </div>

                <div class="p-7.5">
                  <p class="text-base font-semibold text-primary">
                    {{ item.title }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </SlideView>
      </template>

      <template #2>
        <SlideView :data="courses">
          <template #slide="{ item, bounding }">
            <div
              :style="{ padding: `0 ${bounding.x.value}px` }"
              class="h-[408px] md:w-[310px] md:!px-0"
            >
              <div class="mx-auto h-full max-w-[310px] bg-background">
                <div
                  class="relative flex h-[222px] w-full items-center justify-center bg-gray-200"
                >
                  <img
                    :src="item.thumbnail"
                    class="h-full w-full object-cover"
                  />
                  <PlayIcon2 class="absolute" />
                </div>

                <div class="p-7.5">
                  <p class="text-base font-semibold text-primary">
                    {{ item.title }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </SlideView>
      </template>

      <template #default>
        <button
          class="container mt-4 flex items-center gap-2.5 text-primary md:absolute md:right-0 md:top-0 md:mt-0 md:w-auto md:px-0"
          :style="{ right: bounding.x.value + 'px' }"
        >
          <PlayIcon class="md:hidden" />
          <div class="flex">
            <p class="text-base font-semibold">Все видео-обзоры</p>
            <TickToRight />
          </div>
        </button>
      </template>
    </TabsContainer>
  </Section>
</template>
