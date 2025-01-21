<script setup lang='ts'>
import { ElementSlideView } from '#components'

const slider = useTemplateRef<InstanceType<typeof ElementSlideView>>('slidesRef')
const sectionRef = useTemplateRef('section')
const { gsap } = useGsap()

const isIntersected = ref(false)

/*watch(isIntersected, () => {
  if (isIntersected.value) {
    pageAnimations.default()
  }
})*/


const pageAnimations = {
  //animateOnce: true,
  //animated: false,
  default() {
    if (!sectionRef.value) return;
    // if (this.animateOnce && this.animated) return;

    const $el = sectionRef.value.$el;

    gsap.fromTo($el.querySelectorAll('.double-slides_left > *:not(div)'), {
      autoAlpha: 0,
      y: -30,
    }, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.3,
      duration: 1,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: $el,
        start: 'top 80%',
        end: '+=600',
        scrub: true,
      }
    })

    gsap.from($el.querySelectorAll('.double-slides_right__list > li'), {
      x: -30,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: $el,
        start: 'top 80%',
        end: '+=600',
        scrub: true,
      }

    })


    gsap.from($el.querySelector('img'), {
      delay: 0.1,
      scale: 1.2,
      scrollTrigger: {
        trigger: $el,
        start: 'top 80%',
        end: '+=600',
        scrub: true,
      }
    })

    // this.animated = true;
  }
}

onMounted(() => {
  pageAnimations.default()
})

const { stop } = useIntersectionObserver(sectionRef, ([entry], observerEl) => {
  isIntersected.value = entry.isIntersecting
})

onUnmounted(() => {
  stop()
})


defineProps<{ section: any }>()
</script>
<template>
  <MoleculeSection ref="section" :section-title="section.title" :subtitle="section.subtitle"
    class="2xl:grid 2xl:grid-cols-12 2xl:container 2xl:gap-x-grid-12-gap" align="left" :class="{
      '2xl:rtl bg-background': section.direction === 'left',
    }">
    <template #title="{ sectionTitle, sectionTitleClass, subtitleClass, subtitle }">
      <div class="container double-slides_left" :class="{
        '2xl:px-0 col-span-4 col-start-2': true,
        ltr: section.direction === 'left',
      }">
        <p v-if="section.subtitle" :class="subtitleClass" class="double-slides_left__subtitle">{{ subtitle }}</p>
        <h1 :class="[
          sectionTitleClass,
          'mt-2 2xl:mt-2.5',
        ]" class="!mb-0">
          {{ sectionTitle }}
        </h1>
        <p :class="{
        }" class="text-sm text-primary mt-4 2xl:mt-7.5 double-slides_left__description">
          Откройте мир инноваций вместе с Kia Carnival — бесспорным лидером в
          своем классе. Новый дизайн добавляет семейному кроссвэну изысканность,
          роскошный интерьер обеспечивает комфорт, отличная управляемость
          гарантирует уверенность на любой дороге. Новый Kia Carnival наполнит
          вашу повседневную жизнь новыми впечатлениями.
        </p>
        <div class="hidden 2xl:block border-t border-t-protection mt-7.5 pt-7.5"
          v-if="section.meta && section.meta.slides">
          <div>
            <ul class="space-y-3.5 text-base ml-3.5 double-slides_right__list">
              <li v-for="(tab, _index) in section.meta.slides" :key="_index" class="cursor-pointer" :class="{
                'font-semibold list-disc': section.meta.activeSlideIndex
                  ? _index === section.meta.activeSlideIndex
                  : _index === 0,
              }" @click="() => {
                if (slider) {
                  console.log(slider)
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
          <img class="max-h-[620px] md:w-[656px] md:h-[645px] object-cover w-full " :src="item.image" />
        </template>
      </ElementSlideView>
    </div>
  </MoleculeSection>
</template>
