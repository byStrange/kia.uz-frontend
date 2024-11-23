<script setup lang="ts">
defineProps<{ d: 'left' | 'right' }>()
</script>
<template>
  <div
    :class="[
      'absolute z-10 bg-[linear-gradient(90deg,rgba(248,248,248,_0)0%,#F8F8F8_100%)] top-0  w-[86px] md:w-[136px] h-full md:bg-[linear-gradient(90deg,rgba(248,248,248,0)0%,#F8F8F8_97.09%)] 2xl:bg-[linear-gradient(90deg,rgba(255,255,255,0)0%,#FFFFFF_51.04%,#FFFFFF_100%)]',

      {
        'left-0 2xl:-left-10': d === 'left',
        'flip-x': d === 'left',
        'right-0': d === 'right',
      },
    ]"
  />
</template>
