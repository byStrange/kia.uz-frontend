<script setup lang="ts">
const modelType = ref('exterior')
const selectedColor = ref()

const availableColors = ref([
  '#F3F3F3',
  '#B6B7B2',
  '#2E2F31',
  '#99989E',
  '#7E2E35',
  '#8F9998',
])

const threeSixtyViewRef = ref(null)

const data = use360View(threeSixtyViewRef, {

  images: 'https://cdn.kia.uz/exterior/Cerato/B4U/',
  extension: 'png',
  prefix: '',
  totalImages: 72,
  preloadBeforeMount: true,
  sensitivity: 10,
  inertia: 0.2,

})

const { src } = useUploadcareSource()
</script>
<template>
  <div data-label="360 view" class="container py-10 md:py-15 2xl:py-20">
    <div>
      <p class="text-sm text-primary font-semibold">Просмотр 360°</p>
      <h2 class="mt-2.5 text-4xl font-semibold text-primary 2xl:text-5xl">
        Carnival
      </h2>
    </div>
    <div ref="threeSixtyViewRef">
      <img :draggable="false" loading="lazy" :src="data.currentSrc.value"
        class="w-full my-4 2xl:mt-8 md:mt-6 2xl:mb-0 2xl:w-auto 2xl:mx-auto" />
    </div>
    <div class="md:mt-6 2xl:mt-12 relative">
      <div
        class="flex flex-col items-center gap-2.5 2xl:absolute 2xl:-top-10 2xl:left-1/2 2xl:-translate-x-1/2 2xl:max-w-6h mx-auto 2xl:px-20">
        <UIIcon360 />
        <p class="text-xs+ text-disabled md:text-center">
          Изображение может не соответствовать выбранной комплектации. <br />
          Цвет автомобиля может отличаться от представленного на данном сайте.
        </p>
      </div>
      <div class="mt-6 md:mt-10 md:flex justify-between items-end">
        <div>
          <div class="flex gap-5 text-base+">
            <div class="flex items-center gap-2.5">
              <PrimeRadioButton v-model="modelType" value="exterior" input-id="exterior" name="type" :pt="{
                icon: 'hidden',
                box: (state) => {
                  return state.context.checked ? '!border-[6px] ' : '0'
                },
              }" />
              <label for="exterior">Экстерьер</label>
            </div>
            <div class="flex items-center gap-2.5">
              <PrimeRadioButton v-model="modelType" value="interior" input-id="interior" name="type" :pt="{
                icon: 'hidden',
                box: (state) => {
                  return state.context.checked ? '!border-[6px] ' : '0'
                },
              }" />
              <label for="interior">Интерьер</label>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex gap-1.5 text-base">
              <span class="text-disabled">Цвет:</span>
              <b class="text-primary">Snow White Pearl (SWP)</b>
            </div>
            <div class="mt-4 flex gap-2.5">
              <div v-for="color in availableColors" :key="color"
                class="color flex size-[35px] items-center justify-center rounded-full border border-disabled"
                :style="{ backgroundColor: color }" @click="selectedColor = color">
                <UICheckIcon v-if="color === selectedColor" class="text-white" />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-7.5 md:mt-0">
          <AtomButton label="Конфигуратор" color="primary" mode="full" />
        </div>
      </div>
    </div>
  </div>
</template>
