<script setup>
import { ref } from "vue";
import Button from "../common/Button.vue";
import PhoneIcon from "../icons/PhoneIcon.vue";
import XIcon from "../icons/XIcon.vue";

const show = ref(true);
</script>
<template>
  <Transition name="slide-down">
    <div
      class="fixed bottom-6 right-4 z-30 size-[70px] flex items-end"
      v-if="show"
    >
      <Button
        class="!py-1.5 !px-1.5 absolute top-0 left-full -translate-x-full"
        corner="full"
        @click="show = false"
      >
        <XIcon width="8" height="8" />
      </Button>
      <Button class="!py-4.5 !px-4.5 shadow" corner="full">
        <PhoneIcon width="24" height="24" />
      </Button>
    </div>
  </Transition>
</template>
