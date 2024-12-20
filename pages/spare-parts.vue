<script setup lang="ts">
import { useSvgAnnotator } from '~/composables/useSvgAnnotator';

const { src } = useUploadcareSource()
const { svgRef, addConnector, getSvgPoint, connectors, generatePath, removeConnector, opts } = useSvgAnnotator({
  breakPointOffset: 60,
  animationDuration: 500,
  lineColor: '#CDD0D2',
  lineWidth: 1,
  dotRadius: 18
})

const connectorIds = computed(() => {
  return connectors.value.map((c) => c.id);
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

  const left = partImageBounding.value.left * 3;
  const top = partImageBounding.value.height - 50;
  return {
    left, top
  }
})


const handlePartClick = (x: number, y: number) => {
  const startingPoint = calculateStartingPoint.value ? calculateStartingPoint.value : { left: 0, top: 0 }
  console.log('starting point', startingPoint);
  console.log('endpoint', x, y)
  const targetPoint = getSvgPoint(x, y)
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

const tab = ref<HTMLElement | null>(null)

type Point = [number, number];


interface SparePart {
  name: string,
  imageCoordinates: Point
}

const originalSparePartGroups = ref<{ name: string, parts: SparePart[] }[]>([
  {
    name: 'Фильтр',
    parts: [
      {
        name: 'Воздушный',
        imageCoordinates: [895, 478]
      },
      {
        name: 'Масляный',
        imageCoordinates: [830, 533]
      },
      {
        name: 'Салонный',
        imageCoordinates: [940, 557]
      },
    ]
  },
  {
    name: 'Фильтр',
    parts: [
      {
        name: 'Воздушный',
        imageCoordinates: [985, 434]
      },
      {
        name: 'Масляный',
        imageCoordinates: [12, 21]
      },
      {
        name: 'Салонный',
        imageCoordinates: [21, 2]
      },
    ]
  },
  {
    name: 'Тормоза',
    parts: [
      { name: 'Тормозные диски', imageCoordinates: [12, 2] },
      { name: 'Тормозные колодки', imageCoordinates: [12, 23] }
    ]
  },
  {
    name: 'Тормоза',
    parts: [
      { name: 'Тормозные диски', imageCoordinates: [12, 2] },
      { name: 'Тормозные колодки', imageCoordinates: [12, 23] }
    ]
  }
])

const selectedPart = ref(originalSparePartGroups.value[0].parts[0]);

watch(selectedPart, () => {
  console.log('hi')
  const [startX, startY] = selectedPart.value.imageCoordinates;
  handlePartClick(startX, startY)
})

onMounted(() => {
  screenWidth.value = window.innerWidth;
  const [startX, startY] = selectedPart.value.imageCoordinates;
  handlePartClick(startX, startY);
  handlePartClick(startX, startY);
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
        <img :src="src('695cfb0a-1c18-45fa-9022-25a078fa4ccf')"
          class="absolute -right-20 w-[934px] h-[332px] top-1/2 -translate-y-1/2">
      </UIDesktopOnly>
      <UIContainer class="relative z-10">
        <UIDesktopOnly class="pt-6">
          <UIBreadcrumb theme="dark" />
        </UIDesktopOnly>
        <div class="py-20 space-y-7.5 2xl:py-0 2xl:mt-6 2xl:max-w-7h">
          <div class="space-y-4">
            <h1 class="text-2xl md:text-4xl 2xl:py-3 2xl:text-5xl">Запчасти</h1>
            <p class="text-base md:text-lg 2xl:max-w-6.5h">Производитель обеспечивает своих дилеров необходимым
              количеством
              запчастей,
              деталей
              и комплектующих для
              профессионального ремонта. Оригинальные запчасти обеспечивают высокое качество ремонтных и сервисных
              работ.
            </p>
          </div>
          <div class='space-y-4 2xl:space-y-0 2xl:flex 2xl:gap-x-7.5 2xl:pt-3'>
            <div class="flex gap-x-2">
              <UIShieldIcon />
              <p class="text-base">Безопасность превыше всего</p>
            </div>
            <div class="flex gap-x-2">
              <UICheckstrokeIcon />
              <p class="text-base">Надежность, проверенная исследованиями</p>
            </div>
          </div>
        </div>
      </UIContainer>
    </div>

    <div class="pb-15 relative">
      <UITabsContainer :tabs="['Оригинальные запчасти', 'Запчасти PL2',]" :is-header-center="false"
        header-class="overflow-x-auto text-nowrap !mt-7.5" class="pt-5 relative z-10" :is-header-full="true">
        <template #1>
          <div class="md:grid md:grid-cols-3 md:gap-y-6 2xl:flex">
            <div class="space-y-1.5 py-2.5 md:pt-0 2xl:pr-7.5" v-for="group in originalSparePartGroups">
              <div class="text-caption pl-6 py-1">
                <span class="text-base">{{ group.name }}</span>
              </div>
              <div>
                <div
                  class="pl-6 py-1 2xl:pr-2.5 hover:bg-background transition-colors duration-300 cursor-pointer relative"
                  v-for="part in group.parts" @click="selectedPart = part">
                  <Transition name="slide-fade">

                    <UIArrowRightIcon v-if="selectedPart == part" class="absolute left-0" />
                  </Transition>
                  <span class="text-base select-none">{{ part.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #2></template>
      </UITabsContainer>
      <UIContainer>
        <div class="space-y-6 max-w-[480px] relative z-10">
          <img :src="src('30f3bbe2-7a6f-48e1-be15-121e1f61389e')" alt="${0}" class="mx-auto" ref="partImage"
            width="314">
          <div class="space-y-7.5">
            <div class="space-y-6">
              <h1 class="text-2xl">Воздушный фильтр</h1>
              <div class="space-y-2.5">
                <div class="flex gap-x-2 items-start">
                  <UICheckOnIcon class="text-primary shrink-0" />
                  <p class="text-base">
                    Для работы двигателю необходима определенная пропорция смеси топлива и воздуха. Воздух поступает
                    в систему
                    смесеобразования через воздушный фильтр.
                  </p>
                </div>
                <div class="flex gap-x-2 items-start">
                  <UICheckOnIcon class="text-primary shrink-0" />
                  <p class="text-base">Воздушный фильтр обеспечивает защиту двигателя от загрязнений и инородных частиц,
                    вызывающих быстрый износ деталей поршневой группы. Фильтр разработан в соответствии со
                    спецификациями и
                    пропускает тот объем воздуха, который предусмотрен для двигателя.</p>
                </div>
              </div>
            </div>
            <UIButton color="primary" label="Позвонить" />
          </div>
        </div>
      </UIContainer>

      <svg ref="svgRef" width="100%" height="738" class="absolute left-0 top-1.5h">
        Your car image
        <image :x="330" :href="src('b928385d-4dd2-4940-bfc3-a3496a44a672')" width="1679px" class="absolute"
          height="100%" @click="(event) => {
            handlePartClick(event.clientX, event.clientY)
          }" />
        <template v-for="connector in connectors" :key="connector.id">
          <g>
            <path :d="generatePath(connector)" :stroke="opts.lineColor ? opts.lineColor : 'currentColor'"
              :stroke-width="opts.lineWidth" fill="none" stroke-dasharray="1000"
              :stroke-dashoffset="1000 * (1 - connector.progress)" class="transition-all"
              :style="{ transitionDuration: opts.animationDuration + 'ms' }" />

            <circle :cx="connector.end.x" :cy="connector.end.y" :r="opts.dotRadius" fill="#E4BC1A" class="blur-sm"
              :style="{
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
    </div>

  </UISafeAreaView>
</template>
