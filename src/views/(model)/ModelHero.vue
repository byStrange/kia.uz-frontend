<script setup lang="tsx">
import { useContainer } from '@/composables/useContainer';

import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
import Button from '@/components/common/Button.vue';

import ComputerIcon from '@/components/icons/onboard/ComputerIcon.vue';
import MultimediaIcon from '@/components/icons/onboard/MultimediaIcon.vue';
import SalonIcon from '@/components/icons/onboard/SalonIcon.vue';

import SafeAreaView from '@/components/layout/SafeAreaView.vue';

const { offset } = useContainer();
</script>
<template>
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
          srcset="https://ucarecdn.com/141e96f9-a90b-41e2-947c-1b3f6b9712f6/"
          media="(min-width: 1024px)"
        />

        <source
          srcset="https://ucarecdn.com/48b7e2b2-dcf3-40c1-912a-83bef358396c/"
          media="(min-width: 768px)"
        />
        <img
          src="https://ucarecdn.com/7697fb74-fadd-4192-8a5e-5f0491567ff6/"
          class="w-full object-cover 2xl:h-full"
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
