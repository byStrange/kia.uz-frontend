<script setup lang="ts">
const { src } = useUploadcareSource()

definePageMeta({
  lockHover: true,
})

const { models } = useStore()
</script>
<template>
  <UISafeAreaView>
    <UIContainer>
      <div class="pt-10 pb-6 md:pb-5 pt-15 2xl:pt-6 2xl:pb-0">
        <UIDesktopOnly>
          <UIBreadcrumb theme="dark" />
        </UIDesktopOnly>
        <h1 class="text-primary text-2xl md:text-4xl 2xl:mt-7.5 2xl:text-5xl">
          Руководство по эксплуатации
        </h1>
      </div>
      <div
        class="pt-6 pb-15 space-y-12 md:grid md:grid-cols-2 md:gap-grid-12-gap md:space-y-0 2xl:grid-cols-4 2xl:pt-1h"
      >
        <div v-for="model in models.slice(0, 4)" :key="model.name">
          <img :src="src('0b0e228e-8e0e-4f06-b1b6-4974f45d1d0e')" alt="" />
          <div class="mt-5">
            <h2
              class="text-primary font-semibold text-base md:text-lg 2xl:text-2xl"
            >
              {{ model.title }}
            </h2>
            <button class="flex gap-x-2 mt-2 cursor-pointer">
              <UIPDFIcon class="text-primary" />
              <p class="text-base text-primary font-semibold">
                Скачать руководство
              </p>
            </button>
          </div>
        </div>
      </div>

      <div class="pb-12 md:grid md:grid-cols-2 rtl">
        <picture>
          <source
            :srcset="src('b233ed8a-dc9a-4e68-9fb2-24cbe43f99ba')"
            media="(min-width: 768px) and (max-width: 1440px)"
          />
          <img
            :src="src('062491d2-01fb-48b1-b730-43639a864d04')"
            alt=""
            class="object-cover md:w-full md:max-h-3h 2xl:max-h-none md:h-full 2xl:h-[388px]"
          />
        </picture>
        <div
          class="py-8 px-4 bg-caption md:px-6 md:flex md:flex-col md:justify-between md:items-start 2xl:px-12 2xl:py-14 ltr"
        >
          <div class="text-white">
            <h2 class="text-lg font-semibold md:text-2xl 2xl:text-5xl">
              Предупреждающие индикаторы
            </h2>
            <p class="mt-2 text-sm md:text-base+ 2xl:mt-4 2xl:text-lg">
              Информируют о сервисных функциях автомобиля и их активности.
            </p>
          </div>
          <UIButton
            mode="full"
            label="Подробнее"
            class="mt-6 !text-base+"
          />
        </div>
      </div>
    </UIContainer>
  </UISafeAreaView>
</template>
