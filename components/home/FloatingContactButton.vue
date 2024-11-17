<script setup>
const show = ref(true)
</script>
<template>
  <Transition name="slide-down">
    <div
      class="fixed bottom-5 right-5 z-30 flex size-[70px] items-end md:bottom-24 md:right-14 2xl:right-20"
      v-if="show"
    >
      <UIButton
        class="absolute left-full top-0 -translate-x-full !px-1.5 !py-1.5"
        corner="full"
        @click="show = false"
      >
        <UIXIcon width="8" height="8" />
      </UIButton>
      <UIButton class="!px-4.5 !py-4.5 shadow" corner="full">
        <UIPhoneIcon width="24" height="24" />
      </UIButton>
    </div>
  </Transition>
</template>
