<script setup lang="ts">
import type { ModelLandingPage } from '~/server/api/models/[id]/index.get';

const { safe } = useSafeAccessMedia()
const { price } = useFormat()
const { downloadFile } = useDownload()
const modelData = defineModel<ModelLandingPage | null>()
const showOnlyDifferingConfigurations = defineModel<boolean>("diffConf")
</script>
<template>
  <div
data-label="Hero top"
    class="container absolute hidden w-full items-start justify-end gap-6 pt-7.5 md:block 2xl:pt-5">
    <MoleculeBreadcrumb class="hidden bg-transparent text-white 2xl:block" theme="dark" />
  </div>
  <UIContainer>
    <div class="py-6 md:py-15 2xl:py-16">
      <div>
        <h1 class="text-2xl text-center text-primary font-semibold md:text-4xl 2xl:text-5xl 2xl:text-left">
          Комплектации и цены {{ modelData?.model.name }}
        </h1>
        <div class="mt-3 md:mt-4 text-center 2xl:text-left 2xl:flex justify-between">
          <div>
            <span class="text-caption text-sm md:text-base">Цена от</span>
            <p
              class="flex gap-x-2 mt-1 md:mt-2 justify-center text-base font-semibold md:text-lg items-center 2xl:text-2xl 2xl:justify-start">
              {{ price(modelData?.model.starting_price) }}
              <UIInfoIcon class="text-disabled" />
            </p>
          </div>
          <div class="gap-4 hidden 2xl:flex">
            <AtomButton @click="downloadFile(safe(modelData?.model.price_list))" label="Скачать прайс-лист" color="secondary" mode="full" />
            <AtomButton label="Свяжитесь с нами" color="primary" mode="full" />
          </div>
        </div>
      </div>
      <div class="py-6 my-5 md:py-10 md:my-0">
        <picture>
          <source />
          <img class="2xl:max-w-6h-10 mx-auto" :src="safe(modelData?.model.side_image)" />
        </picture>
      </div>
      <div class="space-y-2 md:grid md:grid-cols-2 md:gap-x-4 md:space-y-0 2xl:hidden">
        <AtomButton label="Свяжитесь с нами" color="secondary" mode="full" />
        <AtomButton @click="downloadFile(safe(modelData?.model.price_list))" label="Скачать прайс-лист" mode="full" />
      </div>
    </div>
    <div class="py-4 flex gap-9 md:py-5 2xl:gap-10">
      <div class="flex gap-2.5 items-center shrink-0 text-sm">
        <UIFilterIcon class="text-primary" />
        Фильтры и опции
      </div>

      <div class="shrink-0 text-sm">{{ modelData?.configurations.length }} комплектаций</div>

      <div class="gap-2.5 items-center shrink-0 hidden md:flex text-sm">
        <PrimeCheckbox v-model="showOnlyDifferingConfigurations" binary input-id="onlyDifferingConsInput" />
        <label for="onlyDifferingConsInput">Различающиеся характеристики </label>
      </div>
    </div>
  </UIContainer>
</template>
