<script setup lang="ts">
import { useContainer } from '@/composables/useContainer'
import type { ModelLandingPage } from '~/server/api/models/[id]/index.get';

const { bounding } = useContainer()
const { gsap } = useGsap()
const { safe } = useSafeAccessMedia()
const route = useRoute()

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
    // pageAnimations.default()
  })
})

</script>
<template>
  <div>
    <OrganismModelHero />

    <MoleculeSection section-title="Специальные предложения">
      <ElementSlideView
:data="pageData?.specialOffers || []" :space-between="16"
        :slides-offset-before="bounding.x.value" :slides-offset-after="bounding.x.value" swiper-slide-class="!w-fit">
        <template #slide="{ item }">
          <div class="h-[408px] md:w-[310px] md:!px-0">
            <div class="mx-auto h-full max-w-[310px] bg-background">
              <div class="relative flex h-[222px] w-full items-center justify-center bg-gray-200">
                <img loading="lazy" :src="item.default_image" class="h-full w-full object-cover" />
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

    <OrganismModelThreeSixty :model-name="pageData?.model.name" :colors="pageData?.model.colors || []" />

    <MoleculeSection
id="shit" section-title="Варианты Carnival" subtitle="Комплектации"
      class="bg-background model-id_variants border">
      <template #after-title="{ align }">
        <p class="text-[15px] text-primary" :class="align">
          {{ pageData?.configurations.length }} доступных комплектаций
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
                  <span>от</span> {{ item.price }} <span>сум</span>
                </p>
              </div>
              <div class="px-6 py-4 2xl:p-8 flex flex-col flex-1">
                <div>
                  <b class="text-sm">Двигатель</b>
                  <p class="mt-2.5 text-sm">{{ item.engine }}</p>
                </div>
                <div class="flex flex-col mt-6 2xl:mt-8 flex-1 justify-between">
                  <div class="pb-5">
                    <b class="text-sm">Основные опции</b>
                    <div class="mt-2 space-y-2 text-sm">
                      <p
v-for="option in item.feature_groups.map((f) => f.features).flat().slice(0, 5)"
                        :key="option.name" class="md:text-base text-sm">
                        {{ option.name }}
                      </p>
                    </div>
                  </div>
                  <div class="border-t border-t-protection pt-5">
                    <button class="flex">
                      <span class="text-base font-semibold text-primary">Комплектации и цены</span>
                      <UITickToRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ElementSlideView>
      <div
        class="container space-y-3 mt-6 md:grid md:grid-cols-3 md:space-y-0 md:gap-5 2xl:flex 2xl:justify-center 2xl:mt-8 model-id_variants_action-buttons">
        <AtomButton mode="full" label="Отправить заявку" color="primary" />
        <AtomButton mode="full" color="secondary" label="Скачать прайс-лист" />
        <AtomButton mode="full" color="secondary" label="Контакты дилеров" />
      </div>
    </MoleculeSection>

    <OrganismModelBriefSection :blocks="pageData?.model.blocks || []" />

    <MoleculeSection section-title="Видео-обзоры">
      <template #title="{ sectionTitle, sectionTitleClass }">
        <h2 :class="[sectionTitleClass, 'mb-6']">{{ sectionTitle }}</h2>
      </template>
      <ElementSlideView
:data="pageData?.news || []" :space-between="16" :slides-offset-before="bounding.x.value"
        :slides-offset-after="bounding.x.value" swiper-slide-class="!w-fit !h-auto"
        :style="{ '--swiper-pagination-mt': '24px' }">
        <template #slide="{ item }">
          <div class="md:w-[310px] md:!px-0 h-full">
            <div class="mx-auto h-full max-w-[310px] bg-background">
              <div class="relative flex h-[190px] w-full items-center justify-center bg-gray-200">
                <img loading="lazy" :src="item.default_image" class="h-full w-full object-cover" />
                <UIPlayIcon2 class="absolute" />
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
align="left" section-title="Гарантия и сервис" subtitle="Обслуживание"
      class="flex flex-col-reverse gap-10 2xl:grid-cols-12 2xl:grid 2xl:gap-grid-12-gap container rtl">
      <template #title="{ sectionTitle, sectionTitleClass, subtitle, subtitleClass }">
        <div class="2xl:col-span-4 2xl:col-start-3 2xl:px-0 ltr flex flex-col justify-center">
          <h3 :class="[subtitleClass, 'mb-2 md:mb-2.5']">{{ subtitle }}</h3>
          <h2 :class="[sectionTitleClass, '!mb-0']">{{ sectionTitle }}</h2>
          <p class="mt-3 text-sm text-primary 2xl:mt-7.5 md:text-base">
            Автомобили Kia произведены по самым высоким стандартам автомобильной
            промышленности. Именно это исключительное качество позволяет Kia
            предложить уникальные условия гарантии.
          </p>
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

          <AtomButton label="Заказать звонок дилера" class="mt-6 mx-auto" color="secondary" mode="full" />

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
