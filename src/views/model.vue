<script setup lang="ts">
import { insertToIndex } from '@/utils';

import { onMounted, onUnmounted, ref } from 'vue';

import { useRoute } from 'vue-router';

import { useCoursesService } from '@/services/coursesService';
import { useHeaderService } from '@/services/headerService';

import { useBreadCrumb } from '@/composables/useBreadCrumb';
import { useContainer } from '@/composables/useContainer';

import Button from '@/components/common/Button.vue';
import SlideView from '@/components/common/SlideView.vue';

import Section from '@/components/home/Section.vue';

import TickToRight from '@/components/icons/20x20/TickToRight.vue';
import PlayIcon2 from '@/components/icons/PlayIcon2.vue';

import Bar from './(model)/Bar.vue';
import BriefSection from './(model)/BriefSection.vue';
import ModelHero from './(model)/ModelHero.vue';
import ThreeSixty from './(model)/ThreeSixty.vue';

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
    <SlideView
      :data="courses"
      :space-between="16"
      :slides-offset-before="bounding.x.value"
      :slides-offset-after="bounding.x.value"
      swiper-slide-class="!w-fit"
    >
      <template #slide="{ item, bounding }">
        <div class="h-[408px] md:w-[310px] md:!px-0">
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

  <ThreeSixty />

  <Section
    sectionTitle="Варианты Carnival"
    subtitle="Комплектации"
    class="bg-background"
  >
    <template #after-title="{ align }">
      <p class="text-[15px] text-primary" :class="align">
        5 доступных комплектаций
      </p>
    </template>

    <SlideView
      :space-between="16"
      :slides-offset-before="bounding.x.value"
      :slides-offset-after="bounding.x.value"
      swiper-slide-class="!w-fit"
      :navigation="false"
      :data="variants"
      class="mt-6 2xl:mt-8"
      :paginator="false"
    >
      <template #slide="{ item }">
        <div
          class="max-w-[425px] md:!px-0"
          :style="{ width: bounding.width.value + 'px' }"
        >
          <div class="w-full bg-white">
            <div class="bg-primary px-6 py-4">
              <h1 class="text-2xl font-semibold text-white">
                {{ item.label }}
              </h1>
              <p class="mt-1 text-base font-semibold text-white">
                от {{ item.price_start }}
              </p>
            </div>
            <div class="px-6 py-4">
              <div>
                <b class="text-sm">Двигатель</b>
                <p class="mt-2.5 text-sm">3.5 MPI / 272 л.с., Бензин</p>
              </div>
              <div class="mt-6 pb-5">
                <b class="text-sm">Основные опции</b>
                <div class="mt-2 space-y-2 text-sm">
                  <p>Подогрев передних сидений</p>
                  <p>Рейлинги на крыше</p>
                  <p>Система контроля слепых зон (BCW)</p>
                  <p>Датчик дождя</p>
                </div>
              </div>
              <div class="mt-7.5 border-t border-t-protection pt-5">
                <button class="flex">
                  <span class="text-base font-semibold text-primary"
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
    <div
      class="container space-y-3 mt-6 md:grid md:grid-cols-3 md:space-y-0 md:gap-5 2xl:flex 2xl:justify-center 2xl:mt-8"
    >
      <Button mode="full" label="Отправить заявку" color="secondary" />
      <Button mode="full" label="Скачать прайс-лист" />
      <Button mode="full" label="Контакты дилеров" />
    </div>
  </Section>

  <BriefSection />
</template>
