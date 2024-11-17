<script setup lang="ts">
</script>
<template>
  <div
    data-label="Hero top"
    class="container absolute hidden h-[190px] w-full items-start justify-end gap-6 pt-7.5 md:block 2xl:pt-5"
  >
    <UIBreadcrumb
      class="hidden bg-transparent text-white 2xl:block"
      theme="dark"
    />
  </div>
  <UIContainer>
    <div class="py-6 md:py-15 2xl:py-16">
      <div>
        <h1
          class="text-2xl text-center text-primary font-semibold md:text-4xl 2xl:text-5xl 2xl:text-left"
        >
          Комплектации и цены K5
        </h1>
        <div
          class="mt-3 md:mt-4 text-center 2xl:text-left 2xl:flex justify-between"
        >
          <div>
            <span class="text-caption text-sm md:text-base">Цена от</span>
            <p
              class="flex gap-x-2 mt-1 md:mt-2 justify-center text-base font-semibold md:text-lg items-center 2xl:text-2xl 2xl:justify-start"
            >
              379 900 000 сум <UIInfoIcon class="text-disabled" />
            </p>
          </div>
          <div class="gap-4 hidden 2xl:flex">
            <UIButton label="Свяжитесь с нами" color="secondary" mode="full" />
            <UIButton label="Скачать прайс-лист" mode="full" />
          </div>
        </div>
      </div>
      <div class="py-6 my-5 md:py-10 md:my-0">
        <picture>
          <source />
          <img
            class="2xl:max-w-6h-10 mx-auto"
            src="https://ucarecdn.com/8468f693-0741-409d-9b50-b8db499ecc26/-/preview/313x118"
          />
        </picture>
      </div>
      <div
        class="space-y-2 md:grid md:grid-cols-2 md:gap-x-4 md:space-y-0 2xl:hidden"
      >
        <UIButton label="Свяжитесь с нами" color="secondary" mode="full" />
        <UIButton label="Скачать прайс-лист" mode="full" />
      </div>
    </div>
    <div class="py-4 flex gap-9 md:py-5 2xl:gap-10">
      <button class="flex gap-2.5 items-center shrink-0 text-sm">
        <UIFilterIcon class="text-primary" />
        Фильтры и опции
      </button>

      <button class="shrink-0 text-sm">8 комплектаций</button>

      <div class="gap-2.5 items-center shrink-0 hidden md:flex text-sm">
        <PrimeCheckbox />
        <label for="ch1">Различающиеся характеристики </label>
      </div>
    </div>
  </UIContainer>
</template>
