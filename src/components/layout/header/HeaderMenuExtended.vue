<script setup lang="ts">
import Button from "@/components/common/Button.vue";
import TickToLeft from "@/components/icons/20x20/TickToLeft.vue";
import { useHeaderService } from "@/services/headerService";
const { headerService } = useHeaderService();
</script>
<template>
  <div
    v-if="headerService.extendedMenu"
    class="w-full z-30 border 2xl:bg-white"
    :key="headerService.extendedMenu.label"
  >
    <div class="container">
      <div
        aria-label="Header"
        class="bg-white z-10 flex items-center py-4.5 h-[60px] sticky top-0 2xl:hidden"
      >
        <Button class="!p-0" @click="headerService.extendedMenu = null">
          <TickToLeft />
        </Button>
        <h1
          class="text-lg font-semibold absolute left-1/2 -translate-x-1/2 text-center"
        >
          {{ headerService.extendedMenu.label }}
        </h1>
      </div>
      <div
        class="space-y-4.5 py-4.5 2xl:py-10 md:flex md:justify-between md:space-y-0"
      >
        <div v-if="headerService.extendedMenu.children" class="2xl:w-1/2">
          <div class="flex flex-col">
            <div
              v-for="item in headerService.extendedMenu.children"
              :key="item.label"
            >
              <router-link :to="item.to" class="py-[5px] shrink-0">
                {{ item.label }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="2xl:flex 2xl:w-1/2 2xl:gap-10">
          <div
            :style="{
              backgroundImage: `url(${headerService.extendedMenu.meta?.sideImage})`,
            }"
            class="p-7.5 bg-cover h-[228px] w-full flex items-end relative md:w-[290px]"
          >
            <div
              class="absolute h-[159px] w-full bottom-0 left-0 z-0"
              :style="{
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%)',
              }"
            ></div>
            <p class="text-white relative z-10">
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
