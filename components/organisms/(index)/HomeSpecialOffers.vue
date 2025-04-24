<script setup lang="ts">
const { bounding } = useContainer()
const { t } = useI18n()

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

defineProps<{ offers: GroupedSpecialOfferWithoutContent }>()
</script>
<template>
  <MoleculeSection :section-title="t('index.special_offers')">
    <template #title="{ sectionTitle, sectionTitleClass }">
      <h1 class="container" :class="sectionTitleClass">
        {{ sectionTitle }}
      </h1>
    </template>

    <MoleculeTabsContainer :tabs="Object.values(offers)" header-key="categoryName" :is-content-full="true">
      <template #tab="{ tab }">
        <ElementSlideView :data="tab.items.slice(0, 8)">
          <template #slide="{ item }">
            <NuxtLinkLocale :aria-label="item.title" :to="`/special-offers/${item.slug}`">
              <div
:style="{ '--padding': `0 ${bounding.x.value}px` }"
                class="h-[408px] p-[--padding] md:w-[310px] md:px-0">
                <div class="mx-auto h-full max-w-[310px] bg-background">
                  <MoleculeImage :base-url="item.desktop_image || ''" class="h-[222px] w-full object-cover" />

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
            </NuxtLinkLocale>
          </template>
        </ElementSlideView>
      </template>

      <template #default>
        <NuxtLink
to="/special-offers"
          class="container mt-4 flex items-center gap-2.5 text-primary md:absolute md:right-[--right] md:top-0 md:mt-0 md:w-auto md:px-0"
          :style="{ '--right': bounding.x.value + 'px' }">
          <UIServiceRegistrationIcon class="md:hidden" />
          <div class="flex">
            <p class="text-base font-semibold">{{ t('index.all_offers') }}</p>
            <UITickToRight />
          </div>
        </NuxtLink>
      </template>
    </MoleculeTabsContainer>
  </MoleculeSection>
</template>
