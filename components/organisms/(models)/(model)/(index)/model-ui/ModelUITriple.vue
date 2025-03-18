<script setup lang="ts">
defineProps<{ section: ModelBlock }>()

const { gsap } = useGsap()
const { safe } = useSafeAccessMedia()

const sectionRef = useTemplateRef('section')

console.log('print SOMeting on SSR PLS')

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
  // pageAnimations.default()
})

</script>
<template>
  <UIStackAndSplitLayout ref="section" :title="section.title" :subtitle="section.subtitle || ''">
    <template #left="{ sectionTitle, sectionTitleClass, subtitle, subtitleClass }">
      <div>
        <p v-if="section.subtitle" :class="subtitleClass">{{ subtitle }}</p>
        <h1 :class="[
          sectionTitleClass,

        ]" class="!mb-0 organism-modelui-triple_title">
          {{ sectionTitle }}
        </h1>
      </div>
    </template>
    <template #right>
      <p class="text-sm md:text-base+ text-primary organism-modelui-triple_desc">{{
        section.description
      }}</p>
    </template>
    <template #bottom>
      <picture v-if="section.default_image">
        <source v-if="section.desktop_image" :srcset="safe(section.desktop_image, 'avif')"
          media="(min-width: 1440px)" />
        <source v-if="section.desktop_image" :srcset="safe(section.desktop_image, 'webp')"
          media="(min-width: 1440px)" />
        <source v-if="section.tablet_image" :srcset="safe(section.tablet_image, 'avif')" media="(min-width: 768px)" />
        <source v-if="section.tablet_image" :srcset="safe(section.tablet_image, 'webp')" media="(min-width: 768px)" />


        <source v-if="section.default_image" :srcset="safe(section.tablet_image, 'webp')" media="(max-width: 768px)" />
        <img :src="safe(section.default_image)" class="w-full" />
      </picture>
    </template>
  </UIStackAndSplitLayout>
</template>
