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
    label: 'model_properties.engine_and_transmission', content: [
      { label: 'spare_parts.engine', key: 'name' },
      { label: 'model_properties.engine_power_hp', key: 'power' },
      { label: 'model_properties.torque_nm', key: 'torque' },
      { label: 'model_properties.fuel_type', key: 'fuel_type' },
      { label: 'model_properties.working_volume', key: 'working_volume' },
      { label: 'model_properties.working_volume_cube', key: 'working_volume_cube' },
      { label: 'model_properties.eco_class', key: 'eco_class' },
      { label: 'model_properties.gear', key: 'gear' },
      { label: 'model_properties.drive', key: 'drive' },
      { label: 'model_properties.acceleration_time', key: 'acceleration_time' },
      { label: 'model_properties.fuel_consumption', key: 'fuel_consumption' }
    ]
  },
  {
    label: 'model_properties.co2_emissions',
    content: [
      {
        label: 'model_properties.city_fuel_gkm',
        key: 'city_fuel_gkm'
      },
      {
        label: 'model_properties.highway_fuel_gkm',
        key: 'highway_fuel_gkm'
      },
      {
        label: 'model_properties.combined_cycling_gkm',
        key: 'combined_cycling_gkm'
      }
    ]
  },
  {
    label: 'sizes',
    content: [
      {
        label: 'model_properties.body_type',
        key: 'body_type'
      },
      {
        label: 'model_properties.dimensions',
        key: 'dimensions'
      },
      {
        label: 'model_properties.wheelbase',
        key: 'wheelbase'
      },
      {
        label: 'model_properties.ground_clearance',
        key: 'ground_clearance'
      },
      {
        label: 'model_properties.trunk_volume',
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
      <ElementSlideView
ref="confSwiper" class="w-full" :paginator="false" :data="configurations || []"
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

    <UIContainer
class="pt-5 pb-12 md:pt-10 md:pb-15 2xl:px-0 2xl:max-w-none 2xl:pl-grid-12-gap 2xl:pr-[--padding-x]"
      :style="{
        '--padding-x': bounding.x.value + 'px',
      }">
      <MoleculeAccordion
:default-open="true" :classes="{
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
            <span>{{ $t(item.label) }}</span>
            <button @click="toggle">
              <UITickToBottom class="text-primary transition-transform" :class="{ '!rotate-180': expanded }" />
            </button>
          </div>
        </template>

        <template #content="{ content }">
          <div class="divide-y divide-protection text-primary">
            <div v-for="item in content" :key="item.label" class="py-4">
              <p class="text-sm md:text-base 2xl:text-xl font-semibold">{{ $t(item.label) }}</p>
              <div class="mt-3.5 overflow-hidden">
                <div
class="flex translate-x-[--translate-x] transition-transform" :style="{
                  '--translate-x':
                    (confSwiperClientX ? confSwiperClientX - 15 : 0) + 'px',
                }">
                  <template v-if="item.key == 'gear' || item.key == 'drive'">
                    <div
v-for="config in configurations || []" :key="config.name"
                      class="w-[172px] md:w-[232px] shrink-0 2xl:w-[220px]">
                      <div> {{ config.parent_engine[item.key]?.name }}</div>
                    </div>
                  </template>
                  <template v-else>
                    <div
v-for="config in configurations || []" :key="config.name"
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
