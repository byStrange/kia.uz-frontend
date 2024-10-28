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

const openMenu = (item: HeaderItem) => {
  if (
    headerService.value.extendedMenu &&
    headerService.value.extendedMenu.label == item.label
  ) {
    headerService.value.extendedMenu = null;
    headerService.value.isMenuOpen = false;
    return;
  }
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

watch(language, () => {
  console.log(language.value);
});
</script>
<template>
  <header
    class="py-5 bg-semantic-header-bg border-b border-b-protection fixed top-0 w-full z-40"
    id="header"
  >
    <div class="container flex items-center justify-between relative">
      <Button class="text-semantic-primary lg:hidden !p-0" @click="toggleMenu">
        <BurgerMenuIcon />
      </Button>

      <div class="hidden lg:block">
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
        <a href="/">
          <img
            src="@/assets/logo/main-logo-invert.svg"
            alt="Logo"
            class="h-3 w-[50px]"
          />
        </a>
      </div>

      <div class="flex items-center gap-2 md:gap-5">
        <ul class="items-center gap-5 hidden lg:flex">
          <li v-for="item in headerService.routes.slice(4)" :key="item.label">
            <HeaderLink :item="item" />
          </li>
        </ul>
        <button class="text-semantic-primary">
          <PhoneIcon />
        </button>
        <button class="text-semantic-primary">
          <LenseIcon />
        </button>
        <button class="text-semantic-primary">
          <UserIcon />
        </button>
        <button class="text-semantic-primary">
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
