<script setup lang="ts">
import { useSvgAnnotator } from '~/composables/useSvgAnnotator';

const isMobile = ref(false)
onMounted(() => {

  if (/Mobi|Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
    isMobile.value = true
  }
})

const { src } = useUploadcareSource()
const { locale } = useI18n()
const { headerService } = useHeaderService()
const { svgRef, addConnector, getSvgPoint, connectors, generatePath, removeConnector, opts } = useSvgAnnotator({
  breakPointOffset: 60,
  animationDuration: 800,
  lineColor: '#CDD0D2',
  lineWidth: 1,
  dotRadius: 18
})

const { bounding } = useContainer();


const connectorIds = computed(() => {
  return connectors.value.map((c) => c.id);
})

const { data: pageData } = useAsyncData('seo', () => {
  return useFetchApi<SEO>('/pages/~spare-parts', locale.value)
})

useSeoMeta({
  title: () => pageData.value?.seo.title || '',
  ogTitle: () => pageData.value?.seo.title || '',
  description: () => pageData.value?.seo.description || '',
  ogDescription: () => pageData.value?.seo.description || '',
  keywords: () => pageData.value?.seo.keywords || '',
})

const screenWidth = ref(0);
const partImage = useTemplateRef('partImage');

const partImageBounding = computed(() => {
  if (!partImage.value) return null;
  const bounding = partImage.value.getBoundingClientRect();
  return bounding;
})

const calculateStartingPoint = computed(() => {
  if (!partImageBounding.value) return null;

  const left = partImageBounding.value.width;
  const top = partImageBounding.value.height - 50;
  return {
    left, top
  }
})

const isSvgReversed = ref(false);


const handlePartClick = (x: number, y: number) => {
  const startingPoint = calculateStartingPoint.value ? calculateStartingPoint.value : { left: 0, top: 0 }
  const targetPoint = getSvgPoint(Math.abs(x), Math.abs(y))
  if (targetPoint) {
    for (let i = 0; i < connectorIds.value.length; i++) {
      removeConnector(connectorIds.value[i])
    }
    const connectorId = addConnector(
      { x: startingPoint.left, y: startingPoint.top }, // Start point (from part list)
      targetPoint // End point (on car image)
    )
  }
}

type Point = [number, number];


interface SparePart {
  name: string,
  imageCoordinates: Point
  image: string
  title: string
  description: string
}

const originalSparePartGroups = ref<{ name: string, parts: SparePart[] }[]>([
  {
    name: 'filter',
    parts: [
      {
        name: 'air',
        imageCoordinates: [896, 353],
        image: src('30f3bbe2-7a6f-48e1-be15-121e1f61389e', { preview: '314x203' }),
        title: 'air_filter', description: 'air_filter_desc'
      },
      {
        name: 'oil',
        imageCoordinates: [821, 462],
        image: src('e1d897c3-1cb7-4a91-acde-5bcae9be2891', { preview: '288x173' }),

        title: 'oil_filter', description: 'oil_filter_desc'
      },
      {
        name: 'cabin',
        imageCoordinates: [980, 297],
        image: src('1c84c9da-8978-44a0-81f1-ccd0594a6385', { preview: '294x203' }),

        title: 'cabin_filter', description: 'cabin_filter_desc'
      },
      {
        name: 'fuel',
        imageCoordinates: [-860, -280],
        image: src("cfe2dd83-8e4a-45a3-9052-a7377ca52b37", { preview: '294x191' }),
        title: 'fuel_filter', description: 'fuel_filter_desc'
      }
    ]
  },
  {
    name: 'car_body',
    parts: [
      {
        name: 'windshield',
        imageCoordinates: [1080, 275],
        image: src('ad97ccec-0b25-4a3d-8bb5-92aae8d50aaa'),
        title: 'windshield', description: 'windshield_desc'
      },
      {
        name: 'body_parts',
        imageCoordinates: [1300, 510],
        image: src('6b4f2e56-2ee9-4e55-bb06-8f511c6535ff'),
        title: 'body_parts', description: 'body_parts_desc'
      }
    ]
  },

  {
    name: 'engine',
    parts: [
      {
        name: 'engine_oil',
        imageCoordinates: [790, 400],
        image: src('d4524d97-71ab-4651-8207-e5c1426391dc', {
          crop: '190x200/45,0',
        }),

        title: 'engine_oil', description: 'engine_oil_desc'
      },
      {
        name: 'spark_plugs',
        imageCoordinates: [942, 425],
        image: src('bba08360-3e81-401f-b76f-0a9a75c6b1e9'),

        title: 'spark_plugs', description: 'spark_plugs_desc'
      },
    ]
  },

  {
    name: 'brakes',
    parts: [
      {

        name: 'brake_discs',
        imageCoordinates: [1070, 558],
        image: src('13417e07-ab22-44f6-bf23-d6507de26b48'),
        title: 'brake_discs', description: 'brake_discs_desc'
      },
      {
        name: 'brake_pads',
        imageCoordinates: [1110, 495],
        image: src('9ec56b41-fcc3-4323-9fd9-cbbffa101b37'),
        title: 'brake_pads', description: 'brake_pads_desc'
      }

    ]
  }
  , {
    name: 'components',
    parts: [
      {
        name: 'antifreeze',
        imageCoordinates: [896, 353],
        image: src('100cc81d-c299-424f-90b8-9db7677d864f', {
          crop: '190x200/45,0',
        }),
        title: 'antifreeze', description: 'antifreeze_desc'
      },
      {
        name: 'wiper_blades',
        imageCoordinates: [1125, 340],
        image: src('d0274b1c-8ffb-409d-8b07-f5a358f7c79a'),
        title: 'wiper_blades', description: 'wiper_blades_desc'
      },
      {
        name: 'shock_absorbers',
        imageCoordinates: [1125, 340],
        image: src('c6a2c2f4-1ada-4669-92c4-ca73bb2c680c'),
        title: 'shock_absorbers', description: 'shock_absorbers_desc'
      }

    ]
  }
])

const selectedPart = ref(originalSparePartGroups.value[0].parts[0]);

watch(selectedPart, () => {
  const [startX, startY] = selectedPart.value.imageCoordinates;
  if (startX < 0 && startY < 0) {
    isSvgReversed.value = true;
  } else {
    isSvgReversed.value = false;
  }
  handlePartClick(startX, startY)
})

onMounted(() => {
  screenWidth.value = window.innerWidth;
  const [startX, startY] = selectedPart.value.imageCoordinates;
  handlePartClick(startX, startY);
  handlePartClick(startX, startY);
})

const testPos = ref({
  x: 900,
  y: 500
})

definePageMeta({
  lockHover: true
})

</script>
<template>
  <UISafeAreaView class="min-h-screen overflow-hidden">

    <div class="bg-[image:--gradient] py-10 md:py-0 2xl:pb-1h 2xl:relative" :style="{
      '--gradient': 'linear-gradient(90deg, #EBEBEB 0%, #FEFEFE 100%)'
    }">
      <UIDesktopOnly>
        <img :src="src('400b9c57-a122-4415-acff-6c0ad5a17705')"
          class="absolute -right-0 w-[934px] h-[332px] top-1/2 -translate-y-1/2">
      </UIDesktopOnly>
      <UIContainer class="relative z-10">
        <UIDesktopOnly class="pt-6">
          <MoleculeBreadcrumb theme="dark" />
        </UIDesktopOnly>
        <div class="py-20 space-y-7.5 2xl:py-0 2xl:mt-6 2xl:max-w-7h">
          <div class="space-y-4">
            <h1 class="text-2xl md:text-4xl 2xl:py-3 2xl:text-5xl">{{ $t('common.spare_parts') }}</h1>
            <p class="text-base md:text-lg 2xl:max-w-6.5h">{{ $t('spare_parts.manufacturer_supplies_original_parts') }}
            </p>
          </div>
          <div class='space-y-4 2xl:space-y-0 2xl:flex 2xl:gap-x-7.5 2xl:pt-3'>
            <div class="flex gap-x-2">
              <UIShieldIcon />
              <p class="text-base">{{ $t('spare_parts.safety_first') }}</p>
            </div>
            <div class="flex gap-x-2">
              <UICheckstrokeIcon />
              <p class="text-base">{{ $t('spare_parts.reliability_proven_by_research') }}</p>
            </div>
          </div>
        </div>
      </UIContainer>
    </div>

    <div class="pb-15 relative">
      <MoleculeTabsContainer :tabs="[$t('spare_parts.original_parts')]"
        :is-header-center="false" header-container-class="w-fit mx-0" :is-content-full="true"
        header-class="overflow-x-auto no-scrollbar text-nowrap !mt-7.5 2xl:!px-0 2xl:ml-[--padding-left]"
        class="pt-5 relative z-10" :is-header-full="true">

        <template #1>
          <div>
            <UIContainer class="md:grid md:grid-cols-3 md:gap-y-6 2xl:flex pb-2.5 relative z-10">
              <div v-for="group in originalSparePartGroups" class="space-y-1.5 py-2.5 md:pt-0 2xl:pr-7.5">
                <div class="text-caption pl-6 py-1">
                  <span class="text-base">{{ $t(`spare_parts.${group.name}`) }}</span>
                </div>
                <div>
                  <div v-for="part in group.parts"
                    class="pl-6 py-1 2xl:pr-2.5 hover:bg-background transition-colors duration-300 cursor-pointer relative"
                    @click="selectedPart = part">
                    <Transition name="slide-fade">

                      <UIArrowRightIcon v-if="selectedPart == part" class="absolute left-0" />
                    </Transition>
                    <span class="text-base select-none">{{ $t(`spare_parts.${part.name}`) }}</span>
                  </div>
                </div>
              </div>
            </UIContainer>

            <UIContainer>
              <div class="2xl:max-w-[480px] relative z-10">
                <div ref="partImage" class="relative md:h-2h flex justify-center items-center min-h-1.5h">
                  <Transition name="slide-fade" mode="out-in">
                    <img :key="selectedPart.name" :src="selectedPart.image" alt="Part image" class="md:absolute">
                  </Transition>
                </div>

                <div class="space-y-7.5 pt-6 pb-[70px] 2xl:p-0 2xl:mt-6 2xl:min-h-3h">
                  <div v-if="selectedPart" class="space-y-6">
                    <h1 class="text-lg font-semibold md:text-2xl">{{ $t(`spare_parts.${selectedPart.title}`) }}</h1>

                    <div class="space-y-2.5">
                      <div v-for="item in $t(`spare_parts.${selectedPart.description}`).split('&')" :key="item"
                        class="flex gap-x-2 items-start">
                        <UICheckOnIcon class="text-primary shrink-0" />
                        <p class="text-base">
                          {{ item }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <AtomLink :to="isMobile ? `tel:${headerService.phoneLine1}` : '/feedback'" :label="$t('common.request_a_callback')"
                    mode="full" color="primary" />

                </div>
              </div>
            </UIContainer>
            <div v-if="false" class="fixed left-20 top-20 w-40 z-40">
              <input v-model="testPos.x" type="number">
              <input v-model="testPos.y" type="number">
              <span>{{ testPos.x + ', ' + testPos.y }}</span>
            </div>
            <UIDesktopOnly>
              <svg ref="svgRef" width="100%" height="738" class="absolute left-0 top-2h">
                <Transition name="slide-fade_long" mode="out-in">
                  <image :key="isSvgReversed.toString()" transform="rotate(0, 0, 0)" :x="isSvgReversed ? 330 * 2 : 330"
                    :href="src('1e56e2da-0386-480a-8d33-ff9ec976ba39', { mirror: isSvgReversed })" width="1679px"
                    height="100%" />
                </Transition>
                <template v-for="connector in connectors" :key="connector.id">
                  <g>
                    <circle v-if="false" :cx="testPos.x" :cy="testPos.y" :r="3" fill="red" />
                    <path :d="generatePath(connector)" :stroke="opts.lineColor ? opts.lineColor : 'currentColor'"
                      :stroke-width="opts.lineWidth" fill="none" stroke-dasharray="1000"
                      :stroke-dashoffset="1000 * (1 - connector.progress)" class="transition-all"
                      :style="{ transitionDuration: opts.animationDuration + 'ms' }" />

                    <circle :cx="connector.end.x" :cy="connector.end.y" :r="opts.dotRadius" fill="#E4BC1A"
                      class="blur-sm" :style="{
                        opacity: connector.progress,
                        transition: 'opacity 500ms'
                      }" />

                    <circle :cx="connector.end.x" :cy="connector.end.y" :r="opts.dotRadius - 2" fill="transparent"
                      stroke="#E5E7E8" :style="{
                        opacity: '0.2',
                        transition: 'opacity 500ms'
                      }" />

                    <circle :cx="connector.end.x" :cy="connector.end.y" :r="2" fill="white" :style="{
                      opacity: connector.progress,
                      transition: 'opacity 500ms'
                    }" />

                  </g>
                </template>
              </svg>
            </UIDesktopOnly>

          </div>
        </template>
        <template #2>
          <div>
            <UIContainer class="pt-7 pb-7.5 2xl:pb-12.5">
              <div class="space-y-6 2xl:max-w-6h">
                <h1 class="text-lg text-primary font-semibold md:text-2xl 2xl:text-3xl">{{
                  $t('spare_parts.spare_parts_pl2') }}</h1>
                <p>{{ $t('spare_parts.service_budget_review_pl2') }}</p>
              </div>
            </UIContainer>
            <div class="py-10 bg-background">
              <img :src="src('e0f8fcf6-9ca1-4e79-8160-b78e9ac75072')" class="max-w-[1058px] mx-auto">
            </div>
            <UIContainer
              class="pt-7.5 2xl:pt-10 pb-[70px] 2xl:pb-1h space-y-7.5 text-primary 2xl:max-w-5h 2xl:pr-0 2xl:pl-[--padding-left] 2xl:m-0"
              :style="{
                '--padding-left': bounding.x.value + 'px'
              }">
              <div class="space-y-10 2xl:space-y-12.5">
                <div>
                  <p>{{ $t('spare_parts.pl2_parts_request_dealers') }}</p>

                  <div class="space-y-2.5 pl-4 mt-4">
                    <div v-for="item in $t('spare_parts.pl2_parts_requests').split('&')" :key="item"
                      class="flex gap-x-2">
                      <UICheckOnIcon class="shrink-0" />
                      <p class="text-base">{{ item }}</p>
                    </div>
                  </div>
                </div>
                <p>{{ $t('spare_parts.official_service_loyalty') }}</p>
              </div>
              <AtomLink :to="isMobile ? `tel:${headerService.phoneLine1}` : '/feedback'" :label="$t('common.request_a_callback')"
                mode="full" color="primary" />
            </UIContainer>
          </div>
        </template>
      </MoleculeTabsContainer>
    </div>
  </UISafeAreaView>
</template>
