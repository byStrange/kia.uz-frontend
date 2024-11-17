<script setup lang="ts">
const { sections } = useStore()
import { UISlideView, UITabsContainer } from '#components'

function is(type: 'triple' | 'double', section: any) {
  return type === section.type
}

const slides = useTemplateRef<InstanceType<typeof UISlideView>[]>('slidesRef')
const tabs = useTemplateRef<InstanceType<typeof UITabsContainer>[]>('tabsRef')

const processedSections = computed(() => {
  let slidesCounter = 0
  let tabsCounter = 0
  return sections.value.map((section) => {
    if (section.meta?.slides) slidesCounter++

    if (section.meta?.tabs) tabsCounter++

    return {
      ...section,
      slidesCounter,
      tabsCounter,
    }
  })
})
</script>
<template>
  <UISection
    :sectionTitle="section.title"
    :subtitle="section.subtitle"
    class="2xl:grid 2xl:grid-cols-12 2xl:container 2xl:gap-x-grid-12-gap"
    :key="section.title"
    align="left"
    v-for="section in processedSections"
    :class="{
      '2xl:rtl bg-background': section.direction === 'left',
    }"
  >
    <template
      #title="{ sectionTitle, sectionTitleClass, subtitleClass, subtitle }"
    >
      <div
        class="container"
        :class="{
          '2xl:col-start-2 2xl:col-end-12 2xl:px-0 2xl:grid 2xl:grid-cols-10':
            is('triple', section),
          '2xl:px-0 col-span-4 col-start-2': is('double', section),
          ltr: section.direction === 'left',
        }"
      >
        <p v-if="section.subtitle" :class="subtitleClass">{{ subtitle }}</p>
        <h1
          :class="[
            sectionTitleClass,
            {
              'mt-2 2xl:mt-2.5': is('double', section),
              'col-span-4': is('triple', section),
            },
          ]"
          class="!mb-0"
        >
          {{ sectionTitle }}
        </h1>
        <p
          :class="{
            'mt-2 md:text-base+ md:mt-3 col-start-7 col-span-4 2xl:mt-0': is(
              'triple',
              section,
            ),
            'mt-4 2xl:mt-7.5': is('double', section),
          }"
          class="text-sm text-primary"
        >
          Откройте мир инноваций вместе с Kia Carnival — бесспорным лидером в
          своем классе. Новый дизайн добавляет семейному кроссвэну изысканность,
          роскошный интерьер обеспечивает комфорт, отличная управляемость
          гарантирует уверенность на любой дороге. Новый Kia Carnival наполнит
          вашу повседневную жизнь новыми впечатлениями.
        </p>
        <div
          v-if="is('double', section) && section.meta"
          class="hidden 2xl:block border-t border-t-protection mt-7.5 pt-7.5"
        >
          <div v-if="section.meta.tabs">
            <ul class="space-y-3.5 text-base ml-3.5">
              <li
                class="cursor-pointer"
                v-for="(tab, _index) in section.meta.tabs"
                :key="_index"
                :class="{
                  'font-semibold list-disc': section.meta.activeTabIndex
                    ? _index === section.meta.activeTabIndex
                    : _index === 0,
                }"
                @click="
                  () => {
                    if (tabs) tabs[section.tabsCounter - 1].changeTab(_index)
                    section.meta.activeTabIndex = _index
                  }
                "
              >
                {{ tab.title }}
              </li>
            </ul>
          </div>
          <div v-else-if="section.meta.slides">
            <ul class="space-y-3.5 text-base ml-3.5">
              <li
                class="cursor-pointer"
                v-for="(tab, _index) in section.meta.slides"
                :key="_index"
                :class="{
                  'font-semibold list-disc': section.meta.activeSlideIndex
                    ? _index === section.meta.activeSlideIndex
                    : _index === 0,
                }"
                @click="
                  () => {
                    if (slides) {
                      slides[section.slidesCounter - 1].swiper?.slideTo(_index)
                      section.meta.activeSlideIndex = _index
                    }
                  }
                "
              >
                {{ tab.label }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <div
      :class="{
        'mt-6 2xl:row-start-2 col-start-2 2xl:mt-1h col-end-12': is(
          'triple',
          section,
        ),
        'mt-10 col-start-7 col-span-6 2xl:mt-0': is('double', section),
        ltr: section.direction === 'left',
        '!col-start-7 !col-span-5': section.meta?.tabs,
      }"
      :s="section.images?.default?.src"
    >
      <template v-if="is('triple', section)">
        <picture v-if="section.images">
          <source
            :srcset="section.images.lg?.src"
            media="(min-width: 1440px)"
            v-if="section.images.lg"
          />
          <source
            :srcset="section.images.md?.src"
            media="(min-width: 768px)"
            v-if="section.images.md"
          />
          <img
            :src="section.images.default?.src"
            loading="lazy"
            class="w-full"
          />
        </picture>
      </template>
      <template v-else-if="is('double', section)">
        <UISlideView
          ref="slidesRef"
          v-if="section.meta.slides"
          :data="section.meta.slides"
          class="2xl:pointer-events-none 2xl:max-w-[620px]"
          paginator-class="2xl:hidden"
          :space-between="0"
          :breakpoints-enabled="false"
          :navigation="false"
          pagination-mt="1rem"
        >
          <template #slide="{ item }">
            <img
              class="max-h-[620px] md:w-[656px] md:h-[645px] object-cover w-full"
              :src="item.image"
              loading="lazy"
            />
          </template>
        </UISlideView>
        <div v-else-if="section.meta.tabs">
          <UITabsContainer
            ref="tabsRef"
            :is-header-full="true"
            :is-header-center="false"
            content-container-class="2xl:mt-0 2xl:px-0"
            header-class="2xl:hidden"
            header-key="title"
            :tabs="section.meta.tabs"
          >
            <template #1="{ tab }" }>
              <div
                class="grid grid-cols-3 md:gap-2.5 2xl:flex 2xl:flex-col 2xl:divide-y divide-protection 2xl:gap-0"
              >
                <div
                  class="space-y-2 2xl:flex justify-between items-center"
                  v-for="(item, index) in tab.items"
                  :class="index === 0 ? '2xl:pb-10' : '2xl:py-10'"
                >
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
            <template #2="{ tab }" }>
              <div
                class="grid grid-cols-3 md:gap-2.5 2xl:flex 2xl:flex-col 2xl:divide-y divide-protection 2xl:gap-0"
              >
                <div
                  class="space-y-2 2xl:flex justify-between items-center"
                  v-for="(item, index) in tab.items"
                  :class="index === 0 ? '2xl:pb-10' : '2xl:py-10'"
                >
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
          </UITabsContainer>
        </div>
      </template>
    </div>
  </UISection>
</template>
