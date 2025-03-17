<script setup lang="ts">
import type { ModelLandingPage } from '~/server/api/model/carnival.get';

const route = useRoute()
const data = useSharedPageData<ModelLandingPage>()
const { safe } = useSafeAccessMedia()

const is = (r: string) => {
  return route.name?.toString().split('-')[2]?.split('___')[0] === r
}

const isHome = () => !is('pricing')

const { headerService } = useHeaderService()
const { gsap } = useGsap()

onMounted(() => {
  const tm = gsap.timeline()

  tm.from('.model-bar_left > *:not(.divider)', {
    y: -20,
    opacity: 0,
    duration: 0.4,
    stagger: 0.2
  }).from(['.model-bar_right li', '.model-bar_right > div:last-child'], {
    y: -20,
    opacity: 0,
    duration: 0.4,
    stagger: 0.2,
  })
    .from('.model-bar .divider', {
      top: -14, height: 52, duration: 0.4, stagger: .3, ease: 'elastic.inOut'
    })
})

</script>
<template>
  <div
data-label="Model bar"
    class="fixed top-0 z-20 w-full bg-primary px-page-padding py-3.5 transition-all duration-300 model-bar" :class="{
      '!top-[--header-height]': headerService.isHeaderFixed,
      '!z-10': headerService.isMenuOpen,
    }">
    <div class="2xl:container flex justify-between">
      <div class="2xl:flex relative model-bar_left" data-label="Model bar left">
        <button class="flex gap-2 text-white 2xl:2xl:pr-5" @click="$router.push('/models/1')">
          <span class="2xl:text-lg">{{ data?.model.name }}</span>
          <UITickToBottom class="text-white 2xl:hidden" />
        </button>
        <div class="divider w-1px left-11 h-full bg-caption 2xl:block hidden absolute"></div>
        <UIDesktopOnly flex class="gap-2 pl-5 text-white">
          <p class="text-base">от {{ data?.model.starting_price }} сум</p>
          <button>
            <UIInfoIcon />
          </button>
        </UIDesktopOnly>
      </div>
      <div class="2xl:flex model-bar_right relative" data-label="Model bar right">
        <UIDesktopOnly class="pr-5">
          <ul class="flex items-center gap-6 text-white">
            <li v-if="data?.model.slug">
              <NuxtLinkLocale
:to="`/models/${data.model.slug}`" class="text-base text-white link-hover py-1"
                :class="{ hover: isHome() }">Обзор
              </NuxtLinkLocale>
            </li>
            <li v-if="data?.model.slug">
              <NuxtLinkLocale
:to="`/models/${data.model.slug}/pricing`" class="text-base text-white py-1 link-hover" :class="{
                hover: is('pricing')
              }">Комплектации и
                цены</NuxtLinkLocale>
            </li>
            <li>
              <a href="#" class="text-base text-white py-1 link-hover">Характеристики</a>
            </li>
            <li v-if="data?.model.brochure">
              <a :href="safe(data.model.brochure)" download class="text-base text-white py-1 link-hover">Брошюра</a>
            </li>
            <li class="flex items-center">
              <button class="text-white">
                <UIMoreIcon />
              </button>
            </li>
          </ul>
        </UIDesktopOnly>
        <div class="divider w-1px right-[138px] h-full bg-caption 2xl:block hidden absolute"></div>
        <div class="pl-5">
          <button class="text-white link-hover ">Конфигуратор</button>
        </div>
      </div>
    </div>
  </div>
</template>
