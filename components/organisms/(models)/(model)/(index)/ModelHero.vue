<script setup lang="ts">
import type { ModelLandingPage } from '~/server/api/models/[id]/index.get';

const { safe } = useSafeAccessMedia()
const { offset } = useContainer()
const { gsap } = useGsap()
const { downloadFile } = useDownload()
const locale = useLocalePath()

const video = useTemplateRef('video')

const modelData = useSharedPageData<ModelLandingPage>()

const pageData = computed(() => ({
  priceList: safe('/pdf-outputs/' + modelData.value?.model.price_list),
  title: modelData.value?.model.name,
  preTitle: modelData.value?.model.pre_title,
  postTitle: modelData.value?.model.post_title,
  blocks: modelData.value?.model.blocks.filter((block) => block.type === 'heroIcon'),
  images: {
    defaultImage: safe(modelData.value?.model.default_image),
    tabletImage: safe(modelData.value?.model.tablet_image),
    desktopImage: safe(modelData.value?.model.desktop_image),
  }
}))

const pageAnimations = {
  heroAnimations() {
    gsap.from('.model-id_model-hero-img', {
      duration: 1.5,
      scale: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.model-id_model-hero-img',
        start: 'top center',
        end: 'bottom center',
      }
    });

    gsap.from('.model-id_model-title', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.5
    });

    gsap.from('.model-id_model-tagline', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.8
    });

    gsap.from('.model-id_model-features svg', {
      duration: 0.8,
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      ease: 'back.out(1.7)',
      delay: 0.3
    });

    gsap.from('.model-id_model-features p', {
      duration: 0.8,
      y: 20,
      opacity: 0,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.3
    });


  },
}

onMounted(() => {
  pageAnimations.heroAnimations()
  if (video.value) video.value.play()
})
</script>
<template>
  <div class="h-screen overflow-hidden bg-primary">
    <UISafeAreaView :extra="52">
      <div
data-label="Hero shadow bottom" aria-hidden="true"
        class="hero-slider-shade long absolute bottom-0 z-10 h-[428px] w-full md:h-[356px]" />

      <div
data-label="Hero top" :style="{
        '--gradient-md': 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 100%)',
        '--gradient-2xl': 'linear-gradient(180deg, rgba(5, 20, 31, 0.5) 24.47%, rgba(5, 20, 31, 0) 100%)'
      }"
        class="container absolute hidden h-[190px] w-full items-start justify-end gap-6 pt-7.5 md:block md:bg-[image:--gradient-md] 2xl:bg-[image:--gradient-2xl] 2xl:pt-5 z-10">
        <MoleculeBreadcrumb class="hidden bg-transparent text-white 2xl:block" theme="light" />
        <div class="flex w-full items-start justify-end gap-6 2xl:mt-4.5">
          <AtomButton
:label="$t('common.download_price_list')" color="secondary" mode="full"
            @click="downloadFile(pageData.priceList)" />
          <AtomButton
:label="$t('models.request_dealer_call')" color="primary"
            mode="full" @click="$router.push(locale('/feedback'))" />
        </div>
      </div>
      {{ modelData?.model.video }}
      <div v-if="modelData?.model.video" class="relative w-full h-full">
        <video
ref="video" :src="safe(modelData.model.video)" muted
          class="h-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full" />

      </div>
      <MoleculeResponsiveImage
v-else
        class="w-full object-cover 2xl:h-full md:h-[73%] model-id_model-hero-img bg-[image:--image] bg-cover"
        :default-image="pageData.images.defaultImage" :desktop-image="pageData.images.desktopImage"
        :tablet-image="pageData.images.tabletImage" />
      <div
data-label="Hero bottom"
        class="absolute !left-0 bottom-[31px] z-10 flex w-full items-end justify-center md:!left-auto md:bottom-15 md:justify-start md:pb-0 2xl:bottom-16"
        :style="{
          left: offset.offsetLeft.value + 'px',
          padding: `0 ${offset.offsetLeft.value}px`,
        }">
        <div class="flex w-full">
          <div class="w-full md:px-0 2xl:grid 2xl:grid-cols-12 2xl:gap-10">
            <div class="space-y-2.5 text-white md:space-y-2 2xl:col-span-3 model-id_model-intro-text">
              <p class="text-sm text-white md:text-lg">{{ pageData.preTitle }}</p>

              <h1 class="mt-1 text-2xl font-semibold md:mt-2 md:text-4xl 2xl:mt-4 2xl:text-7xl model-id_model-title">{{
                pageData.title }}</h1>

              <p class="mt-1 text-sm md:mt-2 md:text-lg 2xl:mt-4 model-id_model-tagline">{{ pageData.postTitle
                }}</p>
            </div>
            <div class="mt-6 space-y-4 md:hidden">
              <AtomButton
:label="$t('models.request_dealer_call')" color="secondary" mode="full"
                @click="$router.push(locale('/feedback'))" />
              <AtomButton
:label="$t('common.download_price_list')" color="primaryDark" mode="full"
                @click="downloadFile(pageData.priceList)" />
            </div>
            <div
              class="col-span-6 mt-6 space-y-4 text-white md:mt-10 md:grid md:grid-cols-3 md:space-y-0 2xl:col-start-7 2xl:gap-10 model-id_model-features">
              <div
v-for="block in pageData.blocks" :key="block.id"
                class="flex items-center gap-2.5 md:flex-col md:items-start">
                <img :src="safe(block.icon)" class="w-10 md:size-12.5" />
                <p class="text-xs text-protection">
                  {{ block.title }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UISafeAreaView>
  </div>
</template>
