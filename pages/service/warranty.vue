<script setup lang="ts">
const { paddingTop } = useSafeArea()
const { src } = useUploadcareSource()
const { bounding } = useContainer()
</script>
<template>
  <div>
    <div
      class="h-5h overflow-hidden grid place-items-end md:place-items-start md:pt-[--safe-area-padding-top] md:h-[420px] 2xl:h-6h 2xl:place-items-end relative"
      :style="{
        '--safe-area-padding-top': paddingTop,
      }">
      <div
        class="shadowman absolute w-full h-full top-0 left-0 z-10 bg-[image:--gradient] md:bg-[image:--gradient-md] 2xl:bg-[image:--gradient-2xl]"
        :style="{
          '--gradient':
            'linear-gradient(180deg, rgba(8, 20, 30, 0.4) 0%, rgba(8, 20, 30, 0.589696) 40.99%, #08141E 65.6%), linear-gradient(0deg, rgba(5, 20, 31, 0) 91.15%, rgba(5, 20, 31, 0.2) 104.95%)',
          '--gradient-md':
            'radial-gradient(78.36% 75.48% at 67.71% 48.81%, rgba(0, 0, 0, 0) 25%, #08141E 100%), linear-gradient(0deg, rgba(8, 20, 30, 0.2), rgba(8, 20, 30, 0.2))',
          '--gradient-2xl':
            'linear-gradient(180deg, #05141F -8.93%, rgba(5, 20, 31, 0) 16.55%), radial-gradient(44.38% 112.58% at 72.19% 50%, rgba(0, 0, 0, 0) 25%, #08141E 100%)',
        }"></div>
      <picture>
        <source :srcset="src('e96a0162-4ea7-4624-94c5-78fccfc2bd01', { preview: '1440x492' })
          " media="(min-width: 1440px)" />
        <source :srcset="src('1e60dd0d-26b2-4c4e-b463-44ae5daf658f', { preview: '768x420' })
          " media="(min-width: 768px)" />
        <img class="w-full absolute top-0 left-0 h-full object-cover md:h-auto 2xl:h-full" :src="src('328d7a24-58da-4f8c-a371-e9fecb175d4f', { preview: '375x490' })
          " />
      </picture>
      <div class="!px-0 py-5 absolute left-[--left] top-[--safe-area-padding-top] hidden 2xl:block z-20"
        :style="{ '--left': bounding.x.value + 'px' }">
        <MoleculeBreadcrumb theme="light" />
      </div>
      <div
        class="container py-10 md:h-[360px] md:flex md:flex-col md:justify-end md:items-start 2xl:h-auto 2xl:pt-10 2xl:pb-20 relative z-20">
        <h1 class="text-2xl text-white">Гарантия</h1>
      </div>
    </div>

    <UIContainer class="space-y-5 py-12  2xl:grid 2xl:grid-cols-12 2xl:gap-x-grid-12-gap 2xl:space-y-7.5">
      <div class="text-primary space-y-2.5 2xl:col-start-3 2xl:col-end-11">
        <p class="text-sm 2xl:text-xs">ОБСЛУЖИВАНИЕ</p>
        <h1 class="text-2xl md:text-4xl 2xl:text-5xl">Гарантия и сервис</h1>
      </div>
      <div class="2xl:col-start-3 2xl:col-end-11">
        <p class="text-sm md:text-base+">
          Полная уверенность в наших автомобилях позволяет Kia обеспечивать
          надежную работу узлов и агрегатов в течение 60 месяцев или 150 000 км
          пробега (в зависимости от того, что наступит ранее) при условии
          соблюдения Вами рекомендаций, изложенных в руководстве по эксплуатации
          автомобиля.
        </p>

        <div
          class="space-y-10 py-15 text-primary md:py-[75px] 2xl:py-20 2xl:space-y-0 2xl:grid 2xl:gap-x-grid-12-gap 2xl:grid-cols-2 2xl:place-items-center">
          <img src="@/assets/fiveyear-guarantee.svg" class="w-full md:max-w-3h md:mx-auto 2xl:max-w-none" />
          <h1 class="text-lg md:text-2xl">
            Гарантируем работу узлов и агрегатов в течение 60 месяцев или 150
            000 км
          </h1>
        </div>

        <ul class="text-primary text-sm space-y-4 md:text-base+ 2xl:space-y-4.5">
          <li>
            <p>
              Наша уверенность основана на опыте и знаниях специалистов
              дилерской сети, которые возьмут на себя не только гарантийное
              техническое обслуживание Вашего автомобиля, но и устранение
              возможных неисправностей, используя при этом только оригинальные
              запчасти Kia. Дилеры Kia позаботятся о том, чтобы Ваш автомобиль
              всегда был «в форме» и удовлетворял Вашим самым взыскательным
              требованиям.
            </p>
          </li>
          <li>
            <p>
              Kia стремится к постоянному совершенствованию своей продукции,
              что может коснуться и Вашего автомобиля, поэтому Kia оставляет за
              собой право изменить некоторые условия и положения, упомянутые
              в сервисной книжке, без специального уведомления.
            </p>
          </li>
          <li>
            <p>
              Kia не ограничивается исключительно продажей автомобилей, но и
              обеспечивает квалифицированное техническое обслуживание. Одним из
              наших основных приоритетов является обеспечение комфорта при
              эксплуатации автомобилей Kia
            </p>
          </li>
        </ul>
      </div>
    </UIContainer>
    <UIContainer class="space-y-12.5 py-12 bg-background section-2 md:py-15 2xl:py-16 2xl:space-y-[75px]" :style="{
      '--divider-gap': '1rem', // 16px
      '--divider-gap-md': '2.5rem', // 40px
      '--divider-gap-2xl': '2.25rem' // 36px
    }">
      <h1 class="text-primary text-2xl md:text-4xl md:text-center 2xl:text-5xl">Ключевые преимущества</h1>
      <div
        class="space-y-[--divider-gap] md:space-y-[--divider-gap-md] main-content 2xl:grid 2xl:grid-cols-3 2xl:space-y-0 2xl:gap-x-[--divider-gap-2xl]">
        <div class="flex gap-x-9 md:relative">
          <UIChoiceIcon class="w-12.5 shrink-0" />
          <div>
            <p class="text-sm md:text-base">
              Автомобили Kia произведены согласно высоким стандартам
              производства в автомобильной промышленности. Именно это дает Kia
              возможность предложить Вам такой срок гарантии.
            </p>
          </div>
        </div>
        <div class="flex gap-x-9 md:relative">
          <UICarExchangeIcon class="12.5 shrink-0" />

          <div>
            <p class="text-sm md:text-base">
              Гарантия на автомобиль сохраняется после продажи автомобиля новому
              владельцу.
            </p>
          </div>
        </div>
        <div class="flex gap-x-9">
          <UIFinancialProgramsIcon class="w-12.5 shrink-0" />
          <p class="text-sm md:text-base">
            При наступлении гарантийного случая, ремонт будет выполнен без
            взимания дополнительной платы.
          </p>
        </div>
      </div>
    </UIContainer>
    <UIContainer class="py-12 text-primary space-y-4 md:space-y-7.5">
      <h1 class="text-2xl 2xl:text-3xl">Может быть полезным</h1>
      <div class="space-y-1 md:grid md:grid-cols-2 md:space-y-0 md:gap-1 2xl:grid-cols-3 2xl:w-1k">
        <div class="flex gap-x-2.5 p-5 bg-background items-center">
          <UIContractIcon class="w-12.5 shrink-0" />
          <div class="flex">
            <p class="text-sm md:text-base font-semibold">Запись на сервис</p>
            <UITickToRight />
          </div>
        </div>
        <div class="flex gap-x-2.5 p-5 bg-background items-center">
          <UIDealerOfficeIcon class="w-12.5 shrink-0" />
          <div class="flex">
            <p class="text-sm md:text-base font-semibold">Поиск дилера</p>
            <UITickToRight />
          </div>
        </div>
        <div class="flex gap-x-2.5 p-5 bg-background items-center">
          <UISparePartsIcon class="w-12.5 shrink-0" />
          <div class="flex">
            <p class="text-sm md:text-base font-semibold">Запчасти</p>
            <UITickToRight />
          </div>
        </div>
      </div>
    </UIContainer>
  </div>
</template>

<style scoped>
.section-2 .main-content>div:not(:last-child)>div {
  @apply pb-[--divider-gap] relative after:content-[''] after:left-0 after:absolute after:w-full after:bottom-0 after:border-b after:border-protection md:static md:pb-[--divider-gap-md] 2xl:pb-0 2xl:after:w-[1px] 2xl:after:top-0 2xl:after:h-full 2xl:pr-[--divider-gap-2xl] 2xl:after:border-b-0 2xl:after:border-r 2xl:relative 2xl:after:bottom-auto 2xl:after:left-full;
}
</style>
