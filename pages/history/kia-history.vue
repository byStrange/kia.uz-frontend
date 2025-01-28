<script setup lang="ts">
import StackAndSplitLayout from '~/components/layout/StackAndSplitLayout.vue';


const { src } = useUploadcareSource()
const { bounding } = useContainer()

const mainBodyRef = useTemplateRef('mainBody')

type StopPoints = string[]

function getCoords(elem: HTMLElement) { // crossbrowser version
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

const stops = computed<StopPoints>(() => {
  const offset = 96;
  const _stops: StopPoints = []
  if (!mainBodyRef.value) return []

  mainBodyRef.value.querySelectorAll('img').forEach((img: HTMLElement) => {
    const bounding = getCoords(img);
    console.log(img)
    _stops.push((bounding.top - window.innerHeight) + offset + 'px')
  })

  return _stops;
})

const extraLinksCard = [
  {
    title: 'Бренд',
    href: '#',
    image: src('8701cf69-f335-45be-b0d7-2c939d629d0f', { preview: '1000x664' }),
  },
  {
    title: 'Kia в Узбекистане',
    href: '#',
    image: src('907872e6-383c-4eee-8d95-4779a60485ca', { preview: '1000x664' }),
  },
  {
    title: 'Технологии',
    href: '#',
    image: src('b3436484-91af-4e8c-9678-d36a564a1a3f', {
      preview: '1000x664',
    }),
  },
]

onMounted(() => {
  console.log(stops.value)
})

definePageMeta({
  lockHover: true
})
</script>
<template>
  <UISafeAreaView>
    <div data-label="hero" class="relative">

      <UIBackgroundLayerContainer>
        <UIBackgroundLayer class="md:bg-primary/40" />
      </UIBackgroundLayerContainer>

      <picture>
        <source :srcset="src('8a04f460-1c61-4f55-b1d7-25c5324ff150')" media="(min-width: 768px)" />
        <img :src="src('8a04f460-1c61-4f55-b1d7-25c5324ff150')" alt="kia sponsoring"
          class="w-full md:h-[420px] object-cover 2xl:h-[calc(100vh-var(--header-height))]">
      </picture>

      <div class="container absolute top-0 z-10 py-5">
        <MoleculeBreadcrumb theme="light" />
      </div>

      <div
        class="relative z-10 py-7.5 container space-y-4 text-primary bg-background md:absolute md:bottom-0 md:bg-transparent md:text-white md:pb-10 2xl:top-15 2xl:pt-2.5">
        <h1 class="text-2xl md:text-4xl 2xl:text-9xl">История Kia</h1>
        <p class="text-base md:text-base+ 2xl:text-lg">75 лет прогресса и инноваций</p>
      </div>

    </div>


    <div class="py-12 md:py-15 2xl:py-1h" ref="mainBody">
      <div class="relative">
        <div class="center-line-path absolute left-1/2 top-0 w-1px h-full -translate-x-1/2 hidden 2xl:block">
          <div class="stop absolute w-5 h-0.5 bg-forest-green top-[--position-y] -translate-x-1/2 z-[1]" :key="stop"
            v-for="stop in stops" :style="{ '--position-y': stop }"></div>
          <div class="center-line absolute w-full h-full bg-protection z-0"></div>
        </div>

        <StackAndSplitLayout :class-names="{
          'container': 'flex flex-col-reverse !p-0',
          'topContainer': 'row-start-2 row-end-3 2xl:mt-5h md:mt-10 mt-12 2xl:col-start-3 2xl:!col-end-11 relative z-10',
          bottomContainer: 'col-start-3 col-end-11 row-start-1 row-end-2  2xl:!mt-0 !mt-0 2xl:!col-end-11'
        }">
          <template #right>
            <div class="2xl:pt-10 2xl:pb-16">
              <p class="2xl:text-lg">15 мая 1944 г. — основание компании Kyungѕung Precision Industries Ltd. — первого в
                Корее производителя
                велосипедов, а позже мотоциклов. Тогда зародилась мечта о том, чтобы стать первым корейским
                автопроизводителем.</p>
            </div>
          </template>
          <template #bottom>
            <div class="2xl:h-5h h-4h container 2xl:px-0">
              <div class="relative w-full h-full">
                <picture>
                  <source media="(min-width: 768px)" :srcset="src('809237f7-3b96-4a6f-8902-6226317e048b')" />
                  <img :src="src('809237f7-3b96-4a6f-8902-6226317e048b', { preview: '313x400' })" alt=""
                    class="h-full w-full object-cover">
                </picture>

                <UIBackgroundLayerContainer>
                  <UIBackgroundLayer :gradient="{
                    'default': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 57.64%, rgba(5, 20, 31, 0.481105) 67.74%, #05141F 93.35%), linear-gradient(180deg, rgba(5, 20, 31, 0) 50%, #05141F 100%)',
                    'md': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 57.64%, rgba(5, 20, 31, 0.481105) 67.74%, #05141F 93.35%), linear-gradient(180deg, rgba(5, 20, 31, 0) 50%, #05141F 100%)',
                    '2xl': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 57.64%, rgba(5, 20, 31, 0.481105) 67.74%, #05141F 93.35%)'
                  }" />
                </UIBackgroundLayerContainer>

                <div
                  class="absolute space-y-2.5 2xl:text-center px-5 pb-5 2xl:pb-15 2xl:px-15 bottom-0 text-white z-10">
                  <p class="text-base+ font-semibold 2xl:text-lg">1940-е</p>
                  <h1 class="text-2xl 2xl:text-3xl">Основание компании Kyungsung Precision Industries Ltd.</h1>
                </div>

              </div>
            </div>
          </template>
        </StackAndSplitLayout>

        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">1950-е</p>
              <p class="text-base+ text-primary 2xl:text-lg">Компания переименована в Kia Industries.</p>
            </div>
          </template>
        </UISplitLayout>


        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">1960-е</p>
              <p class="text-base+ text-primary 2xl:text-lg">В 1961 г. компания запускает лицензионное производство
                мотоциклов Kia Honda C100. К концу десятилетия в партнерстве с Mazda был налажен выпуск трехколесных
                моделей T2000 и T600. Их популярность позволила инвестировать в создание первого автомобиля собственной
                разработки.</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7 !mt-0'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">1970-е</p>
              <p class="text-base+ text-primary 2xl:text-lg">В 1974 г. стартовало производство первого полноразмерного
                автомобиля марки Kia. Седан Brisa снискал популярность у потребителей, и приобрел статус народного
                автомобиля. Он стал первым корейским автомобилем, преодолевшим отметку в 1 миллион проданных
                экземпляров.
              </p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">1980-е</p>
              <p class="text-base+ text-primary 2xl:text-lg">В 1986 г. начинается производство первой компактной модели
                -
                Kia Pride. Спустя год компания отправляет первую партию этих автомобилей на канадский рынок, а вскоре
                Pride появляется и в США.</p>
            </div>
          </template>
        </UISplitLayout>


        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7 !mt-0'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">1990-е</p>
              <p class="text-base+ text-primary 2xl:text-lg">Последнее десятилетие 20-го века стало поворотным моментом
                в
                истории Kia. Дебютирует Sephia — первый автомобиль полностью разработанный внутри компании. Производство
                стартовало в 1992 году, и за 5 лет было выпущено почти полмиллиона экземпляров. 1993-й стал годом
                рождения
                для модели, которая по сей день является визитной карточкой Kia — кроссовера Sportage. 1998 г. — Kia
                присоединяется к Hyundai Motor Group.`</p>
            </div>
          </template>
        </UISplitLayout>

        <StackAndSplitLayout :class-names="{
          'container': 'flex flex-col-reverse !p-0',
          'topContainer': 'row-start-2 row-end-3 2xl:mt-5h md:mt-10 mt-12 2xl:col-start-3 2xl:!col-end-11 relative z-10',
          bottomContainer: 'col-start-3 col-end-11 row-start-1 row-end-2  2xl:!mt-0 !mt-0 2xl:!col-end-11'
        }">
          <template #right>
            <div class="2xl:pt-10 2xl:pb-16">
              <p class="2xl:text-lg">Приход в 2006 году в качестве шеф-дизайнера Kia Петера Шрайера, одного из трех
                самых
                влиятельных автомобильных стилистов в мире, дал старт трансформации компании в одного из лидеров
                индустрии. Значительные инвестиции были сделаны в разработку широкого ряда новых моделей практически для
                всех сегментов мирового рынка.</p>
            </div>
          </template>
          <template #bottom>
            <div class="2xl:h-5h h-4h container 2xl:px-0">
              <div class="relative w-full h-full">
                <picture>
                  <source media="(min-width: 768px)" :srcset="src('809237f7-3b96-4a6f-8902-6226317e048b')" />
                  <img :src="src('809237f7-3b96-4a6f-8902-6226317e048b', { preview: '313x400' })" alt=""
                    class="h-full w-full object-cover">
                </picture>

                <UIBackgroundLayerContainer>
                  <UIBackgroundLayer :gradient="{
                    'default': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 57.64%, rgba(5, 20, 31, 0.481105) 67.74%, #05141F 93.35%), linear-gradient(180deg, rgba(5, 20, 31, 0) 50%, #05141F 100%)',
                    'md': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 57.64%, rgba(5, 20, 31, 0.481105) 67.74%, #05141F 93.35%), linear-gradient(180deg, rgba(5, 20, 31, 0) 50%, #05141F 100%)',
                    '2xl': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 57.64%, rgba(5, 20, 31, 0.481105) 67.74%, #05141F 93.35%)'
                  }" />
                </UIBackgroundLayerContainer>

                <div
                  class="absolute space-y-2.5 2xl:text-center px-5 pb-5 2xl:pb-15 2xl:px-15 bottom-0 text-white z-10">
                  <p class="text-base+ font-semibold 2xl:text-lg">1940-е</p>
                  <h1 class="text-2xl 2xl:text-3xl">Основание компании Kyungsung Precision Industries Ltd.</h1>
                </div>
              </div>
            </div>
          </template>
        </StackAndSplitLayout>

        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2006</p>
              <p class="text-base+ text-primary 2xl:text-lg">Последнее десятилетие 20-го века стало поворотным моментом
                в
                истории Kia. Дебютирует Sephia — первый автомобиль полностью разработанный внутри компании. Производство
                стартовало в 1992 году, и за 5 лет было выпущено почти полмиллиона экземпляров. 1993-й стал годом
                рождения
                для модели, которая по сей день является визитной карточкой Kia — кроссовера Sportage. 1998 г. — Kia
                присоединяется к Hyundai Motor Group.`</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2009</p>
              <p class="text-base+ text-primary 2xl:text-lg">Регистрация официального дистрибутора Kia в России.
                Создание
                Kia Rus. Первое поколение Kia Soul стало первым автомобилем корейского бренда, удостоенным престижной
                награды в области дизайна — Red Dot Design Award.</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7 !mt-0'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2010</p>
              <p class="text-base+ text-primary 2xl:text-lg">Стартовало производство на заводе Kia в штате Джорджия,
                США.
                Открытие собственной производственной площадки стало результатом 15-летнего роста рыночной доли компании
                на одном из крупнейших мировых рынков.</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2016</p>
              <p class="text-base+ text-primary 2xl:text-lg">Впервые с 1989 года рейтинг качества автомобилей по версии
                J.D. Power возглавляет бренд, не относящийся к премиальному сегменту, и им становится Kia!</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7 !mt-0',
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2017</p>
              <p class="text-base+ text-primary 2xl:text-lg">В престижном, трендовом районе Сеула — Гангнам открыл свои
                двери первый центр BEAT360. Его мультифункциональное пространство позволяет в уютной атмосфере кофейни
                высокого класса познакомиться с ценностями бренда и новейшими продуктами Kia.</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2018</p>
              <p class="text-base+ text-primary 2xl:text-lg">Впервые в истории Чемпионат мира по футболу проходит в
                России. Kia является официальным партнером турнира. В ноябре российское представительство Kia
                преобразовано в региональную штаб-квартиру. В зону ответственности компании, помимо Российской
                Федерации,
                входят еще семь стран: Армения, Республика Беларусь, Республика Казахстан, Республика Таджикистан,
                Туркменистан, Республика Узбекистан и Кыргызская Республика.</p>
            </div>
          </template>
        </UISplitLayout>


        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7 !mt-0'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2019</p>
              <p class="text-base+ text-primary 2xl:text-lg">На автосалоне в Женеве представлен концепт Imagine by Kia.
                Он
                предвосхищает новое направление развития компании в области полностью электрического транспорта.</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2020</p>
              <p class="text-base+ text-primary 2xl:text-lg">В январе Президент Kia Хан Ву Пак объявил о новой
                среднесрочной стратегии развития бренда — Plan S. В соответствии с ним к 2025 году в портфеле продуктов
                Kia будет 11 моделей с электрической силовой установкой.</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7 !mt-0'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2020</p>
              <p class="text-base+ text-primary 2xl:text-lg">Впервые в истории конкурса «Всемирный автомобиль» (World
                Car
                Awards) главный приз был вручен корейской компании. Полноразмерный внедорожник Kia Tellurіdе признан
                лучшим в абсолютном зачете, а электрическая версия городского кроссовера Kia Soul EV стала победителем в
                категории «Лучший городской автомобиль».</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout :class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2021</p>
              <p class="text-base+ text-primary 2xl:text-lg">Kia представила новый логотип и глобальный девиз бренда,
                символизирующие смелую трансформацию для будущего. Новый логотип был представлен в ходе рекордного
                пиротехнического шоу, состоявшегося в небе над городом Инчон, Южная Корея. В шоу было задействовано 303
                «пиротехнических дрона», которые синхронно выпустили сотни фейерверков в художественном представлении и
                дали символический старт новой эпохе в жизни компании.</p>
            </div>
          </template>
        </UISplitLayout>
      </div>
    </div>

    <div class="pb-12 md:pb-15">
      <h2 class="container text-lg font-semibold text-primary md:text-2xl 2xl:text-3xl">
        Подробнее о Kia
      </h2>
      <div
        class="no-scrollbar p-[--padding] mt-6 snap-x space-y-9 overflow-auto 2xl:container md:flex md:gap-x-10 md:space-y-0 2xl:snap-none"
        :style="{ '--padding': `0 ${bounding.x.value}px` }">
        <div v-for="slide in extraLinksCard" :key="slide.title"
          class="relative mx-auto flex h-[208px] max-w-[310px] snap-center justify-center md:mx-0 md:w-[310px] md:max-w-none md:shrink-0 2xl:h-[265px] 2xl:w-[400px] 2xl:snap-none">
          <img :src="slide.image" class="h-full" loading="lazy" />
          <div class="absolute bottom-0 z-10 w-full p-4 md:px-7.5 md:py-5">
            <p class="text-base font-semibold text-white md:text-2xl">
              {{ slide.title }}
            </p>
          </div>
        </div>
      </div>
    </div>

  </UISafeAreaView>
</template>
