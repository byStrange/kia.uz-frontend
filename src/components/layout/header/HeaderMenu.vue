<script setup lang="tsx">
import TickToRight from "@/components/icons/20x20/TickToRight.vue";
import { useHeaderService } from "@/services/headerService";
const { headerService } = useHeaderService();
import HeaderMenuExtended from "./HeaderMenuExtended.vue";
import { useDynamicHeight } from "@/composables/useDynamicHeight";
import { h } from "vue";

let commonClasses =
  "menu-item py-4.5 text-lg font-semibold text-semantic-primary block w-full text-start";

// Calculates the overall height of the menu excluding the #header height
const { height } = useDynamicHeight(["#header"]);

// Renders a menu item
const MenuItem = (props: any) => {
  return (
    <>
      {props.item.children?.length ? (
        <button
          class={commonClasses}
          onClick={() => (headerService.value.extendedMenu = props.item)}
        >
          <div class="container flex justify-between items-center">
            {props.item.label}
            <TickToRight />
          </div>
        </button>
      ) : (
        <router-link class={commonClasses} to={props.item.to}>
          <span class="block container">{props.item.label}</span>
        </router-link>
      )}
    </>
  );
};

// Renders all the menu items
const HeaderMenuItems = () => {
  return (
    <div class="divide-y divide-protection divide-opacity-60 2xl:hidden">
      {headerService.value.routes.map((item) => (
        <MenuItem key={item.label} item={item} />
      ))}
    </div>
  );
};

// Renders the footer of the menu
const MenuFooter = () => {
  return (
    <div
      class={[
        "py-4.5 border-t border-t-protection border-opacity-60",
        { "2xl:hidden": !headerService.value.extendedMenu },
      ]}
    >
      <div class="container space-y-7.5 ">
        <div class="space-y-2.5">
          <h3 class="text-sm+ text-caption">Горячая линия Kia</h3>
          <p class="text-semantic-primary font-semibold">
            {headerService.value.phoneLine1}
          </p>
        </div>
        <div class="space-y-2.5">
          <h3 class="text-sm+ text-caption">Информационная линия Kia</h3>
          <p class="text-semantic-primary font-semibold">
            {headerService.value.phoneLine2}
          </p>
        </div>
        <div class="space-y-2.5">
          <h3 class="text-sm+ text-caption">Kia в соцсетях</h3>
          <div class="flex gap-2">
            {headerService.value.socials.map((item) => (
              <a
                href={item.link}
                target="_blank"
                class="text-semantic-primary"
                key={item.link}
              >
                {h(item.icon, { class: "w-7.5 h-7.5" })}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
</script>

<template>
  <transition name="slide-fade" mode="out-in">
    <div
      @click.self="headerService.isMenuOpen = false"
      :style="{ height: `${height}px` }"
      class="absolute top-[65px] w-full z-40 overflow-auto"
      v-if="headerService.isMenuOpen"
      :key="headerService.extendedMenu?.label"
    >
      <div class="bg-white lg:flex lg:bg-transparent">
        <HeaderMenuItems v-if="!headerService.extendedMenu" />

        <HeaderMenuExtended>
          <template #menuFooter="{ rootClass }">
            <MenuFooter :class="rootClass" />
          </template>
        </HeaderMenuExtended>

        <MenuFooter class="lg:hidden" />
      </div>
    </div>
  </transition>
</template>
