<script setup lang="tsx">
import BurgerMenuIcon from "@/components/icons/BurgerMenuIcon.vue";
import PhoneIcon from "../icons/PhoneIcon.vue";
import UserIcon from "../icons/UserIcon.vue";
import LenseIcon from "../icons/LenseIcon.vue";
import Button from "../common/Button.vue";

import HeaderMenu from "./header/HeaderMenu.vue";

import { HeaderItem, useHeaderService } from "@/services/headerService";
import LanguageSelector from "./header/LanguageSelector.vue";
import { ref, watch } from "vue";
import { Language } from "@/types";

const { toggleMenu, headerService } = useHeaderService();

watch(headerService, () => {
  console.log(headerService.value);
});

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
        <button
          class="text-semantic-primary text-sm+"
          onClick={() => openMenu(item)}
        >
          {item.label}
        </button>
      ) : (
        <router-link to={item.to} class="text-semantic-primary text-sm+">
          {item.label}
        </router-link>
      )}
    </>
  );
};

const languages = ref<{ code: string; name: string }[]>([
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
]);

const language = ref<Language>({
  code: "en",
  name: "English",
});
</script>
<template>
  <header
    class="py-5 bg-semantic-header-bg border-b border-b-protection absolute top-0 w-full z-40"
    id="header"
    :class="{ hover: headerService.isHover }"
    @mouseenter="headerService.isHover = true"
    @mouseleave="headerService.isHover = headerService.isMenuOpen"
  >
    <div class="container flex items-center justify-between relative">
      <Button
        class="!text-white !bg-transparent 2xl:hidden !p-0"
        @click="toggleMenu"
      >
        <BurgerMenuIcon />
      </Button>

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
        <ul class="items-center gap-5 hidden 2xl:flex">
          <li v-for="item in headerService.routes.slice(4)" :key="item.label">
            <HeaderLink :item="item" />
          </li>
        </ul>
        <button>
          <PhoneIcon
            class="transition-colors"
            :class="{
              'text-semantic-primary': headerService.isHover,
              'text-white': !headerService.isHover,
            }"
          />
        </button>
        <button>
          <LenseIcon
            class="transition-colors"
            :class="{
              'text-white': !headerService.isHover,
              'text-semantic-primary': headerService.isHover,
            }"
          />
        </button>
        <button>
          <UserIcon
            class="transition-colors"
            :class="{
              'text-white': !headerService.isHover,
              'text-semantic-primary': headerService.isHover,
            }"
          />
        </button>
        <button>
          <LanguageSelector
            v-model:languages="languages"
            v-model:defaultLanguage="languages[0].code"
            v-model:language="language"
          />
        </button>
      </div>
    </div>
  </header>
  <HeaderMenu />
</template>
