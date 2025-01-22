<script setup lang="ts">
defineProps<{ title?: string, subtitle?: string, direction?: string, classNames?: Partial<{ containerClass: string, leftContainerClass: string, rightContainerClass: string }> }>() 
</script>
<template>
  <MoleculeSection ref="section" :section-title="title" :subtitle="subtitle"
    class="2xl:grid 2xl:grid-cols-12 2xl:container 2xl:gap-x-grid-12-gap " align="left" :class="[classNames?.containerClass, {
      '2xl:rtl bg-background': direction === 'left',
    }]">
    <template #title="{ sectionTitle, sectionTitleClass, subtitleClass, subtitle }">
      <div class="container split-left 2xl:px-0 col-span-4 col-start-2" :class="[classNames?.leftContainerClass, {
        ltr: direction === 'left',
      }]">
        <slot name="left" :sectionTitle :sectionTitleClass :subtitleClass :subtitle />
      </div>
      <div class="mt-10 col-start-7 col-span-6 2xl:mt-0 split-right" :class="[classNames?.rightContainerClass, {
        ltr: direction === 'left',
      }]">
        <slot name="right" />
      </div>
    </template>
  </MoleculeSection>
</template>
