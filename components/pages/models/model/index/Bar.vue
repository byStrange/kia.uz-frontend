<script setup lang="tsx">
const model = ref({
  name: 'K5',
})

const { headerService } = useHeaderService()
</script>
<template>
  <div
    data-label="Model bar"
    class="fixed top-0 z-20 flex w-full justify-between bg-primary px-page-padding py-3.5 transition-all duration-300 2xl:container"
    :class="{
      '!top-[65px]': headerService.isHeaderFixed,
      '!z-10': headerService.isMenuOpen,
    }"
  >
    <div
      class="2xl:flex 2xl:divide-x 2xl:divide-caption"
      data-label="Model bar left"
    >
      <button
        class="flex gap-2 text-white 2xl:2xl:pr-5"
        @click="$router.push('/models/1')"
      >
        <span class="2xl:text-lg">{{ model.name }}</span>
        <UITickToBottom class="text-white 2xl:hidden" />
      </button>
      <UIDesktopOnly flex class="gap-2 pl-5 text-white">
        <p class="text-base">от 543 510 000 сум</p>
        <button>
          <UIInfoIcon />
        </button>
      </UIDesktopOnly>
    </div>
    <div
      class="2xl:flex 2xl:divide-x 2xl:divide-caption"
      data-label="Model bar right"
    >
      <UIDesktopOnly class="pr-5">
        <ul class="flex items-center gap-6">
          <li>
            <a href="#" class="text-base text-white">Обзор</a>
          </li>
          <li>
            <NuxtLink to="/models/1/pricing" class="text-base text-white"
              >Комплектации и цены</NuxtLink
            >
          </li>
          <li>
            <a href="#" class="text-base text-white">Характеристики</a>
          </li>
          <li>
            <a href="#" class="text-base text-white">Брошюра</a>
          </li>
          <li class="flex items-center">
            <button class="text-white">
              <UIMoreIcon />
            </button>
          </li>
        </ul>
      </UIDesktopOnly>
      <button class="pl-5 text-white">Конфигуратор</button>
    </div>
  </div>
</template>
