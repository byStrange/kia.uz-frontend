<script setup lang="ts">
defineProps<{ section: any }>()

const { gsap } = useGsap()

const sectionRef = useTemplateRef('section')

const pageAnimations = {
  default() {
    if (!sectionRef.value) return;

    const $el = sectionRef.value.$el;
    console.log($el.querySelector('.organism-modelui-triple_title'))

    gsap.from($el.querySelector('.organism-modelui-triple_title'), {
      autoAlpha: 0,
      y: -30,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: $el,
        start: 'top 80%',
        end: '+=600',
        scrub: true,
      }
    })

    gsap.from($el.querySelector('.organism-modelui-triple_desc'), {
      filter: 'blur(20px)',
      autoAlpha: 0,
      y: -30,
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: $el,
        start: 'top 80%',
        end: '+=600',
        scrub: true,
      }
    })

    gsap.from($el.querySelector('img'), {
      filter: 'blur(40px)',
      duration: 1.1,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: $el,
        start: 'top center',
        end: '+=300',
        scrub: true,
      }
    })
  }
}

onMounted(() => {
  pageAnimations.default()
})
</script>
<template>
  <MoleculeSection ref="section" :section-title="section.title" :subtitle="section.subtitle"
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
        ]" class="!mb-0 organism-modelui-triple_title">
          {{ sectionTitle }}
        </h1>
        <p :class="{
          'mt-2 md:text-base+ md:mt-3 col-start-7 col-span-4 2xl:mt-0': true,
        }" class="text-sm text-primary organism-modelui-triple_desc">
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
        <img :src="section.images.default?.src" class="w-full" />
      </picture>
    </div>
  </MoleculeSection>
</template>
