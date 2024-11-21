<script setup lang="tsx">
import { UISlideView } from '#components'

const optionsSwiper = ref<InstanceType<typeof UISlideView> | null>(null)
const optionsSwiperActiveIndex = computed(() => {
  return optionsSwiper.value ? optionsSwiper.value.swiper?.activeIndex || 0 : 0
})

const { bounding } = useContainer()

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
])
</script>
<template>
  <div class="col-span-9">
    <div class="bg-background flex w-full relative 2xl:bg-white">
      <UISlideView
        ref="optionsSwiper"
        navigation-type="sm"
        :paginator="false"
        :data="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]"
        class="w-full"
        swiper-slide-class="!w-fit"
        :slides-offset-before="15"
        :slides-offset-after="15"
        :breakpoints="{
          768: { slidesOffsetBefore: 37, slidesOffsetAfter: 37 },
          1440: { slidesOFfsetBefore: 20, slidesOffsetAfter: 20 },
        }"
        navigiation-mode="oneside-left"
      >
        <template #slide>
          <div
            class="p-4 md:p-5 w-[172px] md:w-[232px] shrink-0 overflow-auto 2xl:w-[220px] hoverable:border hoverable:border-transparent hoverable:hover:border-primary hoverable:transition-colors cursor-pointer"
          >
            <div>
              <h1 class="flex items-center font-semibold">
                <span class="text-primary text-base">Comfort</span>
                <UITickToRight class="text-pretty" />
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
          <UISliderShade v-if="optionsSwiperActiveIndex > 0" d="left" />
          <UISliderShade d="right" />
        </template>
      </UISlideView>
    </div>

    <UIContainer
      class="pt-5 pb-12 md:pt-10 md:pb-15 2xl:px-0 2xl:max-w-none 2xl:pl-grid-12-gap 2xl:pr-[--padding-x]"
      :style="{
        '--padding-x': bounding.x.value + 'px',
      }"
    >
      <PrimeAccordion value="0" class="divide-y-2 divide-protection">
        <template #collapseicon>
          <UITickToTop class="min-w-5" />
        </template>
        <template #expandicon>
          <UITickToBottom class="min-w-5" />
        </template>

        <PrimeAccordionPanel
          v-for="tab in accordionTabs"
          :key="tab"
          :value="tab"
          unstyled
        >
          <PrimeAccordionHeader
            unstyled
            class="py-3 flex justify-between w-full items-center text-base font-semibold text-primary text-left md:py-4 md:text-lg 2xl:text-2xl"
            >{{ tab }}</PrimeAccordionHeader
          >
          <PrimeAccordionContent unstyled class="">
            <div
              class="w-full h-2h bg-protection flex justify-center items-center"
            >
              content
            </div>
          </PrimeAccordionContent>
        </PrimeAccordionPanel>
      </PrimeAccordion>
    </UIContainer>
  </div>
</template>
