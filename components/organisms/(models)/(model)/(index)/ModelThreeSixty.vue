<script setup lang="ts">
import type { ModelColor } from '~/server/api/models/[id]/index.get';
import { JavascriptViewer } from "@3dweb/360javascriptviewer";

const props = defineProps<{ modelName?: string, colors: ModelColor[] }>()
const modelType = ref('exterior')
const threeSixtyViewRef = ref(null)
const selectedColor = ref<ModelColor | null>(null)
const { safe } = useSafeAccessMedia()

const threeSixty = ref<{ initialImageUrl: string, viewer: JavascriptViewer | null, error?: string } | null>(null)

watch(selectedColor, () => {
  if (selectedColor.value && selectedColor.value.three_sixty && selectedColor.value.three_sixty.source_file) {
    const ts = selectedColor.value.three_sixty
    const path = safe(`/media/360image-set/${ts.source_file}/${ts.prefix}01.${ts.image_file_type || 'png'}`)

    const viewer = new JavascriptViewer({
      mainHolderId: 'threesixty-image-holder',
      mainImageId: 'threesixty-image',
      imageUrlFormat: `${ts.prefix}xx.${ts.image_file_type || 'png'}`,
      totalFrames: 71,
      reverse: true,
      speed: 70,
      defaultProgressBar: true
    });

    return threeSixty.value = { initialImageUrl: path, viewer }
  }

  return threeSixty.value = { initialImageUrl: '', viewer: null, error: 'no image found for this color' }
})

const { gsap } = useGsap()

onMounted(() => {
  selectedColor.value = props.colors[0]
  nextTick(() => {
    gsap.from('.three-sixty_title', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.5,
      scrollTrigger: {
        trigger: '.organism-three-sixty',
        start: 'top bottom'
      }
    });

    gsap.from('.three-sixty_tagline', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.8,
      scrollTrigger: {
        trigger: '.organism-three-sixty',
        start: 'top bottom',
      }
    });

    gsap.from('.three-sixty_image', {
      opacity: 0,
      yPercent: -20,
      duration: 1,
      scrollTrigger: {
        trigger: '.three-sixty_image',
        start: 'top 60%',
      }
    })

    gsap.from('.three-sixty_bottom-row_left input[type="radio"], .three-sixty_bottom-row_left label, .three-sixty_bottom-row_left > div:last-child > div:first-child > *, .three-sixty_bottom-row_left > div:last-child > div:last-child > div', {
      opacity: 0,
      yPercent: 30,
      duration: 0.3,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.three-sixty_bottom-row_left',
        start: 'top bottom',
      }
    })

    const threeSixtyImageSplitText = useSplitText('.three-sixty_bottom-row_center p')

    gsap.from(threeSixtyImageSplitText, {
      opacity: 0,
      stagger: 0.05, duration: 1,
      scrollTrigger: '.three-sixty_bottom-row_center'
    })

  })
})

</script>
<template>
  <div data-label="360 view" class="container py-10 md:py-15 2xl:py-20 organism-three-sixty relative">
    <div class="relative z-10">
      <p class="text-sm text-primary font-semibold three-sixty_tagline"
        :class="{ 'text-white': modelType === 'interior' }">Просмотр 360°</p>
      <h2 class="mt-2.5 text-4xl font-semibold text-primary 2xl:text-5xl three-sixty_title"
        :class="{ 'text-white': modelType === 'interior' }">{{ modelName }}</h2>
    </div>

    <div v-if="modelType === 'interior'" class="absolute w-full left-0 top-0 h-full">

      <iframe src="https://adminkia.ting.uz/pano/?pano_xml=http://localhost:8000/media/seltos/1K/pano.xml" width="100%"
        height="880px" frameborder="0"></iframe>
    </div>

    <div v-show="modelType == 'exterior'" id="threesixty-image-holder" ref="threeSixtyViewRef"
      :key="threeSixty?.initialImageUrl" class="flex justify-center 2xl:min-h-6h md:min-h-3.5h min-h-1.5h">
      <img v-if="threeSixty?.initialImageUrl" id="threesixty-image" :src="threeSixty?.initialImageUrl"
        class="w-full my-4 2xl:mt-8 md:mt-6 2xl:mb-0 2xl:w-auto 2xl:mx-auto three-sixty_image"
        @click="threeSixty?.viewer?.start()" />
      <p v-if="threeSixty?.error">{{ threeSixty.error }}</p>
    </div>

    <div v-show="modelType === 'interior'" class="h-[500px]">
    </div>

    <div class="md:mt-6 2xl:mt-12 relative">

      <Transition name="blur-fade">
        <div v-if="modelType == 'exterior'"
          class="flex flex-col items-center gap-2.5 2xl:absolute 2xl:-top-10 2xl:left-1/2 2xl:-translate-x-1/2 2xl:max-w-6h mx-auto 2xl:px-20 three-sixty_bottom-row_center">
          <UIIcon360 />
          <p class="text-xs+ text-disabled md:text-center">
            Изображение может не соответствовать выбранной комплектации. <br />
            Цвет автомобиля может отличаться от представленного на данном сайте.
          </p>
        </div>
      </Transition>
      <div class="mt-6 md:mt-10 md:flex justify-between items-end">
        <div class="three-sixty_bottom-row_left">
          <div class="flex gap-5 text-base+">
            <div class="flex items-center gap-2.5">
              <PrimeRadioButton v-model="modelType" value="exterior" input-id="exterior" name="type" :pt="{
                icon: 'hidden',
                box: (state) => {
                  return state.context.checked ? '!border-[6px] ' : '0'
                },
              }" />
              <label for="exterior" :class="{ 'text-white': modelType === 'interior' }">Экстерьер</label>
            </div>
            <!--<div class="flex items-center gap-2.5">
              <PrimeRadioButton v-model="modelType" value="interior" input-id="interior" name="type" :pt="{
                icon: 'hidden',
                box: (state) => {
                  return state.context.checked ? '!border-[6px] ' : '0'
                },
              }" />
              <label for="interior" :class="{ 'text-white': modelType === 'interior' }">Интерьер</label>
</div> -->
          </div>
          <Transition name="blur-fade">
            <div v-if="modelType === 'exterior'" class="mt-4">
              <div v-if="selectedColor" class="flex gap-1.5 text-base">
                <span class="text-disabled">Цвет:</span>
                <b class="text-primary">{{ selectedColor.name }}</b>
              </div>
              <div class="mt-4 flex gap-2.5">
                <div v-for="color in colors" :key="color.id"
                  class="color flex size-[35px] items-center justify-center rounded-full border border-disabled relative"
                  :style="{ backgroundColor: color.code ? color.code : '' }" @click="selectedColor = color">
                  <img v-if="!color.code" :src="safe(color.image)" class="w-full h-full" />
                  <UICheckIcon v-if="color.id === selectedColor?.id" class="text-white absolute" />
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <div class="mt-7.5 md:mt-0">
          <AtomButton label="Конфигуратор" color="primary" mode="full" />
        </div>
      </div>
    </div>
  </div>
</template>
