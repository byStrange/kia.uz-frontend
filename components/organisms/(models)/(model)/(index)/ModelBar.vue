<script setup lang="ts">
import type { ModelLandingPage } from '~/server/api/models/[id]/index.get';
import { Menu } from 'primevue'

const route = useRoute()
const { downloadFile } = useDownload()
const data = useSharedPageData<ModelLandingPage>()
const { safe } = useSafeAccessMedia()
const locale = useLocalePath()
const router = useRouter()
const { t } = useI18n()

const is = (r: string) => {
  return route.name?.toString().split('-')[2]?.split('___')[0] === r
}

const isHome = () => !is('pricing') && !is('properties')

const mobileMenuItems = ref([
  { label: t('common.review'), command: () => router.push(locale(`/models/${route.params.id}`)) },
  { label: t('common.pricing'), command: () => router.push(locale(`/models/${route.params.id}/pricing`)) },
  { label: t('common.properties'), command: () => router.push(locale(`/models/${route.params.id}/properties`)) },
  { label: t('common.brochure'), command: () => downloadFile(safe(data.value?.model.brochure)) },
  { label: t('common.test_drive'), command: () => router.push(locale(`/models/${route.params.id}/test-drive`)) }
])

const desktopMenu = ref()
const mobileMenu = ref()

const toggleDestkopMenu = (event: Event) => {
  desktopMenu.value?.toggle(event);
}

const toggleMobileMenu = (event: Event) => {
  mobileMenu.value.toggle(event)
}

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
      top: -14, height: 52, duration: 0.4, stagger: .3,
    })
})

</script>
<template>
  <div data-label="Model bar"
    class="fixed top-0 z-20 w-full bg-primary px-page-padding py-3.5 transition-all duration-300 model-bar" :class="{
      '!top-[--header-height]': headerService.isHeaderFixed,
      '!z-10': headerService.isMenuOpen,
    }">
    <div class="2xl:container flex justify-between">
      <div class="2xl:flex relative model-bar_left" data-label="Model bar left">
        <button class="flex gap-2 text-white 2xl:2xl:pr-5" @click="toggleMobileMenu">
          <span class="2xl:text-lg">{{ data?.model.name }}</span>
          <UITickToBottom class="text-white 2xl:hidden" />
        </button>

        <Menu ref="mobileMenu" :popup="true" :model="mobileMenuItems" class="custom-dropdown-menu" />


        <UIDesktopOnly flex class="gap-2 pl-5 text-white relative">
          <div class="divider w-1px h-full bg-caption 2xl:block hidden left-0 absolute"></div>
          <p class="text-base">{{ $t("prefixes.from", {
            price: formatPrice(data?.model.starting_price,
              $t('prefixes.sum'))
          }) }}</p>
          <button>
            <UIInfoIcon />
          </button>
        </UIDesktopOnly>
      </div>
      <div class="2xl:flex model-bar_right relative" data-label="Model bar right">
        <UIDesktopOnly class="pr-5">
          <ul class="flex items-center gap-6 text-white">
            <li v-if="data?.model.slug">
              <NuxtLinkLocale :to="`/models/${data.model.slug}`" class="text-base text-white link-hover py-1"
                :class="{ hover: isHome() }">{{ $t('common.review') }}
              </NuxtLinkLocale>
            </li>
            <li v-if="data?.model.slug">
              <NuxtLinkLocale :to="`/models/${data.model.slug}/pricing`" class="text-base text-white py-1 link-hover"
                :class="{
                  hover: is('pricing')
                }">{{ $t('common.pricing') }}</NuxtLinkLocale>
            </li>
            <li v-if="data?.model.slug">
              <NuxtLinkLocale :to="`/models/${data.model.slug}/properties`" class="text-base text-white py-1 link-hover"
                :class="{
                  hover: is('properties')
                }">{{ $t('common.properties') }}</NuxtLinkLocale>
            </li>
            <li v-if="data?.model.brochure">
              <a target="_blank" :href="safe(data.model.brochure)" download class="text-base text-white py-1 link-hover">{{
                $t('common.brochure') }}</a>
            </li>
            <li v-if="data?.model.slug">
              <NuxtLinkLocale :to="`/models/${data.model.slug}/properties`" class="text-base text-white py-1 link-hover"
                :class="{
                  hover: is('properties')
                }">{{ $t('common.properties') }}</NuxtLinkLocale>
            </li>
            <li class="flex items-center">
              <button class="text-white" @click="toggleDestkopMenu">
                <UIMoreIcon />
              </button>
              <Menu ref="desktopMenu" :popup="true" :model="[
                { label: $t('common.test_drive'), command: () => $router.push(locale(`/models/${data?.model.slug}/test-drive`)) },
              ]" class="custom-dropdown-menu" />
            </li>
          </ul>
        </UIDesktopOnly>
        <div class="pl-5 relative">
          <div class="divider w-1px h-full left-0 bg-caption 2xl:block hidden absolute"></div>
        </div>
      </div>
    </div>
  </div>
</template>
