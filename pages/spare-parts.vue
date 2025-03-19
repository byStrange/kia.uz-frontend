<script setup lang="ts">
import { useSvgAnnotator } from '~/composables/useSvgAnnotator';

const { src } = useUploadcareSource()
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

const tab = ref<HTMLElement | null>(null)

type Point = [number, number];


interface SparePart {
  name: string,
  imageCoordinates: Point
  image: string
}

const originalSparePartGroups = ref<{ name: string, parts: SparePart[] }[]>([
  {
    name: 'Фильтр',
    parts: [
      {
        name: 'Воздушный',
        imageCoordinates: [896, 353],
        image: src('30f3bbe2-7a6f-48e1-be15-121e1f61389e', { preview: '314x203' })
      },
      {
        name: 'Масляный',
        imageCoordinates: [821, 462],
        image: src('e1d897c3-1cb7-4a91-acde-5bcae9be2891', { preview: '288x173' })
      },
      {
        name: 'Салонный',
        imageCoordinates: [980, 297],
        image: src('1c84c9da-8978-44a0-81f1-ccd0594a6385', { preview: '294x203' })
      },
      {
        name: 'Топливный',
        imageCoordinates: [-860, -280],
        image: src("cfe2dd83-8e4a-45a3-9052-a7377ca52b37", { preview: '294x191' })
      }
    ]
  },
  {
    name: 'Кузов',
    parts: [
      { name: 'Лобовое стекло', imageCoordinates: [12, 2], image: src('ad97ccec-0b25-4a3d-8bb5-92aae8d50aaa') },
      { name: 'Кузовные запчасти', imageCoordinates: [12, 23], image: src('6b4f2e56-2ee9-4e55-bb06-8f511c6535ff') }
    ]
  },

  {
    name: 'Двигатель',
    parts: [
      {
        name: 'Масло',
        imageCoordinates: [0, 0],
        image: src('d4524d97-71ab-4651-8207-e5c1426391dc', {
          crop: '190x200/45,0',
        })
      },
      {
        name: 'Свечи зажигания',
        imageCoordinates: [12, 21],
        image: src('bba08360-3e81-401f-b76f-0a9a75c6b1e9')
      },
    ]
  },

  {
    name: 'Тормоза',
    parts: [
      { name: 'Тормозные диски', imageCoordinates: [12, 2], image: src('13417e07-ab22-44f6-bf23-d6507de26b48') },
      { name: 'Тормозные колодки', imageCoordinates: [12, 23], image: src('9ec56b41-fcc3-4323-9fd9-cbbffa101b37') }
    ]
  }
  , {
    name: 'Комплектующие',
    parts: [
      {
        name: 'Антифриз', imageCoordinates: [12, 23], image: src('100cc81d-c299-424f-90b8-9db7677d864f', {
          crop: '190x200/45,0',
        })
      },
      { name: 'Щётки стеклоочистителя', imageCoordinates: [12, 32], image: src('d0274b1c-8ffb-409d-8b07-f5a358f7c79a') },
      { name: 'Амортизаторы', imageCoordinates: [2, 332], image: src('c6a2c2f4-1ada-4669-92c4-ca73bb2c680c') }

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
      <MoleculeTabsContainer :tabs="['Оригинальные запчасти', 'Запчасти PL2',]" :is-header-center="false"
        header-container-class="w-fit mx-0"
        :is-content-full="true"
        header-class="overflow-x-auto no-scrollbar text-nowrap !mt-7.5 2xl:!px-0 2xl:ml-[--padding-left]"
        class="pt-5 relative z-10" :is-header-full="true">

        <template #1>
          <div>
            <UIContainer class="md:grid md:grid-cols-3 md:gap-y-6 2xl:flex pb-2.5 relative z-10">
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
            </UIContainer>

            <UIContainer>
              <div class="2xl:max-w-[480px] relative z-10">
                <div class="relative md:h-2h flex justify-center items-center min-h-1.5h" ref="partImage">
                  <Transition name="slide-fade" mode="out-in">
                    <img :key="selectedPart.name" :src="selectedPart.image" alt="Part image" class="md:absolute">
                  </Transition>
                </div>

                <div class="space-y-7.5 pt-6 pb-[70px] 2xl:p-0 2xl:mt-6">
                  <div class="space-y-6">
                    <h1 class="text-lg font-semibold md:text-2xl">Воздушный фильтр</h1>
                    <div class="space-y-2.5">
                      <div class="flex gap-x-2 items-start">
                        <UICheckOnIcon class="text-primary shrink-0" />
                        <p class="text-base">
                          Для работы двигателю необходима определенная пропорция смеси топлива и воздуха. Воздух
                          поступает
                          в систему
                          смесеобразования через воздушный фильтр.
                        </p>
                      </div>
                      <div class="flex gap-x-2 items-start">
                        <UICheckOnIcon class="text-primary shrink-0" />
                        <p class="text-base">Воздушный фильтр обеспечивает защиту двигателя от загрязнений и инородных
                          частиц,
                          вызывающих быстрый износ деталей поршневой группы. Фильтр разработан в соответствии со
                          спецификациями и
                          пропускает тот объем воздуха, который предусмотрен для двигателя.</p>
                      </div>
                    </div>
                  </div>
                  <AtomButton color="primary" label="Позвонить" mode="full" />
                </div>
              </div>
            </UIContainer>
            <div class="fixed left-20 top-20 w-40 z-40" v-if="false">
              <input type="number" v-model="testPos.x">
              <input type="number" v-model="testPos.y">
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
                <h1 class="text-lg text-primary font-semibold md:text-2xl 2xl:text-3xl">Запасные части PL2</h1>
                <p>Решили пересмотреть бюджет на обслуживание вашего Kia? Понимаете и цените преимущества официального
                  сервиса? Выбирайте запасные части PL2 — неизменное качество за разумные деньги.
                </p>
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
                  <p>Спрашивайте запасные части PL2 у официальных дилеров и получайте:</p>

                  <div class="space-y-2.5 pl-4 mt-4">
                    <div class="flex gap-x-2" v-for="i in 4">
                      <UICheckOnIcon class="shrink-0" />
                      <p class="text-base">Качественные запчасти разработанные и произведенные для автомобилей Kia
                        под контролем
                        автопроизводителя;</p>
                    </div>
                  </div>
                </div>
                <p>
                  Если вы владелец одной из этих моделей Rio QB, cee’d ED, cee’d JD, Optima TF, Picanto TA, Soul AM,
                  Sportage SL, Sorento XM у вас есть еще один повод оставаться лояльным Kia — оставаться с официальным
                  сервисом.
                </p>
              </div>
              <AtomButton label="Позвонить" mode="full" color="primary" />
            </UIContainer>
          </div>

        </template>
      </MoleculeTabsContainer>


    </div>

  </UISafeAreaView>
</template>
