<script setup lang="ts">
const containerClasses = {
  container: '2xl:grid 2xl:grid-cols-12 2xl:container 2xl:gap-x-grid-12-gap',
  topContainer: 'container 2xl:col-start-2 2xl:col-end-12 2xl:px-0 2xl:grid 2xl:grid-cols-10',
  left: 'col-span-4',
  right: 'mt-2  md:mt-3 col-start-7 col-span-4 2xl:mt-0'
}

defineProps<{ title?: string, subtitle?: string, reverse?: boolean, classNames?: Partial<{ left: string, right: string, topContainer: string, bottomContainer: string, container: string }> }>() 
</script>
<template>
  <MoleculeSection ref="section" :section-title="title" :subtitle="subtitle"
    :class="[containerClasses.container, classNames?.container]" align="left">
    <template #title="{ sectionTitle, sectionTitleClass, subtitleClass, subtitle }">
      <div :class="[containerClasses.topContainer, classNames?.topContainer]">

        <div :class="[containerClasses.left, classNames?.left]">
          <slot name="left" :sectionTitle :sectionTitleClass :subtitleClass :subtitle />
        </div>

        <div :class="[containerClasses.right, classNames?.right]">
          <slot name="right" />
        </div>
      </div>
    </template>
    <div :class="classNames?.bottomContainer" class="mt-6 2xl:row-start-2 col-start-2 2xl:mt-1h col-end-12">
      <slot name="bottom" :containerClasses />
    </div>

    <slot />
  </MoleculeSection>
</template>
