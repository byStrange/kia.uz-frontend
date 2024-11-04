<script setup lang="ts">
import { insertToIndex } from '@/utils';

import { onMounted, onUnmounted, ref } from 'vue';

import { useRoute } from 'vue-router';

import { useHeaderService } from '@/services/headerService';

import { useBreadCrumb } from '@/composables/useBreadCrumb';
import { useContainer } from '@/composables/useContainer';

import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
import Button from '@/components/common/Button.vue';

import InfoIcon from '@/components/icons/20x20/InfoIcon.vue';
import MoreIcon from '@/components/icons/20x20/MoreIcon.vue';
import TickToBottom from '@/components/icons/20x20/TickToBottom.vue';
import ComputerIcon from '@/components/icons/onboard/ComputerIcon.vue';
import MultimediaIcon from '@/components/icons/onboard/MultimediaIcon.vue';
import SalonIcon from '@/components/icons/onboard/SalonIcon.vue';

import DesktopOnly from '@/components/layout/DesktopOnly.vue';
import SafeAreaView from '@/components/layout/SafeAreaView.vue';

const route = useRoute();
const { _breadcrumbsRaw } = useBreadCrumb(route);
const { offset } = useContainer();

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
  <div class="h-screen overflow-hidden">
    <SafeAreaView :extra="52">
      <div
        data-label="Hero shadow bottom"
        aria-hidden="true"
        class="hero-slider-shade long absolute bottom-0 z-10 h-[428px] w-full md:h-[356px]"
      ></div>
      <div
        data-label="Hero top"
        class="container absolute hidden h-[190px] w-full items-start justify-end gap-6 pt-7.5 md:block md:bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)100%)] 2xl:bg-[linear-gradient(180deg,rgba(5,20,31,0.5)_24.47%,rgba(5,20,31,0)100%)] 2xl:pt-5"
      >
        <BreadCrumbs
          class="hidden bg-transparent text-white 2xl:block"
          theme="light"
        />
        <div class="flex w-full items-start justify-end gap-6 2xl:mt-4.5">
          <Button
            label="Заказать звонок"
            color="primary"
            size="md"
            mode="full"
            class="md:!w-auto"
          />
          <Button
            label="Скачать прайс-лист"
            color="secondary"
            size="md"
            mode="full"
            class=""
          />
        </div>
      </div>
      <picture class="h-full w-full" data-label="Main Hero image">
        <source
          srcset="@/assets/test/kia-test-hero-img.png"
          media="(min-width: 1024px)"
        />

        <source
          srcset="
            https://ucarecdn.com/48b7e2b2-dcf3-40c1-912a-83bef358396c/-/preview/1000x720/
          "
          media="(min-width: 768px)"
        />
        <img
          src="https://ucarecdn.com/7697fb74-fadd-4192-8a5e-5f0491567ff6/-/preview/1000x1000/"
          class="w-full object-cover"
        />
      </picture>
      <div
        data-label="Hero bottom"
        class="absolute !left-0 bottom-[31px] z-10 flex w-full items-end justify-center md:!left-auto md:bottom-15 md:justify-start md:pb-0 2xl:bottom-16"
        :style="{
          left: offset.offsetLeft.value + 'px',
          padding: `0 ${offset.offsetLeft.value}px`,
        }"
      >
        <div class="flex w-full">
          <div class="w-full md:px-0 2xl:grid 2xl:grid-cols-12 2xl:gap-10">
            <div class="space-y-2.5 text-white md:space-y-2 2xl:col-span-3">
              <p class="text-sm text-white md:text-lg">Новый Kia</p>

              <h1
                class="mt-1 text-2xl font-semibold md:mt-2 md:text-4xl 2xl:mt-4 2xl:text-7xl"
              >
                Carnival
              </h1>
              <p class="mt-1 text-sm md:mt-2 md:text-lg 2xl:mt-4">
                Для тех, у кого большие планы
              </p>
            </div>
            <div class="mt-6 space-y-4 md:hidden">
              <Button
                label="Заказать звонок"
                color="primary"
                size="md"
                mode="full"
                class="md:!w-auto"
              />
              <Button
                label="Скачать прайс-лист"
                color="secondary"
                size="md"
                mode="full"
                class=""
              />
            </div>
            <div
              class="col-span-6 mt-6 space-y-4 text-white md:mt-10 md:grid md:grid-cols-3 md:space-y-0 2xl:col-start-7 2xl:gap-10"
            >
              <div class="flex items-center gap-2.5 md:flex-col md:items-start">
                <ComputerIcon class="md:size-12.5" />
                <p class="text-xs text-protection">
                  12” мультимедийная система c панорамным монитором
                </p>
              </div>
              <div class="flex items-center gap-2.5 md:flex-col md:items-start">
                <MultimediaIcon class="md:size-12.5" />
                <p class="text-xs text-protection">
                  12” Цифровая панель приборов
                </p>
              </div>
              <div class="flex items-center gap-2.5 md:flex-col md:items-start">
                <SalonIcon class="md:size-12.5" />
                <p class="text-xs text-protection">Атмосферная подсветка</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SafeAreaView>
  </div>
</template>
