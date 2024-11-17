<script setup lang="tsx">
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
</script>
<template>
  <div data-label="360 view" class="container py-10 md:py-15 2xl:py-20">
    <div>
      <p class="text-sm text-primary font-semibold">Просмотр 360°</p>
      <h2 class="mt-2.5 text-4xl font-semibold text-primary 2xl:text-5xl">
        Carnival
      </h2>
    </div>
    <picture>
      <source
        srcset="
          https://ucarecdn.com/9a342c87-7ca1-43d4-abb0-1b505840f0c6/-/preview/768x432/
        "
        media="(min-width: 1440px)"
      />
      <img
        loading="lazy"
        src="https://ucarecdn.com/40aceb5c-0188-4362-bacd-86dd776ce86b/-/preview/1000x501/"
        class="w-full my-4 2xl:mt-8 md:mt-6 2xl:mb-0 2xl:w-auto 2xl:mx-auto"
      />
    </picture>
    <div class="md:mt-6 2xl:mt-12 relative">
      <div
        class="flex flex-col items-center gap-2.5 2xl:absolute 2xl:-top-10 2xl:left-1/2 2xl:-translate-x-1/2 2xl:max-w-6h mx-auto 2xl:px-20"
      >
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
              <PrimeRadioButton
                value="exterior"
                inputId="exterior"
                name="type"
                v-model="modelType"
                :pt="{
                  icon: 'hidden',
                  box: (state) => {
                    return state.context.checked ? '!border-[6px] ' : '0'
                  },
                }"
              />
              <label for="exterior">Экстерьер</label>
            </div>
            <div class="flex items-center gap-2.5">
              <PrimeRadioButton
                value="interior"
                inputId="interior"
                name="type"
                v-model="modelType"
                :pt="{
                  icon: 'hidden',
                  box: (state) => {
                    return state.context.checked ? '!border-[6px] ' : '0'
                  },
                }"
              />
              <label for="interior">Интерьер</label>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex gap-1.5 text-base">
              <span class="text-disabled">Цвет:</span>
              <b class="text-primary">Snow White Pearl (SWP)</b>
            </div>
            <div class="mt-4 flex gap-2.5">
              <div
                @click="selectedColor = color"
                class="color flex size-[35px] items-center justify-center rounded-full border border-disabled"
                :style="{ backgroundColor: color }"
                v-for="color in availableColors"
              >
                <UICheckIcon
                  v-if="color === selectedColor"
                  class="text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-7.5 md:mt-0">
          <UIButton label="Конфигуратор" color="secondary" mode="full" />
        </div>
      </div>
    </div>
  </div>
</template>
