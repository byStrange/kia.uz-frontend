<script setup lang="ts">
defineProps<{ section: any }>()
</script>
<template>
  <MoleculeSection :section-title="section.title" :subtitle="section.subtitle"
    class="2xl:grid 2xl:grid-cols-12 2xl:container 2xl:gap-x-grid-12-gap" align="left" :class="{
      '2xl:rtl bg-background': section.direction === 'left',
    }">
    <template #title="{ sectionTitle, sectionTitleClass, subtitleClass, subtitle }">
      <div class="container" :class="{
        '2xl:col-start-2 2xl:col-end-12 2xl:px-0 2xl:grid 2xl:grid-cols-10':
          true,
        ltr: section.direction === 'left',
      }">
        <p v-if="section.subtitle" :class="subtitleClass">{{ subtitle }}</p>
        <h1 :class="[
          sectionTitleClass,
          {
            'col-span-4': true,
          },
        ]" class="!mb-0">
          {{ sectionTitle }}
        </h1>
        <p :class="{
          'mt-2 md:text-base+ md:mt-3 col-start-7 col-span-4 2xl:mt-0': true,
        }" class="text-sm text-primary">
          Откройте мир инноваций вместе с Kia Carnival — бесспорным лидером в
          своем классе. Новый дизайн добавляет семейному кроссвэну изысканность,
          роскошный интерьер обеспечивает комфорт, отличная управляемость
          гарантирует уверенность на любой дороге. Новый Kia Carnival наполнит
          вашу повседневную жизнь новыми впечатлениями.
        </p>
      </div>
    </template>
    <div :class="{
      'mt-6 2xl:row-start-2 col-start-2 2xl:mt-1h col-end-12': true,
      ltr: section.direction === 'left',
    }">
      <picture v-if="section.images">
        <source v-if="section.images.lg" :srcset="section.images.lg?.src" media="(min-width: 1440px)" />
        <source v-if="section.images.md" :srcset="section.images.md?.src" media="(min-width: 768px)" />
        <img :src="section.images.default?.src" loading="lazy" class="w-full" />
      </picture>
    </div>
  </MoleculeSection>
</template>
