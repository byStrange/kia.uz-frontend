<script setup>
const show = ref(true)
</script>
<template>
  <Transition name="slide-down">
    <div
      class="fixed bottom-5 size-[53px] right-[22px] z-30 flex items-end md:bottom-24 md:right-14 2xl:right-20"
      v-if="show"
    >
      <button
        class="absolute rounded-full bg-white right-0 top-0 p-1.25"
        @click="show = false"
      >
        <UIXIcon width="6" height="6" />
      </button>
      <button class="p-3 shadow border-none flex-center bg-white rounded-full" corner="full">
        <UIPhoneIcon width="20" height="20" />
      </button>
    </div>
  </Transition>
</template>
