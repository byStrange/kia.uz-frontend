<script setup lang="ts" generic="T">
import { useCssVar } from '@vueuse/core'
import { Pagination } from 'swiper/modules'
import type { Swiper } from 'swiper/types'
import { initCustomFormatter } from 'vue';

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
  if (props.breakpoints) {
    swiperBreakpoints.value = props.breakpoints
    return
  }
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
    data: T[]
    spaceBetween?: number
    slidesOffsetBefore?: number
    slidesOffsetAfter?: number
    paginator?: boolean
    slidesPerView?: number | 'auto'
    swiperSlideClass?: string
    navigation?: boolean
    breakpoints?: object
    paginationGap?: string
    breakpointsEnabled?: boolean
    paginatorClass?: string
    navigationMode?: 'normal' | 'oneside-left'
    navigationType?: 'lg' | 'sm'
  }>(),
  {
    navigation: true,
    paginator: true,
    slidesPerView: 'auto',
    breakpoints: undefined,
    spaceBetween: 0,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    swiperSlideClass: '',
    breakpointsEnabled: true,
    navigationMode: 'normal',
    paginationGap: '12px',
    navigationType: 'lg',
    paginatorClass: 'mt-4 md:mt-8',
  },
)

watch(swiper, () => {
  if (!props.paginator) {
    swiper.value?.el.querySelector('.swiper-pagination')?.remove()
  }
  if (props.paginatorClass) {
    props.paginatorClass.split(' ').forEach((className) => {
      swiper.value?.el
        .querySelector('.swiper-pagination')
        ?.classList.add(className)
    })
  }
})

// const { gsap } = useGsap()
const slideView = useTemplateRef('slideView')

onMounted(() => {
  nextTick(() => {
    if (!slideView.value) return;
    /*
gsap.fromTo(slideView.value.querySelectorAll('.swiper-slide > div'), {
      opacity: 0,
      yPercent: -15,
    }, {
      opacity: 1,
      yPercent: 0,
      stagger: 0.3,
      scrollTrigger: {
        trigger: slideView.value,
        start: 'top bottom',
        end: '+=400',
      }
    })


    */

  })
})

defineExpose({
  swiper,
})
</script>
<template>
  <div ref="slideView" class="molecule-slideview">
    <Swiper :init="false"  :key="bounding.x.value" :style="{
      '--swiper-pagination-bullet-horizontal-gap': 0, //  to disable default swiper bullet gap
      '--swiper-pagination-gap': paginationGap,
    }" :breakpoints="breakpointsEnabled ? swiperBreakpoints : breakpoints" :slides-per-view="slidesPerView"
      :modules="[Pagination]" :pagination="true" :slides-offset-before="slidesOffsetBefore"
      :slides-offset-after="slidesOffsetAfter" :space-between="spaceBetween" class="light-pagination" v-bind="$attrs"
      @swiper="swiper = $event">
      <template #container-start>
        <template v-if="navigationMode == 'normal'">
          <MoleculeButtonCarousel v-if="navigation" position="left" :hide="swiperActiveIndex === 0"
            :mode="navigationMode" :size="navigationType" @click="swiper?.slidePrev()" />

          <MoleculeButtonCarousel v-if="navigation" position="right" :hide="swiperActiveIndex === swiperLength - 1"
            :size="navigationType" :mode="navigationMode" @click="swiper?.slideNext()" />
        </template>
        <template v-else-if="navigationMode == 'oneside-left'">
          <div class="absolute right-15 z-40 h-full flex flex-col justify-center items-center gap-2">
            <MoleculeButtonCarousel v-if="navigation" position="right" :hide="swiperActiveIndex === swiperLength - 2"
              :size="navigationType" :mode="navigationMode" @click="swiper?.slideNext()" />
            <MoleculeButtonCarousel v-if="navigation" position="left" :hide="swiperActiveIndex === 0"
              :mode="navigationMode" :size="navigationType" @click="swiper?.slidePrev()" />
          </div>
        </template>
        <slot name="navigation" />
      </template>
      <SwiperSlide v-for="(item, index) in data" :key="index" class="md:!w-fit" :class="swiperSlideClass">
        <slot name="slide" :item :bounding />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
