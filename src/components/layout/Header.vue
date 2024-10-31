<script setup lang="tsx">
import PhoneIcon from '../icons/PhoneIcon.vue';
import UserIcon from '../icons/UserIcon.vue';
import LenseIcon from '../icons/LenseIcon.vue';

import HeaderMenu from './header/HeaderMenu.vue';

import { HeaderItem, useHeaderService } from '@/services/headerService';
import LanguageSelector from './header/LanguageSelector.vue';
import { watch } from 'vue';
import { useScroll } from '@/composables/useScroll';
import AnimatedBurgerMenuIcon from '../icons/AnimatedBurgerMenuIcon.vue';

const { toggleMenu, headerService } = useHeaderService();

useScroll();

const openMenu = (item: HeaderItem) => {
  if (
    headerService.value.extendedMenu &&
    headerService.value.extendedMenu.label == item.label
  ) {
    headerService.value.extendedMenu = null;
    headerService.value.isMenuOpen = false;
    headerService.value.isHover = false;
    return;
  }
  headerService.value.isHover = true;
  headerService.value.isMenuOpen = true;
  headerService.value.extendedMenu = item;
};

const HeaderLink = ({ item }: { item: HeaderItem }) => {
  return (
    <>
      {item.children?.length ? (
        <button class="text-sm+ text-primary" onClick={() => openMenu(item)}>
          {item.label}
        </button>
      ) : (
        <router-link to={item.to} class="text-sm+ text-primary">
          {item.label}
        </router-link>
      )}
    </>
  );
};

watch(
  () => headerService.value.isHeaderFixed,
  () => {
    if (!headerService.value.lockHover) {
      headerService.value.isHover =
        headerService.value.isHeaderFixed || headerService.value.isMenuOpen;
    }
  }
);

watch(
  () => headerService.value.lockHover,
  () => {
    headerService.value.isHover = headerService.value.lockHover;
  }
);
</script>
<template>
  <Transition name="slide-fade_bottom">
    <header
      :data-isHover="headerService.isHover"
      :key="headerService.isHeaderFixed + ''"
      class="bg-semantic-header-bg absolute top-0 z-40 w-full border-b border-b-white border-opacity-20 py-5"
      id="header"
      :class="{
        hover:
          headerService.isHover ||
          headerService.isMenuOpen ||
          headerService.isHeaderFixed,
        '!fixed shadow': headerService.isHeaderFixed,
      }"
      @mouseenter="
        () => {
          if (!headerService.lockHover) {
            headerService.isHover = true;
          } else headerService.isHover = true;
        }
      "
      @mouseleave="
        () => {
          if (!headerService.lockHover) {
            headerService.isHover = headerService.isMenuOpen;
          } else headerService.isHover = headerService.lockHover;
        }
      "
    >
      <div class="container relative flex items-center justify-between">
        <button
          class="!bg-transparent !p-0 !text-white 2xl:hidden"
          @click="
            () => {
              toggleMenu();
            }
          "
        >
          <AnimatedBurgerMenuIcon
            :hidden="!headerService.isMenuOpen"
            :class="{ light: headerService.isHover }"
          />
        </button>

        <div class="hidden 2xl:block">
          <ul class="flex items-center gap-5">
            <li
              v-for="item in headerService.routes.slice(0, 4)"
              :key="item.label"
            >
              <HeaderLink :item="item" />
            </li>
          </ul>
        </div>

        <div class="absolute left-1/2 -translate-x-1/2">
          <a href="/" class="relative block h-3 w-[50px]">
            <!-- Light Logo -->
            <Transition
              enter-from-class="opacity-0 rotate-y-90 scale-50"
              enter-active-class="transition-all duration-300 transform-gpu"
              enter-to-class="opacity-100 rotate-y-0 scale-100"
              leave-active-class="transition-all duration-300 transform-gpu absolute top-0"
              leave-from-class="opacity-100 rotate-y-0 scale-100"
              leave-to-class="opacity-0 rotate-y-90 scale-50"
            >
              <img
                v-if="!headerService.isHover"
                src="@/assets/logo/main-logo.svg"
                alt="Logo"
                class="h-3 w-[50px] transform-gpu"
              />
            </Transition>

            <!-- Dark Logo -->
            <Transition
              enter-from-class="opacity-0 -rotate-y-90 scale-50"
              enter-active-class="transition-all duration-300 transform-gpu"
              enter-to-class="opacity-100 rotate-y-0 scale-100"
              leave-active-class="transition-all duration-300 transform-gpu absolute top-0"
              leave-from-class="opacity-100 rotate-y-0 scale-100"
              leave-to-class="opacity-0 -rotate-y-90 scale-50"
            >
              <img
                v-if="headerService.isHover"
                src="@/assets/logo/main-logo-invert.svg"
                alt="Logo"
                class="h-3 w-[50px] transform-gpu"
              />
            </Transition>
          </a>
        </div>

        <div class="flex items-center gap-2 md:gap-5">
          <ul class="hidden items-center gap-5 2xl:flex">
            <li v-for="item in headerService.routes.slice(4)" :key="item.label">
              <HeaderLink :item="item" />
            </li>
          </ul>
          <button>
            <PhoneIcon
              class="transition-colors"
              :class="{
                'text-primary': headerService.isHover,
                'text-white': !headerService.isHover,
              }"
            />
          </button>
          <button>
            <LenseIcon
              class="transition-colors"
              :class="{
                'text-white': !headerService.isHover,
                'text-primary': headerService.isHover,
              }"
            />
          </button>
          <button>
            <UserIcon
              class="transition-colors"
              :class="{
                'text-white': !headerService.isHover,
                'text-primary': headerService.isHover,
              }"
            />
          </button>
          <button>
            <LanguageSelector />
          </button>
        </div>
      </div>
    </header>
  </Transition>
  <HeaderMenu />
</template>
