<script setup lang="ts">
import type { UITabsContainer } from '#components'

const { headerService } = useHeaderService()

const options = ref([{ label: 'model', value: 'model' }])
const selectedOption = ref()

const { specials } = useStore()

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
              <UIDropdownInput
                v-if="tab.activeTab === 0"
                v-model:available-options="options"
                v-model:selected-option="selectedOption"
                placeholder="Выберите спецпредложение"
                class="max-w-4h 2xl:absolute top-0 right-0 hidden 2xl:flex"
              />
            </Transition>
          </template>
          <template #1>
            <div>
              <UIDropdownInput
                v-model:available-options="options"
                v-model:selected-option="selectedOption"
                placeholder="Выберите спецпредложение"
                class="max-w-4h 2xl:hidden"
              />

              <div
                class="space-y-7.5 pt-10 pb-11 md:grid md:grid-cols-2 md:space-y-0 md:gap-7.5 md:place-content-center 2xl:grid-cols-4"
              >
                <div
                  v-for="item in specials"
                  class="w-full max-w-[420px] mx-auto"
                >
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
              </div>
            </div>
          </template>
          <template #2>
            <div
              class="space-y-7.5 pt-10 pb-11 md:grid md:grid-cols-2 md:space-y-0 md:gap-7.5 md:place-content-center 2xl:grid-cols-4"
            >
              <div class="w-full max-w-[420px] mx-auto">
                <div class="mx-auto h-full bg-background">
                  <img
                    src="https://ucarecdn.com/b91b27cd-b3b8-4dd9-84df-622c45ed82b0/-/preview/313x190/"
                    class="h-[190px] w-full object-cover"
                    loading="lazy"
                  />

                  <div class="2xl:p-7.5 p-4">
                    <p class="font-semibold">
                      Количество месяцев или пробег — в зависимости от того, что
                      наступит раньше Первоначальный взнос от 25%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </UITabsContainer>
      </div>
    </div>
  </UISafeAreaView>
</template>
