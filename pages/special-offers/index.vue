<script setup lang="ts">
const { headerService } = useHeaderService()

const options = ref([{ label: 'model', value: 'model' }])
const selectedOption = ref()

const { specials } = useStore()
const { src } = useUploadcareSource()

onMounted(() => {
  headerService.value.isHeaderFixed = true
  headerService.value.lockHover = true
})
</script>
<template>
  <UISafeAreaView>
    <div class="container pt-7.5 2xl:pt-6">
      <UIBreadcrumb class="hidden 2xl:block" theme="dark" />
      <h1 class="text-2xl font-semibold text-primary md:text-5xl 2xl:mt-10">
        Специальные предложения
      </h1>

      <div class="mt-7.5">
        <UITabsContainer
          ref="tabsContainer"
          :tabs="['Покупка', 'Сервис']"
          header-container-class="w-fit mx-0 !px-0"
          content-container-class="!px-0 mx-0 !max-w-none !mt-10"
        >
          <template #tab-button-right="{ tab }">
            <Transition name="slide-fade">
              <div
                v-if="tab.activeTab === 0"
                class="w-4h 2xl:absolute top-0 right-0 hidden 2xl:flex"
              >
                <UIDropdownInput
                  v-model:available-options="options"
                  v-model:selected-option="selectedOption"
                  placeholder="Выберите спецпредложение"
                  class="w-full"
                />
              </div>
            </Transition>
          </template>
          <template #1>
            <div>
              <UIDropdownInput
                v-model:available-options="options"
                v-model:selected-option="selectedOption"
                placeholder="Выберите спецпредложение"
                class="max-w-4h 2xl:!hidden"
              />

              <div
                class="space-y-7.5 pt-10 pb-11 md:grid md:grid-cols-2 md:space-y-0 md:gap-7.5 md:place-content-center 2xl:grid-cols-4"
              >
                <NuxtLink
                  v-for="item in specials"
                  :key="item.title"
                  to="/special-offers/buy:benefit-up-to-94880000-sum-sorento-k8-cerato-seltos-and-bongo"
                >
                  <div class="w-full max-w-[420px] mx-auto">
                    <div class="mx-auto h-full bg-background">
                      <img
                        :src="item.thumbnail"
                        class="h-[190px] w-full object-cover"
                        loading="lazy"
                      />

                      <div class="p-4">
                        <div class="text-left h-[86px]">
                          <h2 class="text-sm font-semibold">
                            {{ item.title }}
                          </h2>
                          <p class="mt-1 text-sm text-primary">
                            {{ item.description }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </template>
          <template #2>
            <div
              class="space-y-7.5 pt-10 pb-11 md:grid md:grid-cols-2 md:space-y-0 md:gap-7.5 md:place-content-center 2xl:grid-cols-4"
            >
              <NuxtLink
                to="/special-offers/offer:months-or-mileage-whichever-comes-first-initial-payment-25"
              >
                <div class="w-full max-w-[420px] mx-auto">
                  <div class="mx-auto h-full bg-background">
                    <img
                      :src="
                        src('b91b27cd-b3b8-4dd9-84df-622c45ed82b0', {
                          preview: '313x190',
                        })
                      "
                      class="h-[190px] w-full object-cover"
                      loading="lazy"
                    />

                    <div class="2xl:p-7.5 p-4">
                      <p class="font-semibold">
                        Количество месяцев или пробег — в зависимости от того,
                        что наступит раньше Первоначальный взнос от 25%
                      </p>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </template>
        </UITabsContainer>
      </div>
    </div>
  </UISafeAreaView>
</template>
