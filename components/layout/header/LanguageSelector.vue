<script setup lang="ts">
const { headerService } = useHeaderService()

const emit = defineEmits(['language-change'])

const isOpen = ref(false)

const { setLocale } = useI18n()

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (event: any) => {
  const dropdown = document.querySelector('.language-selector')
  if (dropdown && !dropdown.contains(event.target)) {
    isOpen.value = false
  }
}

const selectLocale = (locale: 'ru' | 'uz') => {
  setLocale(locale)
  emit('language-change', locale)
  isOpen.value = false
  if (!headerService.value.lockHover) {
    headerService.value.isHover = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="language-selector relative text-primary">
    <button class="flex items-center" @click="toggleDropdown">
      <div class="flex items-center">
        <span>{{ $i18n.locale.toUpperCase() }}</span>
        <UITickToBottom
          class="transition-all"
          :class="{
            'rotate-180': isOpen,
            '!text-primary': headerService.isHover,
            '!text-white': !headerService.isHover,
          }"
        />
      </div>
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
        class="absolute right-0 z-40 mt-1 w-full min-w-fit overflow-hidden rounded-[8px] border border-gray-300 bg-white shadow-lg"
      >
        <ul>
          <li
            v-for="ln in $i18n.locales.value"
            :key="ln"
            class="cursor-pointer px-6 py-4 text-base hover:bg-gray-100"
            @click="selectLocale(ln.code)"
          >
            {{ ln.code.toUpperCase() }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
