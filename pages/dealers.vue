<script setup lang="ts">
import { Popover } from 'primevue'

declare const ymaps3: any

const runtimeConfig = useRuntimeConfig()

const { headerService } = useHeaderService()

const { data } = await useFetch('/api/dealers')

const { bounding } = useContainer()

const locationPopover = ref<InstanceType<typeof Popover> | null>(null)

const availableOptions = computed(() => {
  return (
    data.value?.cities.map((city) => ({
      label: city.name,
      value: city.name,
    })) || []
  )
})

const selectedLocation = ref(availableOptions.value[0].value)

const selectedLocationConfirm = ref()

function toggleLocationPopover(event: Event) {
  locationPopover.value?.toggle(event)
}

function saveLocation(event: Event) {
  selectedLocation.value = selectedLocationConfirm.value
  toggleLocationPopover(event)
}

async function initMap() {
  await ymaps3.ready

  const { YMap, YMapDefaultSchemeLayer } = ymaps3

  const map = new YMap(
    document.getElementById('map'),

    {
      location: {
        center: [25.229762, 55.289311],
        zoom: 10,
      },
    },
  )

  map.addChild(new YMapDefaultSchemeLayer())
}

onMounted(() => {
  headerService.value.isHeaderFixed = true
  headerService.value.lockHover = true
  initMap()
})

useHead({
  title: 'Официальные дилеры Kia',
  script: [
    {
      src: `https://api-maps.yandex.ru/v3/?apikey=${runtimeConfig.public.yandexMapApiKey}&lang=en_US`,
    },
  ],
})
</script>

<template>
  <UISafeAreaView>
    <div class="container pt-7.5 2xl:pt-6">
      <UIBreadcrumb class="hidden 2xl:block" theme="dark" />
      <h1 class="text-2xl font-semibold text-primary md:text-5xl">
        Официальные дилеры Kia
      </h1>
    </div>

    <div class="mt-5">
      <Popover ref="locationPopover" unstyled>
        <div
          class="bg-white p-5 border w-[--width] md:w-[378px] space-y-10 mt-4"
          :style="{ '--width': bounding.width.value + 'px' }"
        >
          <UIDropdownInput
            v-model:selected-option="selectedLocationConfirm"
            v-model:available-options="availableOptions"
            :float-label="true"
            input-id="locationDropdown"
            placeholder="Ваш город"
            theme="light"
            size="large"
          />
          <UIButton
            label="Сохранить"
            color="secondary"
            mode="full"
            class="md:w-full"
            @click="saveLocation"
          />
        </div>
      </Popover>
      <div class="container">
        <button class="space-x-2.5 flex" @click="toggleLocationPopover">
          <UICompassIcon />
          <span class="text-primary text-base">{{ selectedLocation }}</span>
        </button>
      </div>

      <UITabsContainer
        :tabs="['Карта', 'Списком']"
        class="mt-7.5"
        header-container-class="w-fit  mx-0"
        content-container-class="!px-0 mx-0 !max-w-none !mt-10"
        :cache="true"
      >
        <template #1>
          <div id="map" class="h-5h w-full"></div>
        </template>
        <template #2>
          <div class="container pb-10">
            <div class="divide-y divide-protection space-y-7.5">
              <div
                v-for="(dealer, index) in data?.dealers"
                :key="dealer.name"
                class="md:grid md:grid-cols-2 2xl:grid-cols-12 md:gap-x-grid-12-gap"
                :class="{ 'pt-7.5': index !== 0 }"
              >
                <h2 class="font-semibold 2xl:col-span-2 2xl:text-lg">
                  {{ dealer.name }}
                </h2>
                <div
                  class="2xl:col-start-4 2xl:col-end-13 2xl:flex 2xl:justify-between 2xl:items-start"
                >
                  <div
                    class="text-primary text-base mt-4 md:mt-0 space-y-2 2xl:flex 2xl:gap-x-grid-12-gap 2xl:space-y-0"
                  >
                    <div class="2xl:w-4h 2xl:space-y-2">
                      <p>{{ dealer.address }}</p>
                      <p class="text-caption">{{ dealer.workingHours }}</p>
                    </div>
                    <div class="flex gap-2">
                      <UIPhoneIcon class="size-5" />
                      <span>{{ dealer.phone }}</span>
                    </div>
                  </div>
                  <UIButton
                    label="Показать на карте"
                    color="secondary"
                    class="mt-5 md:py-2.5 2xl:mt-0"
                    mode="full"
                    size="md-"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </UITabsContainer>
    </div>
  </UISafeAreaView>
</template>
