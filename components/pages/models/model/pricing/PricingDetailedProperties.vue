<script setup lang="tsx">
import {
  PrimeAccordionHeader,
  PrimeAccordionPanel,
  UISlideView,
} from '#components'
import type {
  ModelConfiguration,
  ModelConfigurationFeature,
  ModelConfigurationGroup,
} from '~/types'

const { bounding } = useContainer()

const { data } = await useFetch('/api/model/sonata')

const hasFeature = (feature: string, configuration: ModelConfiguration) => {
  return configuration.features.some((f) => f.label === feature)
}

const configurationsSwiper =
  useTemplateRef<InstanceType<typeof UISlideView>>('confSwiper')

const confSwiperClientX = ref(0)

// enables splitting standard features
const splitEnabled = false
const splitMaxFeatures = 4

function splitFeatures(
  groups: ModelConfigurationGroup[],
  max: number,
): ModelConfigurationGroup[] {
  const data: ModelConfigurationGroup[] = []
  for (let i = 0; i < groups.length; i++) {
    if ((groups[i][1] as ModelConfigurationFeature[]).length > max) {
      const chunks = chunkArray(
        groups[i][1] as ModelConfigurationFeature[],
        max,
      )
      for (let j = 0; j < chunks.length; j++) {
        data.push([groups[i][0], chunks[j]])
      }
    } else {
      data.push(groups[i])
    }
  }
  return data
}

const splittedStandardFeatures = computed(() => {
  const standardFeaturesGroup = Object.entries(
    toRaw(data.value?.groupStandardFeatures) || {},
  )
  if (splitEnabled) {
    return splitFeatures(standardFeaturesGroup, splitMaxFeatures)
  }
  return standardFeaturesGroup
})

onMounted(() => {
  nextTick(() => {
    configurationsSwiper.value?.swiper?.on('slideChange', (swiper: any) => {
      confSwiperClientX.value = swiper.translate
    })
  })
})
</script>
<template>
  <div class="col-span-9">
    <div class="bg-background flex w-full relative 2xl:bg-white">
      <UISlideView
        ref="confSwiper"
        class="w-full"
        :paginator="false"
        :data="data?.model.configurations || []"
        navigation-mode="oneside-left"
        navigation-type="sm"
        :breakpoints-enabled="false"
        :breakpoints="{
          768: { slidesOffsetBefore: 37, slidesOffsetAfter: 37 },
          1440: { slidesOFfsetBefore: 20, slidesOffsetAfter: 20 },
        }"
        :slides-offset-before="15"
        :slides-offset-after="15"
        swiper-slide-class="!w-fit"
      >
        <template #slide="{ item }">
          <div
            class="p-4 md:p-5 w-[172px] md:w-[232px] 2xl:w-[220px] hoverable:border hoverable:border-transparent hoverable:hover:border-primary hoverable:transition-colors cursor-pointer"
          >
            <div>
              <h1 class="flex items-center font-semibold">
                <span class="text-primary text-base">{{ item.name }}</span>
                <UITickToRight class="text-pretty" />
              </h1>
              <p class="mt-1 text-caption text-xs">
                {{ item.engine }}
              </p>
            </div>
            <h2
              class="space-x-1 md:mt-4 mt-3 text-base font-semibold text-primary"
            >
              <span>{{ item.price }}</span>
              <span>сум</span>
            </h2>
          </div>
        </template>

        <template #navigation>
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
      <UIAccordion
        :default-open="true"
        :classes="{
          contentContainer: 'duration-700',
          contentWrapper: 'duration-700',
        }"
        :items="[{ label: 'Стандартное оборудование', content: '' }]"
      >
        <template #collapseicon>
          <UITickToTop class="min-w-5" />
        </template>
        <template #expandicon>
          <UITickToBottom class="min-w-5" />
        </template>

        <template #header="{ toggle, expanded }">
          <div
            @click="toggle"
            class="py-3 cursor-pointer flex justify-between w-full items-center text-base font-semibold text-primary text-left md:py-4 md:text-lg 2xl:text-2xl border-b-2 border-protection"
          >
            <span> Стандартное оборудовани </span>
            <button @click="toggle">
              <UITickToBottom
                class="text-primary transition-transform"
                :class="{ '!rotate-180': expanded }"
              />
            </button>
          </div>
        </template>

        <template #content>
          <div class="space-y-6 md:space-y-7.5 pt-7.5 pb-15 px-0 md:pt-10">
            <div
              v-for="[group, features] in splittedStandardFeatures"
              :key="group"
              class="group"
            >
              <h2
                class="text-sm font-semibold text-primary md:text-base 2xl:text-lg"
              >
                {{ group }}
              </h2>
              <ul
                class="mt-2.5 list-disc list-inside 2xl:grid 2xl:grid-cols-2 2xl:gap-x-10"
              >
                <li
                  v-for="feature in (features as ModelConfigurationFeature[])"
                  :key="feature.label"
                  class="text-sm text-primary md:text-base"
                >
                  {{ feature.label }}
                </li>
              </ul>
            </div>
          </div>
        </template>
      </UIAccordion>

      <UIAccordion
        :classes="{
          contentContainer: 'duration-700',
          contentWrapper: 'duration-700',
        }"
        :items="
          Object.entries(data?.groupedFeatures || {}).map(
            ([tab, features]) => ({ label: tab, content: features }),
          )
        "
      >
        <template #collapseicon>
          <UITickToTop class="min-w-5" />
        </template>
        <template #expandicon>
          <UITickToBottom class="min-w-5" />
        </template>

        <template #header="{ item, toggle, expanded }">
          <div
            @click="toggle"
            class="py-3 flex justify-between w-full items-center text-base font-semibold text-primary text-left md:py-4 md:text-lg 2xl:text-2xl border-b-2 border-protection cursor-pointer"
          >
            <span>
              {{ item.label }}
            </span>
            <button @click="toggle">
              <UITickToBottom
                class="text-primary transition-transform duration-700"
                :class="{ '!rotate-180': expanded }"
              />
            </button>
          </div>
        </template>

        <template #content="{ content }">
          <div class="divide-y divide-protection text-primary">
            <div v-for="feature in content" :key="feature.label" class="py-4">
              <p class="text-sm">{{ feature.label }}</p>
              <div class="mt-3.5 overflow-hidden">
                <div
                  class="flex translate-x-[--translate-x] transition-transform"
                  :style="{
                    '--translate-x':
                      (confSwiperClientX ? confSwiperClientX - 15 : 0) + 'px',
                  }"
                >
                  <div
                    v-for="config in data?.model.configurations || []"
                    :key="config.name"
                    class="w-[172px] md:w-[232px] shrink-0 2xl:w-[220px]"
                  >
                    <div
                      v-if="hasFeature(feature.label, config)"
                      class="size-2.5 bg-primary rounded-full"
                    />
                    <div v-else>-</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </UIAccordion>
    </UIContainer>
  </div>
</template>
