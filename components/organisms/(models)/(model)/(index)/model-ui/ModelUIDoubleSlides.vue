<script setup lang='ts'>
import { ElementSlideView } from '#components'
const slider = useTemplateRef<InstanceType<typeof ElementSlideView>>('slidesRef')
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
          'mt-2 2xl:mt-2.5',
        ]" class="!mb-0">
          {{ sectionTitle }}
        </h1>
        <p :class="{
        }" class="text-sm text-primary mt-4 2xl:mt-7.5">
          Откройте мир инноваций вместе с Kia Carnival — бесспорным лидером в
          своем классе. Новый дизайн добавляет семейному кроссвэну изысканность,
          роскошный интерьер обеспечивает комфорт, отличная управляемость
          гарантирует уверенность на любой дороге. Новый Kia Carnival наполнит
          вашу повседневную жизнь новыми впечатлениями.
        </p>
        <div class="hidden 2xl:block border-t border-t-protection mt-7.5 pt-7.5"
          v-if="section.meta && section.meta.slides">
          <div>
            <ul class="space-y-3.5 text-base ml-3.5">
              <li v-for="(tab, _index) in section.meta.slides" :key="_index" class="cursor-pointer" :class="{
                'font-semibold list-disc': section.meta.activeSlideIndex
                  ? _index === section.meta.activeSlideIndex
                  : _index === 0,
              }" @click="() => {
                if (slider) {
                  slider.swiper?.slideTo(_index)
                  section.meta.activeSlideIndex = _index
                }
              }
                ">
                {{ tab.label }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>

    <div :class="{
      'mt-10 col-start-7 col-span-6 2xl:mt-0': true,
      ltr: section.direction === 'left',
    }">
      <ElementSlideView v-if="section.meta.slides" ref="slidesRef" :data="section.meta.slides"
        class="2xl:pointer-events-none 2xl:max-w-[620px]" paginator-class="2xl:hidden mt-4" :space-between="0"
        :breakpoints-enabled="false" :navigation="false">
        <template #slide="{ item }">
          <img class="max-h-[620px] md:w-[656px] md:h-[645px] object-cover w-full" :src="item.image" loading="lazy" />
        </template>
      </ElementSlideView>
    </div>
  </MoleculeSection>
</template>
