<script setup lang="tsx">
import { Controller } from 'swiper/modules'
import type { Swiper } from 'swiper/types'

import InfoIcon from '@/components/icons/20x20/InfoIcon.vue'
import ElectroCarIcon from '@/components/icons/ElectroCarIcon.vue'
import { NuxtLink, UIButton } from '#components'

const modelsThumbSwiper = ref<Swiper | null>(null)
const modelsSwiper = ref<Swiper | null>(null)

const { bounding } = useContainer()

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

const router = useRouter()

const MiniThumbCard = ({ model }: { model: Model }) => {
  return (
    <div
      class={[
        'relative w-fit rounded-xl border border-transparent px-1 py-2 transition-colors md:px-1.5 md:py-3',
        {
          '!border-primary':
            activeModelIndex.value === models.value.indexOf(model),
        },
      ]}
    >
      {model.electric && <ElectroCarIcon class="absolute right-1 top-2" />}

      <img
        loading="lazy"
        src={model.images.small}
        class="h-[40px] w-[84px] md:h-[52px] md:w-[108px]"
      />
      <p class="mt-1 text-center text-xs text-primary md:mt-3 md:text-base">
        {model.title}
      </p>
    </div>
  )
}

const ModelCard = ({ model }: { model: Model }) => {
  return (
    <div data-label="card">
      <div data-label="image wrapper">
        <img
          loading="lazy"
          src={model.images.medium}
          class="w-full md:mx-auto md:max-w-[500px] 2xl:max-w-[742px]"
        />
      </div>
      <div class="text-center">
        <h2 class="text-lg text-primary md:text-2xl md:font-semibold 2xl:text-3xl">
          {model.title}
        </h2>
        <div class="mt-2">
          <p class="flex justify-center gap-x-1 text-sm text-primary md:text-base">
            от  199 900 000 сум
            <InfoIcon class="text-disabled" />
          </p>
          <p class="text-sm text-caption md:text-base">выгода: 50 000 сум</p>
        </div>
      </div>
      <NuxtLink to={{ path: '/models/1' }}>
        {h(UIButton, {
          label: 'Подробнее о модели',
          color: 'secondary',
          size: 'md',
          mode: 'full',
          class: 'mx-auto mt-4 md:mt-8',
        })}
      </NuxtLink>
    </div>
  )
}
</script>
<template>
  <UISection sectionTitle="Модели Kia" class="bg-background">
    <div class="2xl:container">
      <ClientOnly>
        <Swiper
          :modules="[Controller]"
          :controller="{ control: modelsSwiper }"
          @swiper="modelsThumbSwiper = $event"
          @slideChange="(e) => (activeModelIndex = e.activeIndex)"
          slides-per-view="auto"
          :centered-slides="true"
          :space-between="8"
        >
          <template #container-start>
            <UIButtonCarousel
              position="left"
              :hide="activeModelIndex === 0"
              size="sm"
              @click="slidePrev"
            />
            <UIButtonCarousel
              position="right"
              :hide="activeModelIndex === slidesLength - 1"
              size="sm"
              @click="slideNext"
            />
            <div
              :style="{
                background:
                  'linear-gradient(-90deg, rgba(248, 248, 248, 0) 0%, #F8F8F8 100%)',
              }"
              class="absolute left-0 z-10 h-full w-[94px]"
            ></div>
            <div
              :style="{
                background:
                  'linear-gradient(90deg, rgba(248, 248, 248, 0) 0%, #F8F8F8 100%)',
              }"
              class="absolute right-0 z-10 h-full w-[94px]"
            ></div>
          </template>
          <SwiperSlide v-for="model in models" class="!w-fit">
            <MiniThumbCard :model="model" />
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
      <div class="mt-4 md:mt-8">
        <ClientOnly>
          <Swiper
            :modules="[Controller]"
            :controller="{ control: modelsThumbSwiper }"
            @swiper="modelsSwiper = $event"
            :slides-per-view="1"
            :centered-slides="true"
            :space-between="16"
            :slides-offset-after="parseInt(pagePadding + '')"
          >
            <template #container-start>
              <UIButtonCarousel
                position="left"
                :hide="activeModelIndex === 0"
                @click="slidePrev"
              />
              >
              <UIButtonCarousel
                position="right"
                :hide="activeModelIndex === slidesLength - 1"
                @click="slideNext"
              />
            </template>
            <SwiperSlide
              v-for="model in models"
              :style="{ '--padding': bounding.x.value + 'px' }"
              class="px-[var(--padding)]"
            >
              <ModelCard :model="model" />
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
      </div>
    </div>
  </UISection>
</template>
