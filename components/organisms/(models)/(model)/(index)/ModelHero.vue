<script setup lang="ts">
const { offset } = useContainer()
const { src } = useUploadcareSource()
const { gsap } = useGsap()

const pageAnimations = {
  heroAnimations() {
    gsap.from('.model-id_model-hero-img', {
      duration: 1.5,
      scale: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.model-id_model-hero-img',
        start: 'top center',
        end: 'bottom center',
      }
    });

    gsap.from('.model-id_model-title', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.5
    });

    gsap.from('.model-id_model-tagline', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.8
    });

    gsap.from('.model-id_model-features svg', {
      duration: 0.8,
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      ease: 'back.out(1.7)',
      delay: 0.3
    });

    gsap.from('.model-id_model-features p', {
      duration: 0.8,
      y: 20,
      opacity: 0,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.3
    });


  },
}

onMounted(() => {
  pageAnimations.heroAnimations()
})
</script>
<template>
  <div class="h-screen overflow-hidden bg-primary">
    <UISafeAreaView :extra="52">
      <div data-label="Hero shadow bottom" aria-hidden="true"
        class="hero-slider-shade long absolute bottom-0 z-10 h-[428px] w-full md:h-[356px]" />

      <div data-label="Hero top" :style="{
        '--gradient-md': 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 100%)',
        '--gradient-2xl': 'linear-gradient(180deg, rgba(5, 20, 31, 0.5) 24.47%, rgba(5, 20, 31, 0) 100%)'
      }"
        class="container absolute hidden h-[190px] w-full items-start justify-end gap-6 pt-7.5 md:block md:bg-[image:--gradient-md] 2xl:bg-[image:--gradient-2xl] 2xl:pt-5">
        <MoleculeBreadcrumb class="hidden bg-transparent text-white 2xl:block" theme="light" />
        <div class="flex w-full items-start justify-end gap-6 2xl:mt-4.5">
          <AtomButton label="Скачать прайс-лист" color="secondary" mode="full" />
          <AtomButton label="Заказать звонок" color="primary" mode="full" />
        </div>
      </div>

      <picture class="h-full w-full" data-label="Main Hero image" :style="{
        '--image-2xl': `url(${src('141e96f9-a90b-41e2-947c-1b3f6b9712f6', { preview: '3000x2800' })})`,
        '--image-md': `url(${src('48b7e2b2-dcf3-40c1-912a-83bef358396c', { preview: '768x553' })})`,
        '--image': `url(${src('7697fb74-fadd-4192-8a5e-5f0491567ff6', { preview: '375x375' })})`
      }">
        <source :srcset="src('141e96f9-a90b-41e2-947c-1b3f6b9712f6', { progressive: 'yes' })"
          media="(min-width: 1024px)" />

        <source :srcset="src('48b7e2b2-dcf3-40c1-912a-83bef358396c')" media="(min-width: 768px)" />
        <img :src="src('7697fb74-fadd-4192-8a5e-5f0491567ff6')"
          class="w-full object-cover 2xl:h-full md:h-[73%] model-id_model-hero-img" />
      </picture>

      <div data-label="Hero bottom"
        class="absolute !left-0 bottom-[31px] z-10 flex w-full items-end justify-center md:!left-auto md:bottom-15 md:justify-start md:pb-0 2xl:bottom-16"
        :style="{
          left: offset.offsetLeft.value + 'px',
          padding: `0 ${offset.offsetLeft.value}px`,
        }">
        <div class="flex w-full">
          <div class="w-full md:px-0 2xl:grid 2xl:grid-cols-12 2xl:gap-10">
            <div class="space-y-2.5 text-white md:space-y-2 2xl:col-span-3 model-id_model-intro-text">
              <p class="text-sm text-white md:text-lg">Новый Kia</p>

              <h1 class="mt-1 text-2xl font-semibold md:mt-2 md:text-4xl 2xl:mt-4 2xl:text-7xl model-id_model-title">
                Carnival
              </h1>

              <p class="mt-1 text-sm md:mt-2 md:text-lg 2xl:mt-4 model-id_model-tagline">
                Для тех, у кого большие планы
              </p>
            </div>
            <div class="mt-6 space-y-4 md:hidden">
              <AtomButton label="Заказать звонок" color="secondary" mode="full" />
              <AtomButton label="Скачать прайс-лист" color="primaryDark" mode="full" />
            </div>
            <div
              class="col-span-6 mt-6 space-y-4 text-white md:mt-10 md:grid md:grid-cols-3 md:space-y-0 2xl:col-start-7 2xl:gap-10 model-id_model-features">
              <div class="flex items-center gap-2.5 md:flex-col md:items-start">
                <UIComputerIcon class="md:size-12.5" />
                <p class="text-xs text-protection">
                  12” мультимедийная система c панорамным монитором
                </p>
              </div>
              <div class="flex items-center gap-2.5 md:flex-col md:items-start">
                <UIMultimediaIcon class="md:size-12.5" />
                <p class="text-xs text-protection">
                  12” Цифровая панель приборов
                </p>
              </div>
              <div class="flex items-center gap-2.5 md:flex-col md:items-start">
                <UISalonIcon class="md:size-12.5" />
                <p class="text-xs text-protection">Атмосферная подсветка</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UISafeAreaView>
  </div>
</template>
