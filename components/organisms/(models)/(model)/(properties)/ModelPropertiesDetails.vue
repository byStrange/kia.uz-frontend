<script setup lang="tsx">
import {
  ElementSlideView,
} from '#components'
import type { Configuration, ModelEngine } from '~/server/api/models/[id]/index.get';
import type { ModelPropertiesPage } from '~/server/api/models/[id]/properties.get';


const { bounding } = useContainer()

const configurationsSwiper =
  useTemplateRef<InstanceType<typeof ElementSlideView>>('confSwiper')

const confSwiperClientX = ref(0)


onMounted(() => {
  nextTick(() => {
    configurationsSwiper.value?.swiper?.on('slideChange', (swiper: any) => {
      confSwiperClientX.value = swiper.translate
    })
  })
})

interface AccordionItem {
  label: string | any
  content: { label: string, key: keyof ModelEngine }[]
  icon?: Component | null
}

const items = ref<AccordionItem[]>([
  {
    label: 'Двигатель и трансмиссия', content: [
      { label: 'Двигатель', key: 'name' },
      { label: 'Мощность, л.с.', key: 'power' },
      { label: 'Крутящий момент, Н·м', key: 'torque' },
      { label: 'Тип топлива', key: 'fuel_type' },
      { label: 'Рабочий объем, л', key: 'working_volume' },
      { label: 'Рабочий объем, см3', key: 'working_volume_cube' },
      { label: 'Экологический класс', key: 'eco_class' },
      { label: 'Коробка передач', key: 'gear' },
      { label: 'Привод, л', key: 'drive' },
      { label: 'Время разгона 0-100 км/ч, с', key: 'acceleration_time' },
      { label: 'Расход топлива комбинированный, л/100 км', key: 'fuel_consumption' }
    ]
  },
  {
    label: 'Выбросы CO2',
    content: [
      {
        label: 'Город, г/км',
        key: 'city_fuel_gkm'
      },
      {
        label: 'Трасса, г/км',
        key: 'highway_fuel_gkm'
      },
      {
        label: 'В комбинированном цикле, г/км',
        key: 'combined_cycling_gkm'
      }
    ]
  },
  {
    label: 'Размеры',
    content: [
      {
        label: 'Тип кузова',
        key: 'body_type'
      },
      {
        label: 'Габариты (длина/ширина/высота), мм',
        key: 'dimensions'
      },
      {
        label: 'Колесная база, мм',
        key: 'wheelbase'
      },
      {
        label: 'Дорожный просвет, мм',
        key: 'ground_clearance'
      },
      {
        label: 'Объём багажника (VDA), л',
        key: 'trunk_volume'
      }
    ]
  }
])

defineProps<{ configurations: ModelPropertiesPage['configurationWithEngines'] | undefined }>()
</script>
<template>
  <div class="col-span-9">
    <div class="bg-background flex w-full relative 2xl:bg-white">
      <ElementSlideView ref="confSwiper" class="w-full" :paginator="false" :data="configurations || []"
        navigation-mode="oneside-left" navigation-type="sm" :breakpoints-enabled="false" :breakpoints="{
          768: { slidesOffsetBefore: 37, slidesOffsetAfter: 37 },
          1440: { slidesOFfsetBefore: 20, slidesOffsetAfter: 20 },
        }" :slides-offset-before="15" :slides-offset-after="15" swiper-slide-class="!w-fit">
        <template #slide="{ item: configuration }">
          <div
            class="p-4 md:p-5 w-[172px] md:w-[232px] 2xl:w-[220px] hoverable:border hoverable:border-transparent hoverable:hover:border-primary hoverable:transition-colors cursor-pointer">
            <div>
              <h1 class="flex items-center font-semibold">
                <span class="text-primary text-base">{{ configuration.name }}</span>
                <UITickToRight class="text-pretty" />
              </h1>
              <p class="mt-1 text-caption text-xs">
                {{ configuration.engine }}
              </p>
            </div>
            <h2 class="space-x-1 md:mt-4 mt-3 text-base font-semibold text-primary">
              <span>{{ formatPrice(configuration.price, $t('prefixes.sum')) }}</span>
            </h2>
          </div>
        </template>

        <template #navigation>
          <MoleculeSliderShade d="right" />
        </template>
      </ElementSlideView>
    </div>

    <UIContainer class="pt-5 pb-12 md:pt-10 md:pb-15 2xl:px-0 2xl:max-w-none 2xl:pl-grid-12-gap 2xl:pr-[--padding-x]"
      :style="{
        '--padding-x': bounding.x.value + 'px',
      }">
      <MoleculeAccordion :default-open="true" :classes="{
        contentContainer: 'duration-700',
        contentWrapper: 'duration-700',
      }" :items="items">

        <template #expandicon>
          <UITickToBottom class="min-w-5" />
        </template>

        <template #header="{ toggle, expanded, item }">
          <div
            class="py-3 cursor-pointer flex justify-between w-full items-center text-base font-semibold text-primary text-left md:py-4 md:text-lg 2xl:text-2xl border-b-2 border-protection"
            @click="toggle">
            <span>{{ item.label }}</span>
            <button @click="toggle">
              <UITickToBottom class="text-primary transition-transform" :class="{ '!rotate-180': expanded }" />
            </button>
          </div>
        </template>

        <template #content="{ content }">
          <div class="divide-y divide-protection text-primary">
            <div v-for="item in content" :key="item.label" class="py-4">
              <p class="text-sm md:text-base 2xl:text-xl font-semibold">{{ item.label }}</p>
              <div class="mt-3.5 overflow-hidden">
                <div class="flex translate-x-[--translate-x] transition-transform" :style="{
                  '--translate-x':
                    (confSwiperClientX ? confSwiperClientX - 15 : 0) + 'px',
                }">
                  <template v-if="item.key == 'gear' || item.key == 'drive'">
                    <div v-for="config in configurations || []" :key="config.name"
                      class="w-[172px] md:w-[232px] shrink-0 2xl:w-[220px]">
                      <div> {{ config.parent_engine[item.key]?.name }}</div>
                    </div>
                  </template>
                  <template v-else>
                    <div v-for="config in configurations || []" :key="config.name"
                      class="w-[172px] md:w-[232px] shrink-0 2xl:w-[220px]">
                      <div>{{ config.parent_engine[item.key]! }}</div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </template>
      </MoleculeAccordion>

    </UIContainer>
  </div>
</template>
