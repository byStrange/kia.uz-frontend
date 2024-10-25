<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import TickToBottom from "@/components/icons/20x20/TickToBottom.vue";
import { Language } from "@/types";

const languages = defineModel<Language[]>("languages", {
  required: true,
  default: () => [
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
  ],
});

const defaultLanguage = defineModel<string>("defaultLanguage", {
  required: true,
  default: "en",
});

const language = defineModel<Language>("language");

const emit = defineEmits(["language-change"]);

const isOpen = ref(false);

const selectedLanguage = ref(
  languages.value.find((lang) => lang.code === defaultLanguage.value)
);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectLanguage = (ln: Language) => {
  selectedLanguage.value = ln;
  language.value = ln;
  isOpen.value = false;
  emit("language-change", ln.code);
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
  <div class="language-selector relative">
    <button @click="toggleDropdown" class="flex items-center">
      <span>{{ selectedLanguage?.code }}</span>
      <TickToBottom
        class="transition-transform"
        :class="{ 'rotate-180': isOpen }"
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
        class="absolute min-w-fit right-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
      >
        <ul class="py-1">
          <li
            v-for="language in languages"
            :key="language.code"
            @click="selectLanguage(language)"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            :class="{ 'bg-blue-50': selectedLanguage?.code === language.code }"
          >
            {{ language.name }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
