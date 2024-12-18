<script setup lang="tsx">
import { Controller } from 'swiper/modules'
import type { Swiper } from 'swiper/types'

const modelsThumbSwiper = ref<Swiper | null>(null)
const modelsSwiper = ref<Swiper | null>(null)

const slidesLength = computed(() =>
  modelsThumbSwiper.value ? modelsThumbSwiper.value.slides.length : 0,
)

const slidePrev = () => {
  modelsSwiper.value?.slidePrev()
}

const slideNext = () => {
  modelsSwiper.value?.slideNext()
}

const { models } = useStore()

const activeModelIndex = ref(0)

const pagePadding = useCssVar('--page-padding')

onMounted(() => {
  modelsThumbSwiper.value?.on('click', (swiper) => {
    const index = swiper.clickedIndex
    swiper.slideTo(index)
  })
})
</script>
<template>
  <UISection section-title="Модели Kia" class="bg-background">
    <div class="2xl:container">
      <ClientOnly>
        <Swiper
          :modules="[Controller]"
          :controller="{ control: modelsSwiper }"
          slides-per-view="auto"
          :centered-slides="true"
          :space-between="8"
          @swiper="modelsThumbSwiper = $event"
          @slide-change="(e) => (activeModelIndex = e.activeIndex)"
        >
          <template #container-start>
            <UIButtonCarousel
              position="left"
              mode="free"
              :hide="activeModelIndex === 0"
              size="sm"
              @click="slidePrev"
            />
            <UIButtonCarousel
              position="right"
              :hide="activeModelIndex === slidesLength - 1"
              mode="free"
              size="sm"
              @click="slideNext"
            />
            <div
              :style="{
                background:
                  'linear-gradient(-90deg, rgba(248, 248, 248, 0) 0%, #F8F8F8 100%)',
              }"
              class="absolute left-0 z-10 h-full w-[94px]"
            />
            <div
              :style="{
                background:
                  'linear-gradient(90deg, rgba(248, 248, 248, 0) 0%, #F8F8F8 100%)',
              }"
              class="absolute right-0 z-10 h-full w-[94px]"
            />
          </template>
          <SwiperSlide
            v-for="model in models"
            :key="model.name"
            class="!w-fit"
          >
            <div
              :class="[
                'relative w-fit rounded-xl border border-transparent px-1 py-2 transition-colors md:px-1.5 md:py-3',
                {
                  '!border-primary': activeModelIndex === models.indexOf(model),
                },
              ]"
            >
              <UIElectroCarIcon
                v-if="model.electric"
                class="absolute right-1 top-2"
              />

              <img
                loading="lazy"
                :src="model.images['108x52']"
                class="h-[40px] w-[84px] md:h-[52px] md:w-[108px]"
              />
              <p
                class="mt-1 text-center text-xs text-primary md:mt-3 md:text-base"
              >
                {{ model.name }}
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
      <div class="mt-4 md:mt-8">
        <ClientOnly>
          <Swiper
            :modules="[Controller]"
            :controller="{ control: modelsThumbSwiper }"
            :slides-per-view="1"
            :centered-slides="true"
            :space-between="16"
            :slides-offset-after="parseInt(pagePadding + '')"
            @swiper="modelsSwiper = $event"
          >
            <template #container-start>
              <UIButtonCarousel
                position="left"
                :hide="activeModelIndex === 0"
                mode="free"
                @click="slidePrev"
              />
              >
              <UIButtonCarousel
                position="right"
                :hide="activeModelIndex === slidesLength - 1"
                mode="free"
                @click="slideNext"
              />
            </template>
            <SwiperSlide
              v-for="model in models"
              :key="model.name"
              class="container 2xl:px-0"
            >
              <div data-label="card">
                <div data-label="image wrapper">
                  <img
                    loading="lazy"
                    :src="model.images['742x334']"
                    class="w-full md:mx-auto md:max-w-[500px] 2xl:max-w-[742px]"
                  />
                </div>
                <div class="text-center">
                  <h2
                    class="text-lg text-primary md:text-2xl md:font-semibold 2xl:text-3xl"
                  >
                    {{ model.name }}
                  </h2>
                  <div class="mt-2">
                    <p
                      class="flex justify-center gap-x-1 text-sm text-primary md:text-base"
                    >
                      от  199 900 000 сум
                      <UIInfoIcon class="text-disabled" />
                    </p>
                    <p class="text-sm text-caption md:text-base">
                      выгода: 50 000 сум
                    </p>
                  </div>
                </div>
                <NuxtLinkLocale to="/models/sonata">
                  <UIButton
                    label="Подробнее о модели"
                    color="secondary"
                    
                    mode="full"
                    class="mx-auto mt-4 md:mt-8"
                  />
                </NuxtLinkLocale>
              </div>
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
      </div>
    </div>
  </UISection>
</template>
