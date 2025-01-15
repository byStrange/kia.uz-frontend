<script setup lang="ts">
import { UIMenuItem } from '#components'

const { headerService, closeExtendedMenu } = useHeaderService()
</script>

<template>
  <transition name="slide-fade" mode="out-in">
    <div
      v-if="headerService.isMenuOpen"
      :key="headerService.extendedMenu?.label"
      :style="{ height: `calc(100dvh - var(--header-height))` }"
      class="fixed top-[--header-height] z-20 w-full overflow-auto bg-black bg-opacity-20"
      @click.self="closeExtendedMenu"
    >
      <div class="bg-white 2xl:flex 2xl:bg-transparent">
        <div
          v-if="!headerService.extendedMenu"
          class="divide-y divide-protection divide-opacity-60 2xl:hidden"
        >
          <UIMenuItem
            v-for="item in headerService.routes"
            :key="item.label"
            :item="item"
          />
        </div>

        <UIHeaderMenuExtended>
          <template #menuFooter="{ rootClass }">
            <UIMenuFooter :class="rootClass" />
          </template>
        </UIHeaderMenuExtended>

        <UIMenuFooter class="2xl:hidden" />
      </div>
    </div>
  </transition>
</template>
