<script setup lang="ts">
import { useContainer } from '@/composables/useContainer'

const { bounding } = useContainer()
const { headerService } = useHeaderService()

definePageMeta({
  layout: 'model-layout',
})

const variants = ref([
  {
    label: 'Comfort',
    price_start: 543_510_000,
    engine: '3.5 MPI / 272 л.с., Бензин',
    mainOptions: [
      'Подогрев передних сидений',
      'Рейлинги на крыше',
      'Сиденья с отделкой искусственной кожей',
      'Система контроля слепых зон (BCW)',
      'Датчик дождя',
    ],
  },
  {
    label: 'Luxe Light',
    price_start: 584_910_000,
    engine: '3.5 MPI / 272 л.с., Бензин',
    mainOptions: [
      'Подогрев передних сидений',
      'Рейлинги на крыше',
      'Сиденья с отделкой искусственной кожей',
      'Система контроля слепых зон (BCW)',
      'Салонное зеркало с автоматическим затемнением (ECM)',
    ],
  },
  {
    label: 'Luxe',
    price_start: 620_010_000,
    engine: '3.5 MPI / 272 л.с., Бензин',
    mainOptions: [
      'Подогрев передних сидений',
      'Рейлинги на крыше',
      'Сиденья с отделкой искусственной кожей',
      'Система контроля слепых зон (BCW)',
      'Салонное зеркало с автоматическим затемнением (ECM)',
    ],
  },
  {
    label: 'Prestige Light',
    price_start: 629_910_000,
    engine: '3.5 MPI / 272 л.с., Бензин',
    mainOptions: [
      'Подогрев передних сидений',
      'Рейлинги на крыше',
      'Сиденья с отделкой искусственной кожей',
      'Система контроля слепых зон (BCW)',
      'Салонное зеркало с автоматическим затемнением (ECM)',
    ],
  },
])

onMounted(() => {
  headerService.value.lockHover = true
  headerService.value.isHeaderFixed = true
})

const { courses } = useStore()
</script>
<template>
  <div>
    <SectionModelHero />

    <UISection sectionTitle="Специальные предложения">
      <UISlideView
        :data="courses"
        :space-between="16"
        :slides-offset-before="bounding.x.value"
        :slides-offset-after="bounding.x.value"
        swiper-slide-class="!w-fit"
      >
        <template #slide="{ item }">
          <div class="h-[408px] md:w-[310px] md:!px-0">
            <div class="mx-auto h-full max-w-[310px] bg-background">
              <div
                class="relative flex h-[222px] w-full items-center justify-center bg-gray-200"
              >
                <img
                  loading="lazy"
                  :src="item.thumbnail"
                  class="h-full w-full object-cover"
                />
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
      </UISlideView>
    </UISection>

    <SectionThreeSixty />

    <UISection
      sectionTitle="Варианты Carnival"
      subtitle="Комплектации"
      class="bg-background"
    >
      <template #after-title="{ align }">
        <p class="text-[15px] text-primary" :class="align">
          5 доступных комплектаций
        </p>
      </template>

      <UISlideView
        :space-between="16"
        :slides-offset-before="bounding.x.value"
        :slides-offset-after="bounding.x.value"
        swiper-slide-class="!w-fit"
        :navigation="false"
        :data="variants"
        class="mt-6 2xl:mt-8"
        :paginator="false"
      >
        <template #slide="{ item }">
          <div
            class="max-w-[425px] w-[--width] md:!px-0 2xl:h-[512px] 2xl:w-4h md:h-[448px]"
            :style="{ '--width': bounding.width.value + 'px' }"
          >
            <div class="w-full bg-white h-full flex flex-col">
              <div class="bg-primary px-6 py-4">
                <h1 class="text-2xl font-semibold text-white">
                  {{ item.label }}
                </h1>
                <p class="mt-1 text-base font-semibold text-white">
                  <span>от</span> {{ item.price_start }} <span>сум</span>
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
                        v-for="option in item.mainOptions"
                        class="md:text-base text-sm"
                      >
                        {{ option }}
                      </p>
                    </div>
                  </div>
                  <div class="border-t border-t-protection pt-5">
                    <button class="flex">
                      <span class="text-base font-semibold text-primary"
                        >Комплектации и цены</span
                      >
                      <UITickToRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </UISlideView>
      <div
        class="container space-y-3 mt-6 md:grid md:grid-cols-3 md:space-y-0 md:gap-5 2xl:flex 2xl:justify-center 2xl:mt-8"
      >
        <UIButton mode="full" label="Отправить заявку" color="secondary" />
        <UIButton mode="full" label="Скачать прайс-лист" />
        <UIButton mode="full" label="Контакты дилеров" />
      </div>
    </UISection>

    <SectionBriefSection />

    <UISection sectionTitle="Видео-обзоры">
      <template #title="{ sectionTitle, sectionTitleClass }">
        <h2 :class="[sectionTitleClass, 'mb-6']">{{ sectionTitle }}</h2>
      </template>
      <UISlideView
        :data="courses"
        :space-between="16"
        :slides-offset-before="bounding.x.value"
        :slides-offset-after="bounding.x.value"
        swiper-slide-class="!w-fit !h-auto"
        :style="{ '--swiper-pagination-mt': '24px' }"
      >
        <template #slide="{ item }">
          <div class="md:w-[310px] md:!px-0 h-full">
            <div class="mx-auto h-full max-w-[310px] bg-background">
              <div
                class="relative flex h-[190px] w-full items-center justify-center bg-gray-200"
              >
                <img
                  loading="lazy"
                  :src="item.thumbnail"
                  class="h-full w-full object-cover"
                />
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
      </UISlideView>
    </UISection>

    <UISection
      align="left"
      sectionTitle="Гарантия и сервис"
      subtitle="Обслуживание"
      class="flex flex-col-reverse gap-10 2xl:grid-cols-12 2xl:grid 2xl:gap-grid-12-gap container rtl"
    >
      <template
        #title="{ sectionTitle, sectionTitleClass, subtitle, subtitleClass }"
      >
        <div
          class="2xl:col-span-4 2xl:col-start-3 2xl:px-0 ltr flex flex-col justify-center"
        >
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
        <img
          src="@/assets/fiveyear-guarantee.svg"
          class="w-full md:w-4h mx-auto 2xl:w-full"
        />
      </div>
    </UISection>

    <UISection
      sectionTitle="Узнайте больше о Carnival"
      subtitle="Консультация"
      class="container bg-no-repeat bg-[length:100%_294px] md:bg-[length:100%_405px] 2xl:bg-[length:100%_500px] 2xl:pt-1h"
      :style="{
        '--background-image-url':
          'url(https://ucarecdn.com/a1c7c1cf-4da7-4d94-99c6-875d0ae2c0b8/)',
        backgroundImage: 'var(--background-image-url)',
      }"
    >
      <template
        #title="{ sectionTitle, sectionTitleClass, subtitle, subtitleClass }"
      >
        <div>
          <h3
            :class="[
              subtitleClass,
              'mb-2 md:mb-2.5 !text-kia-polar-white 2xl:text-sm+',
            ]"
          >
            {{ subtitle }}
          </h3>
          <h2
            :class="[
              sectionTitleClass,
              '!mb-0 !text-kia-polar-white md:!text-5xl',
            ]"
          >
            {{ sectionTitle }}
          </h2>

          <UIButton
            label="Заказать звонок дилера"
            class="mt-6 mx-auto"
            mode="full"
          />
          <picture>
            <source
              media="(min-width: 1440px)"
              srcset="
                https://ucarecdn.com/8a65cac6-38ee-423e-b2ff-a0956b9e931a/-/preview/1090x432/
              "
            />
            <source
              srcset="
                https://ucarecdn.com/883cdd7b-0dd4-497f-b7b2-851a82681f6f/-/preview/543x247/
              "
              media="(min-width: 768px)"
            />
            <img
              class="w-full my-4 md:my-6 2xl:mb-1.5 2xl:mt-5"
              src="https://ucarecdn.com/bb0d5bc2-3996-48bd-8e7e-249b03311384/-/preview/313x143/"
            />
          </picture>
          <div class="2xl:grid 2xl:grid-cols-12 2xl:gap-grid-12-gap">
            <p class="text-xs text-caption 2xl:col-start-3 col-span-9">
              Для наглядности было использовано виртуальное изображение.
              Приведенные выше технические характеристики могут отличаться в
              зависимости от комплектации, количества посадочных мест для каждой
              модели, двигателя и выбранных опций
            </p>
          </div>
        </div>
      </template>
    </UISection>
  </div>
</template>
