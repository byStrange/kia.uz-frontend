<script setup lang="ts">
import { useContainer } from '@/composables/useContainer'
import { Dialog } from 'primevue'
import type { ModelLandingPage } from '~/server/api/models/[id]/index.get';

const { bounding } = useContainer()
const { downloadFile } = useDownload()
const { gsap } = useGsap()
const { safe } = useSafeAccessMedia()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const showReviewModal = ref(false)
const selectedNews = ref<News | null>(null)
const locale = useLocalePath()

const handleReviewCardClik = (item: News) => {
  console.log(item)
  if (item.video_url) {
    showReviewModal.value = true;
    selectedNews.value = item
  }
  else {
    router.push(locale(`/news/${item.slug}`))
  }
}

const pageData = useSharedPageData<ModelLandingPage>()

if (!pageData.value) {
  const data = await useFetch(`/api/models/${route.params.id}`)

  pageData.value = data.data;
}

const footerContent = computed(() => {
  return pageData.value?.model.blocks.find((block) => block.type === 'footerContent')
})

definePageMeta({
  layout: 'model-layout',
  lockHover: true,
})

function url(s: string): string {
  return `url('${s}')`
}

const pageAnimations = {
  default() {
    gsap.from('.model-id_variants_action-buttons button', {
      opacity: 0,
      xPercent: -30,
      stagger: 0.02,
      scrollTrigger: {
        trigger: '#shit',
        start: 'center center',
      }
    })

  }
}

onMounted(() => {
  nextTick(() => {
    pageAnimations.default()
  })
})
</script>
<template>
  <div>

    <Dialog
v-model:visible="showReviewModal" :dismissable-mask="true" modal
      class="relative overflow-hidden border-none" pt:root:class="!border-0">
      <template #container="{ closeCallback }">
        <div class="absolute -right-6 -top-6">
          <button type="button" @click="closeCallback">
            <UIXIcon />
          </button>
        </div>
        <iframe
:src="selectedNews?.video_url" width="1000" height="600" allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          frameborder="0" />
      </template>
    </Dialog>
    <Dialog
v-model:visible="showReviewModal" :dismissable-mask="true" modal
      class="relative overflow-hidden border-none" pt:root:class="!border-0">
      <template #container="{ closeCallback }">
        <div class="absolute -right-6 -top-6">
          <button type="button" @click="closeCallback">
            <UIXIcon />
          </button>
        </div>
        <iframe
:src="selectedNews?.video_url" width="1000" height="600" allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          frameborder="0" />
      </template>
    </Dialog>

    <OrganismModelHero />

    <MoleculeSection v-if="pageData?.specialOffers.length" :section-title="t('index.special_offers')">
      <ElementSlideView
:data="pageData?.specialOffers || []" :space-between="16"
        :slides-offset-before="bounding.x.value" :slides-offset-after="bounding.x.value" swiper-slide-class="!w-fit">
        <template #slide="{ item }">
          <NuxtLinkLocale :to="`/special-offers/${item.slug}`">

            <div class="h-[408px] md:w-[310px] md:!px-0">
              <div class="mx-auto h-full max-w-[310px] bg-background">
                <div class="relative flex h-[222px] w-full items-center justify-center bg-gray-200">
                  <MoleculeImage :base-url="item.desktop_image || ''" class="h-[222px] w-full object-cover" />
                </div>

                <div class="p-7.5">
                  <p class="text-base font-semibold text-primary">
                    {{ item.title }}
                  </p>
                </div>
              </div>
            </div>
          </NuxtLinkLocale>
        </template>
      </ElementSlideView>
    </MoleculeSection>

    <!-- <OrganismModelThreeSixty :model-name="pageData?.model.name" :colors="pageData?.model.colors || []" /> -->

    <MoleculeSection
id="shit" :section-title="$t('common.model_variants', { model: pageData?.model.name })"
      :subtitle="$t('common.configurations')" class="bg-background model-id_variants border">
      <template #after-title="{ align }">
        <p class="text-[15px] text-primary" :class="align">
          {{ $t('common.available_configurations_count', { count: pageData?.configurations.length }) }}
        </p>
      </template>

      <ElementSlideView
:space-between="16" :slides-offset-before="bounding.x.value"
        :slides-offset-after="bounding.x.value" swiper-slide-class="!w-fit" :navigation="false"
        :data="pageData?.configurations || []" class="mt-6 2xl:mt-8" :paginator="false">
        <template #slide="{ item }">
          <div
class="max-w-[425px] w-[--width] md:!px-0 2xl:h-[512px] 2xl:w-4h md:h-[448px]"
            :style="{ '--width': bounding.width.value + 'px' }">
            <div class="w-full bg-white h-full flex flex-col">
              <div class="bg-primary px-6 py-4">
                <h1 class="text-2xl font-semibold text-white">
                  {{ item.name }}
                </h1>
                <p class="mt-1 text-base font-semibold text-white">
                  <span v-if="item.compare_price" class="line-through decoration-2 decoration-kia-live-red">{{
                    formatPrice(item.compare_price) }}</span>
                  {{ $t("prefixes.from", { price: formatPrice(item.price, $t('prefixes.sum')) }) }}
                </p>
              </div>
              <div class="px-6 py-4 2xl:p-8 flex flex-col flex-1">
                <div>
                  <b class="text-sm">{{ $t('common.engine') }}</b>
                  <p class="mt-2.5 text-sm">{{ item.engine }}</p>
                </div>
                <div class="flex flex-col mt-6 2xl:mt-8 flex-1 justify-between">
                  <div class="pb-5">
                    <b class="text-sm">{{ $t('common.main_options') }}</b>
                    <div class="mt-2 space-y-2 text-sm">
                      <p
v-for="option in item.feature_groups.map((f) => f.features).flat().slice(0, 4)"
                        :key="option.name" class="md:text-base text-sm">
                        {{ option.name }}
                      </p>
                    </div>
                  </div>
                  <div class="border-t border-t-protection pt-5">
                    <NuxtLinkLocale :to="`/models/${pageData?.model.slug}/pricing`">
                      <div class="flex">
                        <span class="text-base font-semibold text-primary">{{ $t('common.pricing') }}</span>
                        <UITickToRight />
                      </div>
                    </NuxtLinkLocale>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ElementSlideView>
      <div
        class="container space-y-3 mt-6 md:grid md:grid-cols-3 md:space-y-0 md:gap-5 2xl:flex 2xl:justify-center 2xl:mt-8 model-id_variants_action-buttons">
        <AtomLink to="/feedback" mode="full" :label="$t('common_form.submit_application')" color="primary" />
        <AtomButton
mode="full" color="secondary" :label="$t('common.download_price_list')"
          @click="downloadFile(safe('/pdf-outputs/' + pageData?.model.price_list))" />
        <AtomLink to="/dealers" mode="full" color="secondary" :label="$t('common.contact_dealers')" />
      </div>
    </MoleculeSection>

    <OrganismModelBriefSection :blocks="pageData?.model.blocks || []" :engines="pageData?.model.engines || []" />


    <MoleculeSection v-if="pageData?.news.length" :section-title="$t('common.video_reviews')">
      <template #title="{ sectionTitle, sectionTitleClass }">
        <h2 :class="[sectionTitleClass, 'mb-6']">{{ sectionTitle }}</h2>
      </template>
      <ElementSlideView
:data="pageData?.news || []" :space-between="16" :slides-offset-before="bounding.x.value"
        :slides-offset-after="bounding.x.value" swiper-slide-class="!w-fit !h-auto"
        :style="{ '--swiper-pagination-mt': '24px' }">
        <template #slide="{ item }">
          <div class="md:w-[310px] md:!px-0 h-full cursor-pointer" @click="handleReviewCardClik(item)">
            <div class="mx-auto h-full max-w-[310px] bg-background">
              <div class="relative flex h-[190px] w-full items-center justify-center bg-gray-200">
                <img loading="lazy" :src="item.default_image" class="h-full w-full object-cover" />
                <UIPlayIcon2 v-if="item.video_url" class="absolute" />
              </div>

              <div class="p-7.5">
                <p class="text-base font-semibold text-primary">
                  {{ item.title }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </ElementSlideView>
    </MoleculeSection>

    <MoleculeSection
align="left" :section-title="$t('warranty.warranty_and_service')"
      :subtitle="$t('warranty.service').toLowerCase()"
      class="flex flex-col-reverse gap-10 2xl:grid-cols-12 2xl:grid 2xl:gap-grid-12-gap container rtl">
      <template #title="{ sectionTitle, sectionTitleClass, subtitle, subtitleClass }">
        <div class="2xl:col-span-4 2xl:col-start-3 2xl:px-0 ltr flex flex-col justify-center">
          <h3 :class="[subtitleClass, 'mb-2 md:mb-2.5']">{{ subtitle }}</h3>
          <h2 :class="[sectionTitleClass, '!mb-0']">{{ sectionTitle }}</h2>
          <p class="mt-3 text-sm text-primary 2xl:mt-7.5 md:text-base">{{ $t('models.warranty_service_desc') }}</p>
        </div>
      </template>
      <div class="2xl:col-start-8 2xl:col-span-4 2xl:px-0">
        <img src="@/assets/fiveyear-guarantee.svg" class="w-full md:w-4h mx-auto 2xl:w-full" />
      </div>
    </MoleculeSection>

    <MoleculeSection
v-if="footerContent" :section-title="footerContent.title" :subtitle="footerContent.subtitle || ''"
      class="container bg-no-repeat bg-[length:100%_294px] md:bg-[length:100%_405px] 2xl:bg-[length:100%_500px] 2xl:pt-1h"
      :style="{
        '--background-image-url': url(safe(footerContent.footer_background_image)),
        backgroundImage: 'var(--background-image-url)',
      }">
      <template #title="{ sectionTitle, sectionTitleClass, subtitle, subtitleClass }">
        <div>
          <h3
:class="[
            subtitleClass,
            'mb-2 md:mb-2.5 !text-kia-polar-white 2xl:text-sm+',
          ]">
            {{ subtitle }}
          </h3>
          <h2
:class="[
            sectionTitleClass,
            '!mb-0 !text-kia-polar-white md:!text-5xl',
          ]">
            {{ sectionTitle }}
          </h2>

          <AtomButton :label="$t('models.request_dealer_call')" class="mt-6 mx-auto" color="secondary" mode="full" />

          <picture>

            <source media="(min-width: 1440px)" :srcset="safe(footerContent.desktop_image)" />
            <source :srcset="safe(footerContent.tablet_image)" media="(min-width: 768px)" />
            <img class="w-full my-4 md:my-6 2xl:mb-1.5 2xl:mt-5" :src="safe(footerContent?.default_image)" />
          </picture>
          <div class="2xl:grid 2xl:grid-cols-12 2xl:gap-grid-12-gap">
            <p class="text-xs text-caption 2xl:col-start-3 col-span-9">{{ footerContent.description }}</p>
          </div>
        </div>
      </template>
    </MoleculeSection>
  </div>
</template>
