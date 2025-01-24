<script setup lang="ts">
const { paddingTop } = useSafeArea()

const { bounding } = useContainer()

const { src } = useUploadcareSource()

const extraNavLinks = [
  { label: "Гарантия", link: "" },
  { label: "Адаптация к локальным условиям", link: "" },
  { label: "Поддержка клиентов", link: "" },
  { label: "Юридическая чистота", link: "" },
  { label: "Диагностика", link: "" },
  { label: "Запчасти", link: "" },
]
</script>

<template>
  <div>

    <div
      class="h-5h overflow-hidden grid place-items-end md:place-items-start md:pt-[--safe-area-padding-top] md:h-[420px] 2xl:h-6h 2xl:place-items-end relative"
      :style="{
        '--safe-area-padding-top': paddingTop,
      }">

      <UIBackgroundLayerContainer>
        <UIBackgroundLayer :layer="1" :gradient="{
          'default': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 50%, #05141F 85.12%), linear-gradient(0deg, rgba(5, 20, 31, 0) 88.93%, #05141F 110%)',
          md: 'radial-gradient(78.36% 75.48% at 67.71% 48.81%, rgba(0, 0, 0, 0) 25%, #08141E 100%), linear-gradient(0deg, rgba(8, 20, 30, 0.2), rgba(8, 20, 30, 0.2))',
          '2xl': 'linear-gradient(180deg, #05141F -8.93%, rgba(5, 20, 31, 0) 16.55%), radial-gradient(44.38% 112.58% at 72.19% 50%, rgba(0, 0, 0, 0) 25%, #08141E 100%)'
        }" />
        <UIBackgroundLayer :layer="2" :gradient="{
          'default': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 50%, #05141F 85.12%), linear-gradient(0deg, rgba(5, 20, 31, 0) 88.93%, #05141F 110%)',
          md: '',
          '2xl': ''
        }" />
      </UIBackgroundLayerContainer>

      <picture>
        <source :srcset="src('3509e846-8c66-46bb-80f9-9095ead5bc07', { preview: '1440x492' })
          " media="(min-width: 1440px)" />
        <source :srcset="src('486ecb33-97af-4986-8977-897fd7bdd4f6', { preview: '768x420' })
          " media="(min-width: 768px)" />
        <img class="w-full absolute top-0 left-0 h-full object-cover md:h-auto 2xl:h-full" :src="src('76ebd61d-62ed-4f6b-80cf-6128f254e331')
          " />
      </picture>

      <div class="!px-0 py-5 absolute left-[--left] top-[--safe-area-padding-top] hidden 2xl:block z-20"
        :style="{ '--left': bounding.x.value + 'px' }">
        <MoleculeBreadcrumb theme="light" />
      </div>

      <div
        class="container py-10 md:h-[360px] md:flex md:flex-col md:justify-end md:items-start 2xl:h-auto 2xl:pt-10 2xl:pb-20 relative z-20">
        <div class="text-white space-y-4 md:max-w-5.5h md:space-y-3 2xl:max-w-7.25h">
          <h1 class="text-3xl md:text-4xl 2xl:text-6xl+">Преимущества официального
            дистрибьютора</h1>
        </div>
      </div>
    </div>

    <div data-label="Hero bottom navbar"
      class="py-7.5 bg-primary flex gap-x-4 overflow-auto w-full px-[--padding-x] md:gap-x-10 justify-between" :style="{
        '--padding-x': bounding.x.value + 'px'
      }">
      <NuxtLink to="https://google.com" class="link-hover" v-for="link in extraNavLinks" :key="link.label">
        <div class="shrink-0 pb-1">
          <p class="text-base whitespace-nowrap font-semibold text-white">{{ link.label }}</p>
        </div>
      </NuxtLink>
    </div>

    <div data-label="main">
      <UISplitLayout direction="left" title="Гарантия">
        <template #left="{ sectionTitle, sectionTitleClass }">
          <div class="space-y-5 md:space-y-6 2xl:space-y-10">
            <div>
              <h1 :class="[
                sectionTitleClass,
                'mt-2 2xl:mt-2.5',
              ]" class="!mb-0">
                {{ sectionTitle }}
              </h1>
              <p :class="{
              }" class="text-sm text-primary mt-4 2xl:mt-7.5 split-left__description">Гарантия от производителя
                предоставляется только на автомобили, поставляемые официальным дистрибьютором. На автомобили,
                приобретенные у неофициальных дилеров или ввезенные частным образом, гарантия не распространяется.
                В официальных дилерских центрах установлено профессиональное сервисное оборудование и работают
                квалифицированные сотрудники. В случае поломки по гарантии, вы можете быть уверены, что ремонт будет
                выполнен качественно и с использованием оригинальных запчастей и за счет официального дистрибьютора.</p>

            </div>
            <AtomButton label="Подробнее о гарантии" color="secondary" />
          </div>
        </template>
        <template #right>
          <div class="md:container 2xl:max-w-none 2xl:p-0">
            <img class="max-h-[620px] md:w-[656px] md:mx-auto md:h-[645px] object-cover w-full "
              :src="src('c778d3e6-84ce-4621-b347-98f835972f33', { 'quality': 'lightest' })" />
          </div>
        </template>
      </UISplitLayout>

      <UIStackAndSplitLayout title="Адаптация к локальным условиям">
        <template #left="{ sectionTitle, sectionTitleClass }">
          <h1 :class="[
            sectionTitleClass,
          ]" class="!mb-0">
            {{ sectionTitle }}
          </h1>
        </template>

        <template #right>
          <p class="text-sm md:text-base+ text-primary">Можно с уверенностью утверждать, что автомобиль от официального
            дистрибьютора укомплектован и настроен для эксплуатации с учетом местного климата и состояния дорог.
            Максимум надежности и комфорта на весь срок использования автомобиля.</p>
        </template>
        <template #bottom>
          <picture>
            <source :srcset="src('5ac0fe3c-e189-4ae0-ae9a-8cf54e7caa28')" media="(min-width: 1440px)" />
            <source :srcset="src('500cdc30-3ef8-47f4-a3ef-c513aa80c955')" media="(min-width: 768px)" />
            <img :src="src('c0cf520e-3efe-441a-afda-57b0f2c4ad66')" class="w-full" />
          </picture>
        </template>
      </UIStackAndSplitLayout>

      <UIStackAndSplitLayout title="Поддержка клиентов" class="bg-background"
        :classNames="{ bottomContainer: '2xl:!mt-24 md:!mt-20 !mt-10' }">
        <template #left="{ sectionTitle, sectionTitleClass }">
          <h1 :class="[
            sectionTitleClass,
          ]" class="!mb-0">
            {{ sectionTitle }}
          </h1>
        </template>

        <template #right>
          <p class="text-sm md:text-base+ text-primary">Официальный дистрибьютор предоставляет клиентам широкую
            информационную поддержку. Вы можете получить консультацию по любым вопросам, связанным с приобретением и
            эксплуатацией вашего автомобиля.</p>
        </template>
        <template #bottom="{ containerClasses }">
          <div :class="containerClasses.container" class="md:flex md:justify-between relative text-primary">
            <div class="absolute w-[--width] h-1px bg-protection -top-5 md:-top-10 2xl:-top-12" :style="{
              '--width': `calc(100% - ${bounding.x.value * 2 + 'px'})`
            }"></div>
            <div :class="containerClasses.left" class="space-y-1 2xl:space-y-3">
              <h2 class="text-lg font-semibold md:text-2xl 2xl:text-3xl">1333</h2>
              <p class="text-sm md:text-base+">Горячая линия Kia</p>
            </div>
            <div :class="containerClasses.right" class="md:!mt-0 mt-5 space-y-1 2xl:space-y-3">
              <h2 class="text-lg font-semibold md:text-2xl 2xl:text-3xl">+998 71 215-70-07</h2>
              <p class="text-sm md:text-base+">Информационная линия Kia</p>
            </div>
          </div>
        </template>
      </UIStackAndSplitLayout>

      <UISplitLayout title="Юридическая чистота">
        <template #left="{ sectionTitle, sectionTitleClass }">
          <div class="space-y-5 md:space-y-6 2xl:space-y-10">
            <div>
              <h1 :class="[
                sectionTitleClass,
                'mt-2 2xl:mt-2.5',
              ]" class="!mb-0">
                {{ sectionTitle }}
              </h1>
              <p :class="{
              }" class="text-sm text-primary mt-4 2xl:mt-7.5 split-left__description">Покупая новый автомобиль у
                официального дилера, вы можете быть уверены, что автомобиль прошел все необходимые таможенные процедуры,
                не находится в угоне и не находится в залоге. При покупке вы получите все необходимые документы.
                Дилерская сеть контролируется официальным дистрибьютором, а дилер несёт ответственность перед
                покупателем.</p>

            </div>
            <AtomButton label="К модельному ряду Kia" color="secondary" />
          </div>
        </template>
        <template #right>
          <div class="md:container 2xl:max-w-none 2xl:p-0">
            <img class="max-h-[620px] md:w-[656px] md:mx-auto md:h-[645px] object-cover w-full "
              :src="src('45a1b07e-f311-454c-ab46-becd94d068e7', { 'quality': 'lightest' })" />
          </div>
        </template>
      </UISplitLayout>

      <UISplitLayout title="Качественная диагностика" direction="left">
        <template #left="{ sectionTitle, sectionTitleClass }">
          <div class="space-y-5 md:space-y-6 2xl:space-y-10">
            <div>
              <h1 :class="[
                sectionTitleClass,
                'mt-2 2xl:mt-2.5',
              ]" class="!mb-0">
                {{ sectionTitle }}
              </h1>
              <p :class="{
              }" class="text-sm text-primary mt-4 2xl:mt-7.5 split-left__description">Официальные дилеры проводят
                регулярное техническое обслуживание автомобилей в соответствии с рекомендациями производителя и с
                использованием специального оборудования. Автомобили, ввезенные в страну не через официального
                дистрибьютора, имеют отличные характеристики. Диагностика и ремонт могут быть затруднены.</p>

            </div>
            <AtomButton label="Записаться на сервис" color="secondary" />
          </div>
        </template>
        <template #right>
          <div class="md:container 2xl:max-w-none 2xl:p-0">
            <img class="max-h-[620px] md:w-[656px] md:mx-auto md:h-[645px] object-cover w-full "
              :src="src('aec8fc8a-d727-416d-8adc-ba52d482fddc', { 'quality': 'lightest' })" />
          </div>
        </template>
      </UISplitLayout>

      <UISplitLayout title="Оригинальные запчасти">
        <template #left="{ sectionTitle, sectionTitleClass }">
          <div class="space-y-5 md:space-y-6 2xl:space-y-10">
            <div>
              <h1 :class="[
                sectionTitleClass,
                'mt-2 2xl:mt-2.5',
              ]" class="!mb-0">
                {{ sectionTitle }}
              </h1>
              <p :class="{
              }" class="text-sm text-primary mt-4 2xl:mt-7.5 split-left__description">Официальный дистрибьютор
                обеспечивает поставку запасных частей, деталей и комплектующих для профессионального ремонта.
                Оригинальные запасные части являются залогом высокого качества ремонтных и сервисных работ.</p>

            </div>
            <AtomButton label="К запчастям" color="secondary" />
          </div>
        </template>
        <template #right>
          <div class="md:container 2xl:max-w-none 2xl:p-0">
            <img class="max-h-[620px] md:w-[656px] md:mx-auto md:h-[645px] object-cover w-full "
              :src="src('074aa58f-e334-4ec8-805e-e31efc8af325', { 'quality': 'lightest' })" />
          </div>
        </template>
      </UISplitLayout>
    </div>

  </div>


</template>
