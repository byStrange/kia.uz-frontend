<script setup lang="ts">
const { bounding } = useContainer()

const { src } = useUploadcareSource()

const extraLinksCard = [
  {
    title: 'Бренд',
    href: '#',
    image: src('8701cf69-f335-45be-b0d7-2c939d629d0f', { preview: '1000x664' }),
  },
  {
    title: 'Kia в Узбекистане',
    href: '#',
    image: src('907872e6-383c-4eee-8d95-4779a60485ca', { preview: '1000x664' }),
  },
  {
    title: 'Технологии',
    href: '#',
    image: src('b3436484-91af-4e8c-9678-d36a564a1a3f', {
      preview: '1000x664',
    }),
  },
]
</script>

<template>
  <div>
    <SectionHeroSliders />
    <SectionModels />
    <SectionSpecialOffers />
    <SectionCourses />

    <div class="container pb-12 md:pb-15">
      <div
        class="relative mx-auto h-full max-w-[420px] bg-caption md:max-w-none"
      >
        <picture>
          <source
            media="(min-width: 1024px)"
            :srcset="
              src('47fd9450-1106-44ba-b977-dfe1795a0f05', {
                preview: '1000x720',
              })
            "
          />
          <source
            :srcset="
              src('32d3bffb-f001-4406-a6c0-517ca367af7f', {
                preview: '827x999',
              })
            "
            media="(min-width: 768px)"
          />
          <img
            loading="lazy"
            :src="
              src('9ae43504-1cfc-4d2b-9137-b40a5473ffce', {
                preview: '1000x597',
              })
            "
            class="img h-[187px] w-full max-w-[640px] bg-gray-200 md:absolute md:right-0 md:h-full md:w-1/2"
          />
        </picture>
        <div class="px-4 py-8 md:w-1/2 md:px-6 2xl:px-12 2xl:py-14">
          <h2 class="text-lg font-semibold text-white md:text-2xl 2xl:text-5xl">
            Беспроцентная рассрочка на автомобили Kia
          </h2>
          <p class="mt-2 text-base text-white 2xl:mt-4 md:leading-[24px]">
            Аренда автомобилей Kia по подписке. Всё включено в единый платёж —
            выгоднее чем кредит, единый тариф, гибкость.
          </p>
          <UIButton
            color="primary"
            mode="full"
            label="Подробнее"
            class="mt-6 md:mt-14 md:leading-[24px]"
          />
        </div>
      </div>
    </div>

    <div class="pb-12 md:pb-15">
      <h2
        class="container text-lg font-semibold text-primary md:text-2xl 2xl:text-3xl"
      >
        Подробнее о Kia
      </h2>
      <div
        class="no-scrollbar p-[--padding] mt-6 snap-x space-y-9 overflow-auto 2xl:container md:flex md:gap-x-10 md:space-y-0 2xl:snap-none"
        :style="{ '--padding': `0 ${bounding.x.value}px` }"
      >
        <div
          v-for="slide in extraLinksCard"
          :key="slide.title"
          class="relative mx-auto flex h-[208px] max-w-[310px] snap-center justify-center md:mx-0 md:w-[310px] md:max-w-none md:shrink-0 2xl:h-[265px] 2xl:w-[400px] 2xl:snap-none"
        >
          <img :src="slide.image" class="h-full" loading="lazy" />
          <div class="absolute bottom-0 z-10 w-full p-4 md:px-7.5 md:py-5">
            <p class="text-base font-semibold text-white md:text-2xl">
              {{ slide.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
