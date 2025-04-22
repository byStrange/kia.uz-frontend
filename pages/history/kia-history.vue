<script setup lang="ts">
import StackAndSplitLayout from '~/components/layout/StackAndSplitLayout.vue';


const { src } = useUploadcareSource()
const { locale } = useI18n()
const { bounding } = useContainer()

const { data: pageData } = useAsyncData('seo', () => {
  return useFetchApi<SEO>('/pages/~history~kia-history', locale.value)
})

useSeoMeta({
  title: () => pageData.value?.seo.title || '',
  ogTitle: () => pageData.value?.seo.title || '',
  description: () => pageData.value?.seo.description || '',
  ogDescription: () => pageData.value?.seo.description || '',
  keywords: () => pageData.value?.seo.keywords || '',
})

const mainBodyRef = useTemplateRef('mainBody')

type StopPoints = string[]

function getCoords(elem: HTMLElement) { // crossbrowser version
  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

const stops = computed<StopPoints>(() => {
  const offset = 96;
  const _stops: StopPoints = []
  if (!mainBodyRef.value) return []

  mainBodyRef.value.querySelectorAll('img').forEach((img: HTMLElement) => {
    const bounding = getCoords(img);
    _stops.push((bounding.top - window.innerHeight) + offset + 'px')
  })

  return _stops;
})

const extraLinksCard = [
  {
    title: 'common.brand',
    href: '/branding',
    image: src('8701cf69-f335-45be-b0d7-2c939d629d0f', { preview: '1000x664' }),
  },
]

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
        <img
:src="src('8a04f460-1c61-4f55-b1d7-25c5324ff150')" alt="kia sponsoring"
          class="w-full md:h-[420px] object-cover 2xl:h-[calc(100vh-var(--header-height))]">
      </picture>

      <div class="container absolute top-0 z-10 py-5">
        <MoleculeBreadcrumb theme="light" />
      </div>

      <div
        class="relative z-10 py-7.5 container space-y-4 text-primary bg-background md:absolute md:bottom-0 md:bg-transparent md:text-white md:pb-10 2xl:top-15 2xl:pt-2.5">
        <h1 class="text-2xl md:text-4xl 2xl:text-9xl">{{ $t('common.kia_history') }}</h1>
        <p class="text-base md:text-base+ 2xl:text-lg">{{ $t('history.75_year_progress') }}</p>
      </div>

    </div>


    <div ref="mainBody" class="py-12 md:py-15 2xl:py-1h">
      <div class="relative">
        <div class="center-line-path absolute left-1/2 top-0 w-1px h-full -translate-x-1/2 hidden 2xl:block">
          <div
v-for="stop in stops" :key="stop"
            class="stop absolute w-5 h-0.5 bg-forest-green top-[--position-y] -translate-x-1/2 z-[1]"
            :style="{ '--position-y': stop }"></div>
          <div class="center-line absolute w-full h-full bg-protection z-0"></div>
        </div>

        <StackAndSplitLayout
:class-names="{
          'container': 'flex flex-col-reverse !p-0',
          'topContainer': 'row-start-2 row-end-3 2xl:mt-5h md:mt-10 mt-12 2xl:col-start-3 2xl:!col-end-11 relative z-10',
          bottomContainer: 'col-start-3 col-end-11 row-start-1 row-end-2  2xl:!mt-0 !mt-0 2xl:!col-end-11'
        }">
          <template #right>
            <div class="2xl:pt-10 2xl:pb-16">
              <p class="2xl:text-lg">{{ $t('history.1940_description') }}</p>
            </div>
          </template>
          <template #bottom>
            <div class="2xl:h-5h h-4h container 2xl:px-0">
              <div class="relative w-full h-full">
                <picture>
                  <source media="(min-width: 768px)" :srcset="src('809237f7-3b96-4a6f-8902-6226317e048b')" />
                  <img
:src="src('809237f7-3b96-4a6f-8902-6226317e048b', { preview: '313x400' })" alt=""
                    class="h-full w-full object-cover">
                </picture>

                <UIBackgroundLayerContainer>
                  <UIBackgroundLayer
:gradient="{
                    'default': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 57.64%, rgba(5, 20, 31, 0.481105) 67.74%, #05141F 93.35%), linear-gradient(180deg, rgba(5, 20, 31, 0) 50%, #05141F 100%)',
                    'md': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 57.64%, rgba(5, 20, 31, 0.481105) 67.74%, #05141F 93.35%), linear-gradient(180deg, rgba(5, 20, 31, 0) 50%, #05141F 100%)',
                    '2xl': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 57.64%, rgba(5, 20, 31, 0.481105) 67.74%, #05141F 93.35%)'
                  }" />
                </UIBackgroundLayerContainer>

                <div
                  class="absolute space-y-2.5 2xl:text-center px-5 pb-5 2xl:pb-15 2xl:px-15 bottom-0 text-white z-10">
              
                  <p class="text-base+ font-semibold 2xl:text-lg">1940-е</p>
                  <h1 class="text-2xl 2xl:text-3xl">{{ $t('history.1940_title') }}</h1>
                </div>

              </div>
            </div>
          </template>
        </StackAndSplitLayout>

        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('b1b6fb55-8b1d-4835-b05b-8795862b124e')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">1950-е</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.name_change') }}</p>
            </div>
          </template>
        </UISplitLayout>


        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('5c094684-78db-4817-86e4-baf0b1685752')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">1960-е</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.1961_new_model_license') }}</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7 !mt-0'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('ffaa363f-8670-4762-8d17-50686d75e3ae')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">1970-е</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.1974_first_kia') }}
              </p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('715e57b6-21e4-4b64-9391-66258763fe91')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">1980-е</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.1986_first_kia_pride') }}</p>
            </div>
          </template>
        </UISplitLayout>


        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7 !mt-0'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('af0be802-2875-4e67-9922-314beac58a91')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">1990-е</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.20_century_new_models') }}</p>
            </div>
          </template>
        </UISplitLayout>

        <StackAndSplitLayout
:class-names="{
          'container': 'flex flex-col-reverse !p-0',
          'topContainer': 'row-start-2 row-end-3 2xl:mt-5h md:mt-10 mt-12 2xl:col-start-3 2xl:!col-end-11 relative z-10',
          bottomContainer: 'col-start-3 col-end-11 row-start-1 row-end-2  2xl:!mt-0 !mt-0 2xl:!col-end-11'
        }">
          <template #right>
            <div class="2xl:pt-10 2xl:pb-16">
              <p class="2xl:text-lg">{{ $t('history.2006_beginning') }}</p>
            </div>
          </template>
          <template #bottom>
            <div class="2xl:h-5h h-4h container 2xl:px-0">
              <div class="relative w-full h-full">
                <picture>
                  <source media="(min-width: 768px)" :srcset="src('979f62d4-7de9-47b7-a28c-5d38f175097a')" />
                  <img
:src="src('979f62d4-7de9-47b7-a28c-5d38f175097a', { preview: '313x400' })" alt=""
                    class="h-full w-full object-cover">
                </picture>

                <UIBackgroundLayerContainer>
                  <UIBackgroundLayer
:gradient="{
                    'default': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 57.64%, rgba(5, 20, 31, 0.481105) 67.74%, #05141F 93.35%), linear-gradient(180deg, rgba(5, 20, 31, 0) 50%, #05141F 100%)',
                    'md': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 57.64%, rgba(5, 20, 31, 0.481105) 67.74%, #05141F 93.35%), linear-gradient(180deg, rgba(5, 20, 31, 0) 50%, #05141F 100%)',
                    '2xl': 'linear-gradient(180deg, rgba(5, 20, 31, 0) 57.64%, rgba(5, 20, 31, 0.481105) 67.74%, #05141F 93.35%)'
                  }" />
                </UIBackgroundLayerContainer>

                <div
                  class="absolute space-y-2.5 2xl:text-center px-5 pb-5 2xl:pb-15 2xl:px-15 bottom-0 text-white z-10">
                  <p class="text-base+ font-semibold 2xl:text-lg">1940-е</p>
                  <h1 class="text-2xl 2xl:text-3xl">{{ $t('history.1940_title') }}</h1>
                </div>
              </div>
            </div>
          </template>
        </StackAndSplitLayout>

        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('d6d83827-de9d-4904-9abf-e403a610c34c')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2006</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.2006_ending_of_20_century') }}</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('e91c850b-67b0-4c78-b6ca-57123d4628f0')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2009</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.2009_collab_with_russia') }}</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7 !mt-0'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('64719286-0361-40f1-a855-6cf750f7935f')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2010</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.2010_georgia_usa') }}</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('23537927-4659-4970-958f-ee6acec0afb3')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2016</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.2016_description') }}</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7 !mt-0',
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('6272aca1-d549-491e-9f99-4e2ec12729a7')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2017</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.2017_description') }}</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('7b494c54-3ecc-4938-9d35-fed7807eb443')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2018</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.2018_description') }}</p>
            </div>
          </template>
        </UISplitLayout>


        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7 !mt-0'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('58eeaa4d-8031-4582-b5e4-219071b48ee5')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2019</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.2019_description') }}</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('da5033d8-f8b0-49f4-9aca-512db2ffe965')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2020</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.2020_description_1') }}</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          rightContainerClass: '!col-span-4 container 2xl:px-0 !col-start-7 !mt-0'
        }">
          <template #right>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('7e801cc7-a7ec-4d1c-b0cc-514507841104')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2020</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.2020_description_2') }}</p>
            </div>
          </template>
        </UISplitLayout>

        <UISplitLayout
:class-names="{
          containerClass: '!p-0',
          leftContainerClass: '!col-start-3',
          rightContainerClass: '!mt-0'
        }">
          <template #left>
            <div class="space-y-2.5 pb-12 md:pb-10 2xl:pb-16">
              <img :src="src('6844ac56-7695-40ca-a3ca-282e5143d8cf')" alt="first kia image">
              <p class="text-base+ font-semibold text-forest-green 2xl:text-lg">2021</p>
              <p class="text-base+ text-primary 2xl:text-lg">{{ $t('history.2021_description') }}</p>
            </div>
          </template>
        </UISplitLayout>
      </div>
    </div>

    <div class="pb-12 md:pb-15">
      <h2 class="container text-lg font-semibold text-primary md:text-2xl 2xl:text-3xl">{{ $t('index.more_about_kia')}}</h2>
      <div
        class="no-scrollbar p-[--padding] mt-6 snap-x space-y-9 overflow-auto 2xl:container md:flex md:gap-x-10 md:space-y-0 2xl:snap-none"
        :style="{ '--padding': `0 ${bounding.x.value}px` }">
        <div
v-for="slide in extraLinksCard" :key="slide.title"
          class="relative mx-auto flex h-[208px] max-w-[310px] snap-center justify-center md:mx-0 md:w-[310px] md:max-w-none md:shrink-0 2xl:h-[265px] 2xl:w-[400px] 2xl:snap-none">
          <img :src="slide.image" class="h-full" loading="lazy" />
          <div class="absolute bottom-0 z-10 w-full p-4 md:px-7.5 md:py-5">
            <p class="text-base font-semibold text-white md:text-2xl">
              {{ $t(slide.title)}}
            </p>
          </div>
        </div>
      </div>
    </div>

  </UISafeAreaView>
</template>
