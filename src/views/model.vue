<script setup lang="ts">
import { insertToIndex } from '@/utils';

import { onMounted, onUnmounted, ref } from 'vue';

import { useRoute } from 'vue-router';

import { useCoursesService } from '@/services/coursesService';
import { useHeaderService } from '@/services/headerService';

import { useBreadCrumb } from '@/composables/useBreadCrumb';
import { useContainer } from '@/composables/useContainer';

import SlideView from '@/components/common/SlideView.vue';

import Section from '@/components/home/Section.vue';

import TickToRight from '@/components/icons/20x20/TickToRight.vue';
import PlayIcon2 from '@/components/icons/PlayIcon2.vue';

import Bar from './(model)/Bar.vue';
import ModelHero from './(model)/ModelHero.vue';

const route = useRoute();
const { _breadcrumbsRaw } = useBreadCrumb(route);
const { bounding } = useContainer();

const { headerService } = useHeaderService();

const variants = ref([
  { label: 'Comfort', price_start: 543, engine: 'vv' },
  { label: 'Comfort', price_start: 543, engine: 'vv' },
  { label: 'Comfort', price_start: 543, engine: 'vv' },
]);

onMounted(() => {
  _breadcrumbsRaw.value = insertToIndex(_breadcrumbsRaw.value, 1, {
    name: 'Models',
    path: '/models',
    meta: { breadcrumb: 'Модели' },
  });
  headerService.value.isHeaderFixed = true;
  headerService.value.lockHover = true;
});

onUnmounted(() => {
  headerService.value.lockHover = false;
});

const { courses } = useCoursesService();
</script>
<template>
  <Bar />

  <ModelHero />

  <Section sectionTitle="Специальные предложения">
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
              <img :src="item.thumbnail" class="h-full w-full object-cover" />
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
  </Section>

  <Section
    sectionTitle="Варианты Carnival"
    subtitle="Комплектации"
    class="bg-background"
    size="lg"
  >
    <template #after-title>
      <p class="mt-1 text-center text-[15px] text-primary">
        5 доступных комплектаций
      </p>
    </template>

    <SlideView :data="variants" :space-between="12" class="mt-10">
      <template #slide="{ item }">
        <div
          class="md:w-[425px] md:!px-0"
          :style="{ padding: `0 ${bounding.x.value}px` }"
        >
          <div class="w-full bg-white">
            <div class="bg-primary px-7.5 pb-6 pt-5">
              <h1 class="text-[25px] font-semibold leading-[35px] text-white">
                {{ item.label }}
              </h1>
              <p class="mt-1.5 text-lg font-semibold text-white">
                от {{ item.price_start }}
              </p>
            </div>
            <div class="p-7.5">
              <div>
                <b class="text-sm+">Двигатель</b>
                <p class="mt-2.5 text-xs">3.5 MPI / 272 л.с., Бензин</p>
              </div>
              <div class="mt-7.5 h-[314px]">
                <b class="text-sm+">Основные опции</b>
                <div class="mt-2.5 space-y-2.5 text-xs">
                  <p>Подогрев передних сидений</p>
                  <p>Рейлинги на крыше</p>
                  <p>Система контроля слепых зон (BCW)</p>
                  <p>Датчик дождя</p>
                </div>
              </div>
              <div class="mt-7.5 border-t border-t-protection pt-5">
                <button class="flex">
                  <span class="text-sm+ font-semibold text-primary"
                    >Комплектации и цены</span
                  >
                  <TickToRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </SlideView>
  </Section>
</template>
