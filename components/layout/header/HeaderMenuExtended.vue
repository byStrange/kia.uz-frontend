<script setup lang="ts">
const { headerService } = useHeaderService()
</script>
<template>
  <div
    v-if="headerService.extendedMenu"
    class="z-30 w-full border 2xl:bg-white"
    :key="headerService.extendedMenu.label"
  >
    <div class="container">
      <div
        aria-label="Header"
        class="sticky top-0 z-10 flex h-[60px] items-center bg-white py-4.5 2xl:hidden"
      >
        <UIButton class="!p-0" @click="headerService.extendedMenu = null">
          <UITickToLeft />
        </UIButton>
        <h1
          class="absolute left-1/2 -translate-x-1/2 text-center text-lg font-semibold"
        >
          {{ headerService.extendedMenu.label }}
        </h1>
      </div>
      <div
        class="space-y-4.5 py-4.5 md:flex md:justify-between md:space-y-0 2xl:py-10"
      >
        <div v-if="headerService.extendedMenu.children" class="2xl:w-1/2">
          <div class="flex flex-col">
            <div
              v-for="item in headerService.extendedMenu.children"
              :key="item.label"
            >
              <NuxtLink :to="item.to" class="shrink-0 py-[5px]">
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="2xl:flex 2xl:w-1/2 2xl:gap-10">
          <div
            :style="{
              backgroundImage: `url(${headerService.extendedMenu.meta?.sideImage})`,
            }"
            class="relative flex h-[228px] w-full items-end bg-cover p-7.5 md:w-[290px]"
          >
            <div
              class="absolute bottom-0 left-0 z-0 h-[159px] w-full"
              :style="{
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%)',
              }"
            ></div>
            <p class="relative z-10 text-white">
              {{ headerService.extendedMenu.meta?.sideText }}
            </p>
          </div>
          <slot
            name="menuFooter"
            rootClass="hidden 2xl:block !border-none !py-0"
          />
        </div>
      </div>
    </div>
  </div>
</template>
