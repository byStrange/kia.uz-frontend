<script setup lang="ts">
import { MoleculeTabsContainer } from '#components'
const tabRef = useTemplateRef<InstanceType<typeof MoleculeTabsContainer>>('tabsRef')


defineProps<{ section: any }>()
</script>
<template>
  <MoleculeSection :section-title="section.title" :subtitle="section.subtitle"
    class="2xl:grid 2xl:grid-cols-12 2xl:container 2xl:gap-x-grid-12-gap" align="left" :class="{
      '2xl:rtl bg-background': section.direction === 'left',
    }">
    <template #title="{ sectionTitle, sectionTitleClass, subtitleClass, subtitle }">
      <div class="container" :class="{

        '2xl:px-0 col-span-4 col-start-2': true,
        ltr: section.direction === 'left',
      }">
        <p v-if="section.subtitle" :class="subtitleClass">{{ subtitle }}</p>
        <h1 :class="[
          sectionTitleClass,
          {
            'mt-2 2xl:mt-2.5': true,
          },
        ]" class="!mb-0">
          {{ sectionTitle }}
        </h1>
        <p :class="{
          'mt-4 2xl:mt-7.5': true,
        }" class="text-sm text-primary">
          Откройте мир инноваций вместе с Kia Carnival — бесспорным лидером в
          своем классе. Новый дизайн добавляет семейному кроссвэну изысканность,
          роскошный интерьер обеспечивает комфорт, отличная управляемость
          гарантирует уверенность на любой дороге. Новый Kia Carnival наполнит
          вашу повседневную жизнь новыми впечатлениями.
        </p>
        <div v-if="section.meta && section.meta.tabs"
          class="hidden 2xl:block border-t border-t-protection mt-7.5 pt-7.5">
          <div>
            <ul class="space-y-3.5 text-base ml-3.5">
              <li v-for="(tab, _index) in section.meta.tabs" :key="_index" class="cursor-pointer" :class="{
                'font-semibold list-disc': section.meta.activeTabIndex
                  ? _index === section.meta.activeTabIndex
                  : _index === 0,
              }" @click="() => {
                if (tabRef) tabRef.changeTab(_index)
                section.meta.activeTabIndex = _index
              }
                ">
                {{ tab.title }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div :class="{
        'mt-10 col-start-7 col-span-6 2xl:mt-0': true,
        ltr: section.direction === 'left',
        '!col-start-7 !col-span-5': section.meta?.tabs,
      }">
        <div v-if="section.meta.tabs">
          <MoleculeTabsContainer ref="tabsRef" :is-header-full="true" :is-header-center="false"
            content-container-class="2xl:mt-0 2xl:px-0" header-class="2xl:hidden" header-key="title"
            :tabs="section.meta.tabs">
            <template #1="{ tab }">
              <div class="grid grid-cols-3 md:gap-2.5 2xl:flex 2xl:flex-col 2xl:divide-y divide-protection 2xl:gap-0">
                <div v-for="(item, index) in tab.items" :key="item.label"
                  class="space-y-2 2xl:flex justify-between items-center"
                  :class="index === 0 ? '2xl:pb-10' : '2xl:py-10'">
                  <p class="text-primary text-lg font-semibold">
                    <span class="2xl:text-9xl">{{ item.count.number }}</span>
                    <span class="ml-1 text-xs md:text-sm md:ml-2.5">{{
                      item.count.unit
                      }}</span>
                  </p>
                  <p class="text-caption text-xs md:text-sm 2xl:max-w-2h">
                    {{ item.label }}
                  </p>
                </div>
              </div>
            </template>
            <template #2="{ tab }">
              <div class="grid grid-cols-3 md:gap-2.5 2xl:flex 2xl:flex-col 2xl:divide-y divide-protection 2xl:gap-0">
                <div v-for="(item, index) in tab.items" :key="item.label"
                  class="space-y-2 2xl:flex justify-between items-center"
                  :class="index === 0 ? '2xl:pb-10' : '2xl:py-10'">
                  <p class="text-primary text-lg font-semibold">
                    <span class="2xl:text-9xl">{{ item.count.number }}</span>
                    <span class="ml-1 text-xs md:text-sm md:ml-2.5">{{
                      item.count.unit
                      }}</span>
                  </p>
                  <p class="text-caption text-xs md:text-sm 2xl:max-w-2h">
                    {{ item.label }}
                  </p>
                </div>
              </div>
            </template>
          </MoleculeTabsContainer>
        </div>
      </div>
    </template>
  </MoleculeSection>
</template>
