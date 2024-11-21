<script setup>
const show = ref(true)
</script>
<template>
  <Transition name="slide-down">
    <div
      v-if="show"
      class="fixed bottom-5 size-[53px] md:size-[70px] right-[22px] z-30 flex items-end md:bottom-24 md:right-14 2xl:right-20"
    >
      <button
        class="absolute rounded-full bg-white right-0 top-0 p-1.25 md:p-1.5"
        @click="show = false"
      >
        <UIXIcon class="size-1.5 md:size-2" />
      </button>
      <button
        class="p-3 md:p-4.5 shadow border-none flex-center bg-white rounded-full"
        corner="full"
      >
        <UIPhoneIcon class="size-5 md:size-6" />
      </button>
    </div>
  </Transition>
</template>
