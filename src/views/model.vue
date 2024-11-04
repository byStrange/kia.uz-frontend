<script setup lang="ts">
import { insertToIndex } from '@/utils';

import { onMounted, onUnmounted, ref } from 'vue';

import { useRoute } from 'vue-router';

import { useHeaderService } from '@/services/headerService';

import { useBreadCrumb } from '@/composables/useBreadCrumb';

import InfoIcon from '@/components/icons/20x20/InfoIcon.vue';
import Icon360 from '@/components/icons/Icon360.vue';
import MoreIcon from '@/components/icons/20x20/MoreIcon.vue';
import TickToBottom from '@/components/icons/20x20/TickToBottom.vue';

import DesktopOnly from '@/components/layout/DesktopOnly.vue';
import ModelHero from './(model)/ModelHero.vue';

import SlideView from '@/components/common/SlideView.vue';
import { useCoursesService } from '@/services/coursesService';
import Section from '@/components/home/Section.vue';
import Button from '@/components/common/Button.vue';
import Checkbox from 'primevue/checkbox';
import RadioButton from 'primevue/radiobutton';
import CheckIcon from '@/components/icons/CheckIcon.vue';
const route = useRoute();
const { _breadcrumbsRaw } = useBreadCrumb(route);

const { headerService } = useHeaderService();

const model = ref({
  name: 'K5',
});

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
const modelType = ref('');
const availableColors = ref([
  '#F3F3F3',
  '#B6B7B2',
  '#2E2F31',
  '#99989E',
  '#7E2E35',
  '#8F9998',
]);

const selectedColor = ref();
</script>
<template>
  <div
    data-label="Model bar"
    class="fixed top-0 z-20 flex w-full justify-between bg-primary px-page-padding py-3.5 transition-all duration-300 2xl:container"
    :class="{
      '!top-[65px]': headerService.isHeaderFixed,
      '!z-10': headerService.isMenuOpen,
    }"
  >
    <div
      class="2xl:flex 2xl:divide-x 2xl:divide-caption"
      data-label="Model bar left"
    >
      <button class="flex gap-2 text-white 2xl:2xl:pr-5">
        <span class="2xl:text-lg">{{ model.name }}</span>
        <TickToBottom class="text-white 2xl:hidden" />
      </button>
      <DesktopOnly flex class="gap-2 pl-5 text-white">
        <p class="text-base">от 543 510 000 сум</p>
        <button>
          <InfoIcon />
        </button>
      </DesktopOnly>
    </div>
    <div
      class="2xl:flex 2xl:divide-x 2xl:divide-caption"
      data-label="Model bar right"
    >
      <DesktopOnly class="pr-5">
        <ul class="flex items-center gap-6">
          <li>
            <a href="#" class="text-base text-white">Обзор</a>
          </li>
          <li>
            <a href="#" class="text-base text-white">Комплектации и цены</a>
          </li>
          <li>
            <a href="#" class="text-base text-white">Характеристики</a>
          </li>
          <li>
            <a href="#" class="text-base text-white">Брошюра</a>
          </li>
          <li class="flex items-center">
            <button class="text-white">
              <MoreIcon />
            </button>
          </li>
        </ul>
      </DesktopOnly>
      <button class="pl-5 text-white">Конфигуратор</button>
    </div>
  </div>
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

  <div data-label="360 view" class="container py-10">
    <div>
      <p class="text-xs leading-[20px] text-primary">Просмотр 360°</p>
      <h2 class="mt-1.5 text-4xl font-semibold text-primary">Carnival</h2>
    </div>
    <img
      src="https://ucarecdn.com/40aceb5c-0188-4362-bacd-86dd776ce86b/-/preview/1000x501/"
      class="w-full"
    />
    <div>
      <div class="flex flex-col items-center gap-2.5">
        <Icon360 />
        <p class="text-xs leading-[20px] text-disabled">
          Изображение может не соответствовать выбранной комплектации. Цвет
          автомобиля может отличаться от представленного на данном сайте.
        </p>
      </div>
      <div class="mt-7.5">
        <div class="flex gap-5 text-[15px] leading-[20px]">
          <div class="flex items-center gap-2.5">
            <RadioButton
              value="exterior"
              inputId="exterior"
              name="type"
              v-model="modelType"
            />
            <label for="exterior">Экстерьер</label>
          </div>
          <div class="flex items-center gap-2.5">
            <RadioButton
              value="interior"
              inputId="interior"
              name="type"
              v-model="modelType"
            />
            <label for="interior">Интерьер</label>
          </div>
        </div>
        <div class="mt-5">
          <div class="flex gap-1.5 text-[15px] leading-[20px]">
            <span class="text-disabled">Цвет:</span>
            <b class="text-primary">Snow White Pearl (SWP)</b>
          </div>
          <div class="mt-[15px] flex gap-2.5">
            <div
              @click="selectedColor = color"
              class="color flex size-[35px] items-center justify-center rounded-full border border-disabled"
              :style="{ backgroundColor: color }"
              v-for="color in availableColors"
            >
              <CheckIcon v-if="color === selectedColor" class="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-7.5">
        <Button label="Конфигуратор" color="secondary" mode="full" />
      </div>
    </div>
  </div>
</template>
