<script setup lang="tsx">
import { ref } from 'vue';

import { useHeaderService } from '@/services/headerService';

import InfoIcon from '@/components/icons/20x20/InfoIcon.vue';
import MoreIcon from '@/components/icons/20x20/MoreIcon.vue';
import TickToBottom from '@/components/icons/20x20/TickToBottom.vue';

import DesktopOnly from '@/components/layout/DesktopOnly.vue';

const model = ref({
  name: 'K5',
});

const { headerService } = useHeaderService();
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
            <router-link to="/model/carnival/pricing" class="text-base text-white">Комплектации и цены</router-link>
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
</template>
