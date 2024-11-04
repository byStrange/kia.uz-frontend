<script setup lang="tsx">
import { watch } from 'vue';

import { HeaderItem, useHeaderService } from '@/services/headerService';
import { isLocked } from '@/services/headerService';

import { useScroll } from '@/composables/useScroll';

import AnimatedBurgerMenuIcon from '../icons/AnimatedBurgerMenuIcon.vue';
import LenseIcon from '../icons/LenseIcon.vue';
import PhoneIcon from '../icons/PhoneIcon.vue';
import UserIcon from '../icons/UserIcon.vue';
import HeaderMenu from './header/HeaderMenu.vue';
import LanguageSelector from './header/LanguageSelector.vue';

const { toggleMenu, headerService } = useHeaderService();

useScroll();

const openMenu = (item: HeaderItem) => {
  if (
    headerService.value.extendedMenu &&
    headerService.value.extendedMenu.label == item.label
  ) {
    headerService.value.extendedMenu = null;
    headerService.value.isMenuOpen = false;
    isLocked.value = false;
    return;
  }

  if (!headerService.value.lockHover) {
    headerService.value.isHover = true;
  }
  headerService.value.isMenuOpen = true;
  headerService.value.extendedMenu = item;
  isLocked.value = true;
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
      class="bg-semantic-header-bg absolute top-0 z-40 w-full border-b border-b-white border-opacity-20 py-5 transition-all duration-300"
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
      <div
        class="relative flex w-full items-center justify-between px-page-padding transition-all duration-300 2xl:container"
      >
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
            <img
              v-if="!headerService.isHover"
              src="@/assets/logo/main-logo.svg"
              alt="Logo"
              class="h-3 w-[50px] transform-gpu"
            />

            <!-- Dark Logo -->
            <img
              v-if="headerService.isHover"
              src="@/assets/logo/main-logo-invert.svg"
              alt="Logo"
              class="h-3 w-[50px] transform-gpu"
            />
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
          <button class="hidden md:block">
            <LenseIcon
              class="transition-colors"
              :class="{
                'text-white': !headerService.isHover,
                'text-primary': headerService.isHover,
              }"
            />
          </button>
          <button class="hidden 2xl:block">
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
