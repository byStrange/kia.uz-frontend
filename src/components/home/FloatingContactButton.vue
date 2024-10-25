<script setup>
import Button from "../common/Button.vue";
import PhoneIcon from "../icons/PhoneIcon.vue";
import XIcon from "../icons/XIcon.vue";
</script>
<template>
  <div class="fixed bottom-6 right-4 z-20 size-[70px] flex items-end">
    <Button class="py-1.5 px-1.5 absolute top-0 left-full -translate-x-full" corner="full">
      <XIcon width="8" height="8" />
    </Button>
    <Button class="py-4.5 px-4.5" corner="full">
      <PhoneIcon width="24" height="24" />
    </Button>
  </div>
</template>
