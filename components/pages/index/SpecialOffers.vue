<script setup lang="ts">
const { bounding } = useContainer()

const { specials } = useStore()

const md = useCssVar('--screen-md')
const lg = useCssVar('--screen-2xl')

watch(bounding.x, () => {
  specialsSwiperBreakpoints.value = {
    [md.value ? parseInt(md.value) : 0]: {
      slidesOffsetBefore: bounding.x.value,
      slidesOffsetAfter: bounding.x.value,
      spaceBetween: 35,
    },
    [lg.value ? parseInt(lg.value) : 0]: {
      slidesOffsetBefore: bounding.x.value,
      slidesOffsetAfter: bounding.x.value,
      spaceBetween: 35,
    },
  }
})

const specialsSwiperBreakpoints = ref({})
</script>
<template>
  <UISection :sectionTitle="'Special Offers'">
    <template #title="{ sectionTitle, sectionTitleClass }">
      <h1 class="container" :class="sectionTitleClass">
        {{ sectionTitle }}
      </h1>
    </template>

    <UITabsContainer :tabs="['Покупка', 'Сервис']" :isContentFull="true">
      <template #1>
        <UISlideView :data="specials">
          <template #slide="{ item, bounding }">
            <div
              :style="{ '--padding': `0 ${bounding.x.value}px` }"
              class="h-[408px] p-[--padding] md:w-[310px] md:px-0"
            >
              <div class="mx-auto h-full max-w-[310px] bg-background">
                <img
                  :src="item.thumbnail"
                  class="h-[222px] w-full"
                  loading="lazy"
                />

                <div class="p-4">
                  <div class="text-left">
                    <h2 class="text-base font-semibold">
                      {{ item.title }}
                    </h2>
                    <p class="mt-2 text-base text-primary">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </UISlideView>
      </template>

      <template #2>
        <UISlideView :data="specials">
          <template #slide="{ item, bounding }">
            <div
              :style="{ '--padding': `0 ${bounding.x.value}px` }"
              class="h-[408px] p-[--padding] md:w-[310px] md:px-0"
            >
              <div class="mx-auto h-full max-w-[310px] bg-background">
                <img
                  :src="item.thumbnail"
                  class="h-[222px] w-full"
                  loading="lazy"
                />

                <div class="p-4">
                  <div class="text-left">
                    <h2 class="text-base font-semibold">
                      {{ item.title }}
                    </h2>
                    <p class="mt-2 text-base text-primary">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </UISlideView>
      </template>
      <template #default>
        <button
          class="container mt-4 flex items-center gap-2.5 text-primary md:absolute md:right-[--right] md:top-0 md:mt-0 md:w-auto md:px-0"
          :style="{ '--right': bounding.x.value + 'px' }"
        >
          <UIServiceRegistrationIcon class="md:hidden" />
          <div class="flex">
            <p class="text-base font-semibold">Все спецпредложения</p>
            <UITickToRight />
          </div>
        </button>
      </template>
    </UITabsContainer>
  </UISection>
</template>
