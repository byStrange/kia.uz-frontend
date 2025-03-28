<script setup lang="ts">
import { UIHeaderLink } from '#components'

const { toggleMenu, headerService } = useHeaderService()

usePageScroll()

const openMenu = (item: HeaderItem) => {
  if (
    headerService.value.extendedMenu &&
    headerService.value.extendedMenu.label == item.label
  ) {
    headerService.value.extendedMenu = null
    headerService.value.isMenuOpen = false
    isLocked.value = false
    return
  }

  if (!headerService.value.lockHover) {
    headerService.value.isHover = true
  }
  headerService.value.isMenuOpen = true
  headerService.value.extendedMenu = item
  isLocked.value = true
}

provide('openMenu', openMenu)

watch(
  () => headerService.value.isHeaderFixed,
  () => {
    if (!headerService.value.lockHover) {
      headerService.value.isHover =
        headerService.value.isHeaderFixed || headerService.value.isMenuOpen
    }
  },
)

const searchBarOpen = ref(false)

watch(searchBarOpen, () => {
  const headerHeight = searchBarOpen.value ? `${innerWidth < 768 ? '80px' : '94px'}` : `${innerWidth < 768 ? '60px' : '80px'}`
  document.documentElement.style.setProperty('--header-height', headerHeight)
})

watch(
  () => headerService.value.lockHover,
  () => {
    headerService.value.isHover = headerService.value.lockHover
  },
)
</script>
<template>
  <Transition name="slide-fade_bottom">
    <header
id="header" :key="headerService.isHeaderFixed + ''" :data-isHover="headerService.isHover"
      class="bg-semantic-header-bg absolute top-0 z-40 w-full border-b border-b-white border-opacity-20 transition-all duration-300 backdrop-blur-sm"
      :class="{
        hover:
          headerService.isHover ||
          headerService.isMenuOpen ||
          headerService.isHeaderFixed,
        '!fixed shadow': headerService.isHeaderFixed,
        '!shadow-none !border-transparent': searchBarOpen,
      }" @mouseenter="() => {
        if (!headerService.lockHover) {
          headerService.isHover = true
        } else headerService.isHover = true
      }
        " @mouseleave="() => {
          if (!headerService.lockHover) {
            headerService.isHover =
              headerService.isMenuOpen || headerService.isHeaderFixed
          } else headerService.isHover = headerService.lockHover
        }
          ">
      <Transition name="blur-fade" mode="out-in">
        <div
v-if="!searchBarOpen"
          class="relative flex w-full items-center justify-between px-page-padding transition-all duration-300 2xl:container h-15 2xl:h-auto">
          <button
class="!bg-transparent !p-0 !text-white 2xl:hidden" @click="() => {
            toggleMenu()
          }
            ">
            <UIAnimatedBurgerMenuIcon :hidden="!headerService.isMenuOpen" :class="{ light: headerService.isHover }" />
          </button>

          <div class="hidden 2xl:block">
            <ul class="flex items-center gap-5">
              <li v-for="item in headerService.routes.slice(0, 4)" :key="item.label">
                <UIHeaderLink :item="item" />
              </li>
            </ul>
          </div>

          <div class="absolute left-1/2 -translate-x-1/2">
            <NuxtLinkLocale to="/">
              <!-- Light Logo -->
              <img
v-if="!headerService.isHover" src="@/assets/logo/main-logo.svg" alt="Logo"
                class="h-3 w-[50px] 2xl:w-[79px] 2xl:h-4.5" />

              <!-- Dark Logo -->
              <img
v-if="headerService.isHover" src="@/assets/logo/main-logo-invert.svg" alt="Logo"
                class="h-3 w-[50px] 2xl:w-[79px] 2xl:h-4.5" />
            </NuxtLinkLocale>
          </div>

          <div class="flex items-center gap-4 md:gap-5">
            <ul class="hidden items-center gap-5 2xl:flex">
              <li v-for="item in headerService.routes.slice(4)" :key="item.label">
                <UIHeaderLink :item="item" />
              </li>
            </ul>
            <button>
              <UIPhoneIcon
class="transition-colors" :class="{
                'text-primary': headerService.isHover,
                'text-white': !headerService.isHover,
              }" />
            </button>
            <button class="hidden md:block" @click="searchBarOpen = true">
              <UILenseIcon
class="transition-colors" :class="{
                'text-white': !headerService.isHover,
                'text-primary': headerService.isHover,
              }" />
            </button>
            <UILanguageSelector />
          </div>
        </div>
        <OrganismHeaderSearchBar v-else v-model:show="searchBarOpen" />
      </Transition>
    </header>
  </Transition>
  <UIHeaderMenu />
</template>
