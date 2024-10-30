<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import TickToBottom from "@/components/icons/20x20/TickToBottom.vue";
import GlobeIcon from "@/components/icons/GlobeIcon.vue";
import { useHeaderService } from "@/services/headerService";

const { headerService } = useHeaderService();

const emit = defineEmits(["language-change"]);

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event: any) => {
  const dropdown = document.querySelector(".language-selector");
  if (dropdown && !dropdown.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="language-selector relative text-semantic-primary">
    <button @click="toggleDropdown" class="flex items-center">
      <div class="hidden 2xl:flex items-center">
        <span>{{ $i18n.locale.toUpperCase() }}</span>
        <TickToBottom
          class="transition-all"
          :class="{
            'rotate-180': isOpen,
            '!text-semantic-primary': headerService.isHover,
            '!text-white': !headerService.isHover,
          }"
        />
      </div>
      <GlobeIcon
        class="text-white 2xl:hidden"
        :class="{ '!text-semantic-primary': headerService.isHover }"
      />
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute min-w-fit right-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded-[8px] shadow-lg overflow-hidden"
      >
        <ul>
          <li
            v-for="ln in $i18n.availableLocales"
            :key="ln"
            @click="
              $i18n.locale = ln;
              isOpen = false;
              headerService.isHover = false;
            "
            class="px-6 py-4 hover:bg-gray-100 cursor-pointer text-base"
          >
            {{ ln.toUpperCase() }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
