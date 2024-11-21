<script setup lang="ts">
import { UIMenuItem } from '#components'

const { headerService, closeExtendedMenu } = useHeaderService()

// Calculates the overall height of the menu excluding the #header height
const { height } = useDynamicHeight(['#header'])
</script>

<template>
  <transition name="slide-fade" mode="out-in">
    <div
      @click.self="closeExtendedMenu"
      :style="{ height: `${height}px` }"
      class="fixed top-[--header-height] z-20 w-full overflow-auto bg-black bg-opacity-20"
      v-if="headerService.isMenuOpen"
      :key="headerService.extendedMenu?.label"
    >
      <div class="bg-white 2xl:flex 2xl:bg-transparent">
        <div class="divide-y divide-protection divide-opacity-60 2xl:hidden">
          <UIMenuItem
            :key="item.label"
            :item="item"
            v-for="item in headerService.routes"
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
