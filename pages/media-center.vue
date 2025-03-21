<script setup lang="ts">
const options = ref([{ label: 'model', value: 'model' }])
const selectedOption = ref()

const { src } = useUploadcareSource()
const { safe } = useSafeAccessMedia()
const { data } = await useFetch('/api/media-center')


definePageMeta({
  lockHover: true,
})
</script>
<template>
  <UISafeAreaView>
    <div class="container pt-7.5 2xl:pt-6">
      <h1 class="text-2xl font-semibold text-primary md:text-5xl 2xl:mt-10">Медиа-центр</h1>

      <div class="mt-7.5">
        <MoleculeTabsContainer
ref="tabsContainer" :tabs="['Новости', 'Видео-обзоры']"
          header-container-class="w-fit mx-0 !px-0" content-container-class="!px-0 mx-0 !max-w-none !mt-10">
          <template #tab-button-right="{ tab }">
            <Transition name="slide-fade">
              <div v-if="tab.activeTab === 1" class="w-4h 2xl:absolute top-0 right-0 hidden 2xl:flex">
                <AtomDropdownInput
v-model:available-options="options" v-model:selected-option="selectedOption"
                  placeholder="Выберите модель" class="w-full" />
              </div>
            </Transition>
          </template>
          <template #1>
            <div>
              <div
                class="space-y-7.5 pb-11 md:grid md:grid-cols-2 md:space-y-0 md:gap-7.5 md:place-content-center 2xl:grid-cols-4">
                <NuxtLink v-for="item in data?.news" :key="item.title" class="inline-block" :to="`/news/${item.slug}`">
                  <div class="w-full max-w-[420px] mx-auto">
                    <div class="mx-auto h-full bg-background">
                      <img :src="safe(item.desktop_image)" class="h-[190px] w-full object-cover" />
                      <div class="p-4">
                        <div class="text-left">
                          <h2 class="text-sm font-semibold md:text-base 2xl:pb-8">
                            {{ item.title }}
                          </h2>
                          <p class="mt-4 text-base+ text-caption md:mt-7.5">
                            {{ $d(new Date(), 'long') }}
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
            <div>
              <AtomDropdownInput
v-model:available-options="options" v-model:selected-option="selectedOption"
                placeholder="Выберите модель" class="max-w-4h 2xl:!hidden" />

              <div
                class="space-y-7.5  pt-10 pb-11 md:grid md:grid-cols-2 md:space-y-0 md:gap-7.5 md:place-content-center 2xl:grid-cols-4">
                <button v-for="item in data?.video_news" :key="item.title" class="inline-block" to="">
                  <div class="w-full max-w-[420px] mx-auto">
                    <div class="mx-auto h-full bg-background">
                      <div class="relative flex items-center justify-center">
                        <img :src="safe(item.desktop_image)" class="h-[190px] w-full object-cover" />
                        <UIPlayIcon2 class="absolute" />
                      </div>
                      <div class="p-4">
                        <div class="text-left">
                          <h2 class="text-sm font-semibold md:text-base 2xl:pb-8">
                            {{ item.title }}
                          </h2>
                          <p class="mt-4 text-base+ text-caption md:mt-7.5">
                            {{ item.created_at }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </template>
        </MoleculeTabsContainer>
      </div>
    </div>
  </UISafeAreaView>
</template>
