<script setup lang="ts">
defineProps<{ section: ModelBlock }>()

const { gsap } = useGsap()
const { safe } = useSafeAccessMedia()

const sectionRef = useTemplateRef('section')


const pageAnimations = {
  default() {
    if (!sectionRef.value) return;

    const $el = sectionRef.value.$el;

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
  <UIStackAndSplitLayout :class-names="{ bottomContainer: '2xl:!mt-12'}" ref="section" :title="section.title" :subtitle="section.subtitle || ''">
    <template #left="{ sectionTitle, sectionTitleClass, subtitle, subtitleClass }">
      <div>
        <p v-if="section.subtitle" :class="subtitleClass">{{ subtitle }}</p>
        <h1
:class="[
          sectionTitleClass,

        ]" class="!mb-0 organism-modelui-triple_title">
          {{ sectionTitle }}
        </h1>
      </div>
    </template>
    <template #bottom>
      <MoleculeTabsContainer :tabs="section.slides" header-key="title" :is-content-full="true" :is-header-full="true" header-class="flex-col text-left items-start !border-none 2xl:flex-row overflow-y-hidden !justify-start 2xl:!px-0">
        <template #tab="{ tab }">
          <MoleculeImage :base-url="safe(tab.default_image)" clss="w-full object-cover" /> 
        </template>
      </MoleculeTabsContainer>
    </template>
  </UIStackAndSplitLayout>
</template>
