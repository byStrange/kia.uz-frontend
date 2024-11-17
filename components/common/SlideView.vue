<script setup lang="ts">
import { useCssVar } from '@vueuse/core'
import { Pagination } from 'swiper/modules'
import type { Swiper } from 'swiper/types'

const { bounding } = useContainer()

const swiper = ref<null | Swiper>(null)

const swiperActiveIndex = computed(() => {
  return swiper.value ? swiper.value.activeIndex : 0
})

const swiperLength = computed(() => {
  if (!swiper.value || !swiper.value.pagination)
    return swiper.value?.slides?.length || 0
  return swiper.value ? swiper.value.pagination.bullets.length : 0
})

const md = useCssVar('--screen-md')
const lg = useCssVar('--screen-2xl')

watch(bounding.x, () => {
  swiperBreakpoints.value = {
    [md.value ? parseInt(md.value) : 0]: {
      slidesOffsetBefore: bounding.x.value,
      slidesOffsetAfter: bounding.x.value,
      spaceBetween: 35,
    },
    [lg.value ? parseInt(lg.value) : 0]: {
      slidesOffsetBefore: bounding.x.value,
      slidesOffsetAfter: bounding.x.value,
      spaceBetween: 35,
    },
  }
})

const swiperBreakpoints = ref({})

const props = withDefaults(
  defineProps<{
    data: any[]
    spaceBetween?: number
    slidesOffsetBefore?: number
    slidesOffsetAfter?: number
    paginator?: boolean
    swiperSlideClass?: string
    navigation?: boolean
    paginationMt?: string
    breakpointsEnabled?: boolean
    paginatorClass?: string
    navigiationMode?: 'normal' | 'oneside-left'
    navigationType?: 'lg' | 'sm'
  }>(),
  {
    navigation: true,
    paginator: true,
    breakpointsEnabled: true,
    navigiationMode: 'normal',
  },
)

watch(swiper, () => {
  if (!props.paginator) {
    swiper.value?.el.querySelector('.swiper-pagination')?.remove()
  }
  if (props.paginatorClass) {
    swiper.value?.el
      .querySelector('.swiper-pagination')
      ?.classList.add(props.paginatorClass)
  }
})

defineExpose({
  swiper,
})
</script>
<template>
  <div>
    <ClientOnly>
      <Swiper
        :style="{
          '--swiper-pagination-mt': paginationMt,
        }"
        :breakpoints="breakpointsEnabled ? swiperBreakpoints : {}"
        slides-per-view="auto"
        :modules="[Pagination]"
        :pagination="true"
        :slides-offset-before="slidesOffsetBefore"
        :slides-offset-after="slidesOffsetAfter"
        :space-between="spaceBetween"
        class="light-pagination"
        @swiper="swiper = $event"
        :key="bounding.x.value"
        v-bind="$attrs"
      >
        <template #container-start>
          <template v-if="navigiationMode == 'normal'">
            <UIButtonCarousel
              v-if="navigation"
              position="left"
              :hide="swiperActiveIndex === 0"
              @click="swiper?.slidePrev()"
              :mode="navigiationMode"
              :size="navigationType"
            />

            <UIButtonCarousel
              v-if="navigation"
              position="right"
              :hide="swiperActiveIndex === swiperLength - 1"
              @click="swiper?.slideNext()"
              :size="navigationType"
              :mode="navigiationMode"
            />
          </template>
          <template v-else-if="navigiationMode == 'oneside-left'">
            <div
              class="absolute right-15 z-40 h-full flex flex-col justify-center items-center gap-2"
            >
              <UIButtonCarousel
                position="right"
                v-if="navigation"
                :hide="swiperActiveIndex === swiperLength - 2"
                @click="swiper?.slideNext()"
                :size="navigationType"
                :mode="navigiationMode"
              />
              <UIButtonCarousel
                position="left"
                v-if="navigation"
                :hide="swiperActiveIndex === 0"
                @click="swiper?.slidePrev()"
                :mode="navigiationMode"
                :size="navigationType"
              />
            </div>
          </template>
          <slot name="navigation" />
        </template>
        <SwiperSlide
          class="md:!w-fit"
          v-for="item in data"
          :class="swiperSlideClass"
        >
          <slot name="slide" :item :bounding> </slot>
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </div>
</template>
