<script setup lang="ts">
import type { IndexPageSpecialOffers } from '~/server/api/indexPage.get';

const { bounding } = useContainer()

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

defineProps<{ offers: IndexPageSpecialOffers[] }>()
</script>
<template>
  <MoleculeSection :section-title="'Special Offers'">
    <template #title="{ sectionTitle, sectionTitleClass }">
      <h1 class="container" :class="sectionTitleClass">
        {{ sectionTitle }}
      </h1>
    </template>

    <MoleculeTabsContainer :tabs="['Покупка', 'Сервис']" :is-content-full="true">
      <template #1>
        <ElementSlideView :data="offers.filter((offer) => offer.type == 'buy')">
          <template #slide="{ item }">
            <div :style="{ '--padding': `0 ${bounding.x.value}px` }"
              class="h-[408px] p-[--padding] md:w-[310px] md:px-0">
              <div class="mx-auto h-full max-w-[310px] bg-background">
                <img :src="item.banner_image" class="h-[222px] w-full" loading="lazy" />

                <div class="p-4">
                  <div class="text-left">
                    <h2 class="text-sm font-semibold">
                      {{ item.title }}
                    </h2>
                    <p class="mt-1 text-sm text-primary">
                      {{ item.subtitle }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </ElementSlideView>
      </template>

      <template #2>
        <ElementSlideView :data="offers.filter((offer) => offer.type == 'service')">
          <template #slide="{ item }">
            <div :style="{ '--padding': `0 ${bounding.x.value}px` }"
              class="h-[408px] p-[--padding] md:w-[310px] md:px-0">
              <div class="mx-auto h-full max-w-[310px] bg-background">
                <img :src="item.banner_image" class="h-[222px] w-full" loading="lazy" />

                <div class="p-4">
                  <div class="text-left">
                    <h2 class="text-sm font-semibold">
                      {{ item.title }}
                    </h2>
                    <p class="mt-1 text-sm text-primary">
                      {{ item.subtitle }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </ElementSlideView>
      </template>
      <template #default>
        <NuxtLink to="/special-offers"
          class="container mt-4 flex items-center gap-2.5 text-primary md:absolute md:right-[--right] md:top-0 md:mt-0 md:w-auto md:px-0"
          :style="{ '--right': bounding.x.value + 'px' }">
          <UIServiceRegistrationIcon class="md:hidden" />
          <div class="flex">
            <p class="text-base font-semibold">Все спецпредложения</p>
            <UITickToRight />
          </div>
        </NuxtLink>
      </template>
    </MoleculeTabsContainer>
  </MoleculeSection>
</template>
