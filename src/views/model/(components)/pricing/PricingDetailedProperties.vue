<script setup lang="tsx">
import { computed, ref } from 'vue';

import Accordion from 'primevue/accordion';
import AccordionContent from 'primevue/accordioncontent';
import AccordionHeader from 'primevue/accordionheader';
import AccordionPanel from 'primevue/accordionpanel';

import { useContainer } from '@/composables/useContainer';

import Container from '@/components/common/Container.vue';
import SlideView from '@/components/common/SlideView.vue';

import TickToBottom from '@/components/icons/20x20/TickToBottom.vue';
import TickToRight from '@/components/icons/20x20/TickToRight.vue';
import TickToTop from '@/components/icons/20x20/TickToTop.vue';

const optionsSwiper = ref<InstanceType<typeof SlideView> | null>(null);
const optionsSwiperActiveIndex = computed(() => {
  return optionsSwiper.value ? optionsSwiper.value.swiper?.activeIndex || 0 : 0;
});

const { bounding } = useContainer();

const SliderShade = (props: { d: 'left' | 'right' }) => {
  return (
    <div
      class={[
        'absolute z-10 bg-[linear-gradient(90deg,rgba(248,248,248,_0)0%,#F8F8F8_100%)] top-0  w-[86px] md:w-[136px] h-full md:bg-[linear-gradient(90deg,rgba(248,248,248,0)0%,#F8F8F8_97.09%)] 2xl:bg-[linear-gradient(90deg,rgba(255,255,255,0)0%,#FFFFFF_51.04%,#FFFFFF_100%)]',

        {
          'left-0 2xl:-left-10': props.d === 'left',
          'flip-x': props.d === 'left',
          'right-0': props.d === 'right',
        },
      ]}
    ></div>
  );
};

const accordionTabs = ref([
  'Стандартное оборудование',
  'Пакет «Тёплые опции»',
  'Экстерьер',
  'Интерьер',
  'Безопасность',
  'Комфорт',
  'Мультимедиа',
  'Современные системы помощи водителю',
  'Цвет кузова',
  'Варианты интерьера',
]);
</script>
<template>
  <div class="col-span-9">
    <div class="bg-background flex w-full relative 2xl:bg-white">
      <SlideView
        ref="optionsSwiper"
        navigationType="sm"
        :paginator="false"
        :data="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]"
        class="w-full"
        swiperSlideClass="!w-fit"
        :slidesOffsetBefore="15"
        :slidesOffsetAfter="15"
        :breakpoints="{
          768: { slidesOffsetBefore: 37, slidesOffsetAfter: 37 },
          1440: { slidesOFfsetBefore: 20, slidesOffsetAfter: 20 },
        }"
        navigiationMode="oneside-left"
      >
        <template #slide>
          <div
            class="p-4 md:p-5 w-[172px] md:w-[232px] shrink-0 overflow-auto 2xl:w-[220px] hoverable:border hoverable:border-transparent hoverable:hover:border-primary hoverable:transition-colors cursor-pointer"
          >
            <div>
              <h1 class="flex items-center font-semibold">
                <span class="text-primary text-base">Comfort</span>
                <TickToRight class="text-pretty" />
              </h1>
              <p class="mt-1 text-caption text-xs">
                1.5 GDI / 170 л.с., Бензин
              </p>
            </div>
            <h2
              class="space-x-1 md:mt-4 mt-3 text-base font-semibold text-primary"
            >
              <span>379 900 000</span>
              <span>сум</span>
            </h2>
          </div>
        </template>

        <template #navigation>
          <SliderShade d="left" v-if="optionsSwiperActiveIndex > 0" />
          <SliderShade d="right" />
        </template>
      </SlideView>
    </div>

    <Container
      class="pt-5 pb-12 md:pt-10 md:pb-15 2xl:px-0 2xl:max-w-none 2xl:pl-grid-12-gap 2xl:pr-[--padding-x]"
      :style="{
        '--padding-x': bounding.x.value + 'px',
      }"
    >
      <Accordion value="0" class="divide-y-2 divide-protection">
        <template #collapseicon>
          <TickToTop class="min-w-5" />
        </template>
        <template #expandicon>
          <TickToBottom class="min-w-5" />
        </template>

        <AccordionPanel
          v-for="tab in accordionTabs"
          :key="tab"
          :value="tab"
          unstyled
        >
          <AccordionHeader
            unstyled
            class="py-3 flex justify-between w-full items-center text-base font-semibold text-primary text-left md:py-4 md:text-lg 2xl:text-2xl"
            >{{ tab }}</AccordionHeader
          >
          <AccordionContent unstyled class="">
            <div
              class="w-full h-2h bg-protection flex justify-center items-center"
            >
              content
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </Container>
  </div>
</template>
