<script setup lang="ts">
import type { ModelPricingAndDetailsPage } from '~/server/api/models/[id]/features.get';
import type { Configuration } from '~/server/api/models/[id]/index.get';

const { bounding } = useContainer()

const hasFeature = (feature: uuid, configuration: Configuration) => {
  return configuration.feature_groups.some((feature_group) => {
    return feature_group.features.some((f) => f.id === feature)
  })
}


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

defineEmits<{
  chooseConfiguration: [id: uuid]
}>()

defineProps<{ standardFeatures: ModelPricingAndDetailsPage['standard_features'], groupedFeatures: ModelPricingAndDetailsPage['grouped_features'], configurations: ModelPricingAndDetailsPage['filtered_configurations'], showConfigurationSelectButton?: boolean }>()
</script>

<template>
  <div>
    <div class="bg-background flex w-full relative 2xl:bg-white">
      <ElementSlideView
ref="confSwiper" class="w-full" :paginator="false" :data="configurations || []"
        navigation-mode="oneside-left" navigation-type="sm" :breakpoints-enabled="false" :breakpoints="{
          768: { slidesOffsetBefore: 37, slidesOffsetAfter: 37 },
          1440: { slidesOFfsetBefore: 20, slidesOffsetAfter: 20 },
        }" :slides-offset-before="15" :slides-offset-after="15" swiper-slide-class="!w-fit">
        <template #slide="{ item: configuration }">
          <div
class="p-4 md:p-5 w-[172px] md:w-[232px] 2xl:w-[220px]" :class="{
            'hoverable:border hoverable:border-transparent hoverable:hover:border-primary hoverable:transition-colors cursor-pointer': !showConfigurationSelectButton
          }">
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
            <AtomButton
v-if="showConfigurationSelectButton" label="Выбрать" color="secondary" size="xs"
              class="w-full hidden md:flex md:mt-4 2xl:mt-5" @click="$emit('chooseConfiguration', configuration.id)" />
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
      }" :items="[{ label:$t('common.standard_features'), content: '' }]">

        <template #expandicon>
          <UITickToBottom class="min-w-5" />
        </template>

        <template #header="{ toggle, expanded }">
          <div
            class="py-3 cursor-pointer flex justify-between w-full items-center text-base font-semibold text-primary text-left md:py-4 md:text-lg 2xl:text-2xl border-b-2 border-protection"
            @click="toggle">
            <span>{{$t('common.standard_features')}}</span>
            <button @click="toggle">
              <UITickToBottom class="text-primary transition-transform" :class="{ '!rotate-180': expanded }" />
            </button>
          </div>
        </template>

        <template #content>
          <div class="space-y-6 md:space-y-7.5 pt-7.5 pb-15 px-0 md:pt-10">
            <div v-for="group in standardFeatures" :key="group.name" class="group">
              <h2 class="text-sm font-semibold text-primary md:text-base 2xl:text-lg">
                {{ group.name }}
              </h2>
              <ul class="mt-2.5 list-disc list-inside 2xl:grid 2xl:grid-cols-2 2xl:gap-x-10">
                <li v-for="feature in group.values" :key="feature" class="text-sm text-primary md:text-base">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </template>
      </MoleculeAccordion>

      <MoleculeAccordion
:classes="{
        contentContainer: 'duration-700',
        contentWrapper: 'duration-700',
      }"
        :items="Object.entries(groupedFeatures || {}).map(([groupName, features]) => ({ label: groupName, content: features })) || []">

        <template #expandicon>
          <UITickToBottom class="min-w-5" />
        </template>

        <template #header="{ item, toggle, expanded }">
          <div
            class="py-3 flex justify-between w-full items-center text-base font-semibold text-primary text-left md:py-4 md:text-lg 2xl:text-2xl border-b-2 border-protection cursor-pointer"
            @click="toggle">
            <span>
              {{ item.label }}
            </span>
            <button @click="toggle">
              <UITickToBottom
class="text-primary transition-transform duration-700"
                :class="{ '!rotate-180': expanded }" />
            </button>
          </div>
        </template>

        <template #content="{ content }">
          <div class="divide-y divide-protection text-primary">
            <div v-for="feature in content" :key="feature.id" class="py-4">
              <p class="text-sm">{{ feature.name }}</p>
              <div class="mt-3.5 overflow-hidden">
                <div
class="flex translate-x-[--translate-x] transition-transform" :style="{
                  '--translate-x':
                    (confSwiperClientX ? confSwiperClientX - 15 : 0) + 'px',
                }">
                  <div
v-for="config in configurations || []" :key="config.name"
                    class="w-[172px] md:w-[232px] shrink-0 2xl:w-[220px]">
                    <div v-if="hasFeature(feature.id, config)" class="size-2.5 bg-primary rounded-full" />
                    <div v-else>-</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </MoleculeAccordion>
    </UIContainer>
  </div>
</template>
