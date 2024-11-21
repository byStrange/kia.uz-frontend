<template>
  <button
    v-if="item.children?.length"
    :class="footerMenuItemCommonClasses + ' ' + 'order-1'"
  >
    <div class="flex items-center justify-between" @click.self="openMenu(item)">
      {{ item.label }}
      <UITickToBottom
        @click="openMenu(item)"
        :class="[
          'text-white transition-transform md:hidden',
          { 'rotate-180': openedItem === item },
        ]"
      />
    </div>
    <div
      :class="[
        'grid grid-rows-[0fr] overflow-hidden transition-all md:!mt-4 md:block',
        { 'mt-5 !grid-rows-[1fr]': openedItem === item },
      ]"
    >
      <div
        :class="[
          'invisible flex min-h-0 flex-col space-y-0.5 text-white opacity-0 transition-all md:visible md:opacity-100',
          { '!visible opacity-100': openedItem === item },
        ]"
      >
        <NuxtLink
          v-for="child in item.children"
          :key="child.label"
          :to="child.to"
          class="font-normal text-disabled py-1.25 w-fit link-hover"
        >
          {{ child.label }}
        </NuxtLink>
      </div>
    </div>
  </button>
  <NuxtLink
    v-else
    :to="item.to"
    :class="footerMenuItemCommonClasses + ' md:hidden'"
  >
    {{ item.label }}
  </NuxtLink>
</template>

<script setup lang="ts">
const openMenu = (item: FooterItem) => {
  if (openedItem.value === item) {
    openedItem.value = null
    return
  }
  openedItem.value = item
}

const openedItem = ref<FooterItem | null>(null)

let footerMenuItemCommonClasses =
  'menu-item md:py-0 py-5 text-sm+ font-semibold text-white block w-full text-start'

defineProps<{ item: FooterItem }>()
</script>
