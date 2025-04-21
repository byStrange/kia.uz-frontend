<script setup lang="ts">
import { Popover } from 'primevue'
import type { Dealer } from '~/server/api/dealers.get'

declare const ymaps3: any

type Feature = {
  id: number
  type: string
  geometry: {
    coordinates: [number, number]
  }
  properties: {
    name: string
  }
}


const tabsContainer = useTemplateRef('tabsContainer')

const runtimeConfig = useRuntimeConfig()
const { locale } = useI18n()

const { data } = await useFetch('/api/dealers', { query: locale.value });


const { bounding } = useContainer()

const handlers: Record<string, any> = {
  onFeatureClick: (dealer: Dealer) => {
    tabsContainer.value?.changeTab(0)
    handlers.onMarkerClick({
      properties: {
        name: dealer.name,
      },
      geometry: {
        coordinates: [dealer.location.lng, dealer.location.lat],
      },
      type: 'Feature',
    })
  },
}

const locationPopover = ref<InstanceType<typeof Popover> | null>(null)

const availableOptions = computed(() => {
  return (
    data.value?.cities.map((city) => ({
      label: city.name,
      value: city.name,
      location: city.location,
    })) || []
  )
})

const selectedLocation = ref(availableOptions.value[0])

const selectedLocationConfirm = ref()

const currentSelectedDealer = ref<Dealer | null>(null)

const fetchIcon = async (src: string) => {
  return await fetch(src)
    .then((res) => res.text())
    .then((text) => {
      return text
    })
}


const generateMarkerTemplate = (name: string, id: string, icon?: string) => {
  const iconWrapper = document.createElement('div')
  iconWrapper.className = 'absolute left-0 -translate-x-1/2'
  iconWrapper.innerHTML = icon || ''
  return `
        <label class="bg-white rounded-r py-2 pr-2.5 pl-5 relative flex items-center bg-opacity-90 text-primary has-[:checked]:text-forest-green" id="${id}">
            <input type="radio" name="dealer" value="${id}" class="sr-only hidden">
            ${iconWrapper.outerHTML}
            <span class="text-nowrap text-xs text-primary">${name}</span>
        </label>
    `
}

function toggleLocationPopover(event: Event) {
  locationPopover.value?.toggle(event)
}

function closeDealerPopover(dealerName: string) {
  const dealerId = 'd' + dealerName.split(' ').join('-')
  currentSelectedDealer.value = null
  const input = document.querySelector(
    `[value="${dealerId}"]`,
  ) as HTMLInputElement
  if (input) input.checked = false
}

function saveLocation(event: Event) {
  const re = availableOptions.value.find(
    (d) => (d.value = selectedLocationConfirm.value),
  )
  if (re) selectedLocation.value = re
  toggleLocationPopover(event)
}

async function initMap() {
  const icon = await fetchIcon('/icons/map-pin.svg')
  await ymaps3.ready

  ymaps3.strictMode = true

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapFeatureDataSource,
    YMapMarker,
    YMapLayer,
  } = ymaps3

  const map = new YMap(
    document.getElementById('map'),

    {
      location: {
        center: [
          selectedLocation.value.location.lat,
          selectedLocation.value.location.lng,
        ],
        zoom: 10,
      },
    },
  )

  map.addChild(new YMapDefaultSchemeLayer())
  map.addChild(new YMapFeatureDataSource({ id: 'my-source' }))
  map.addChild(
    new YMapLayer({ source: 'my-source', type: 'markers', zIndex: 1800 }),
  )

  const onMarkerClick = (feature: Feature) => {
    const dealerName = feature.properties.name;
    const result = data.value?.dealers.find((d) => d.name === dealerName);

    map.setLocation({
      center: feature.geometry.coordinates,
      zoom: 15,
    });
    if (result) {
      currentSelectedDealer.value = result;
    }
  }

  handlers.onMarkerClick = onMarkerClick

  const marker = (feature: Feature) => {
    const content = document.createElement('div')
    content.onclick = () => handlers.onMarkerClick(feature)
    const id = 'd' + feature.properties.name.split(' ').join('-')
    content.dataset.dealerId = id
    content.innerHTML = generateMarkerTemplate(
      feature.properties.name,
      id,
      icon,
    )
    return new YMapMarker(
      {
        coordinates: feature.geometry.coordinates,
        source: 'my-source',
      },
      content,
    )
  }

  const cluster = (coordinates: any, features: any[]) => {
    return new YMapMarker(
      { coordinates, source: 'my-source' },
      generateClusterCircle(features.length, coordinates),
    )
  }

  function generateClusterCircle(length: number, coordinates: any) {
    const template = `
            <div class="flex items-center justify-center text-xs rounded-full text-white bg-primary w-6 h-6">${length}</div>
        `
    const circle = document.createElement('div')

    circle.classList.add('cl-circle')
    circle.innerHTML = template

    circle.onclick = () => {
      map.setLocation({
        center: coordinates,
        zoom: 11,
      })
    }

    return circle
  }

  const points = data.value?.dealers.map((dealer) => {
    return {
      type: 'Feature',
      id: dealer.id,
      geometry: { coordinates: [dealer.location.lng, dealer.location.lat] },
      properties: { name: dealer.name },
    }
  }) || [];


  if (import.meta.client) {
    import('@yandex/ymaps3-clusterer').then(
      ({ YMapClusterer, clusterByGrid }) => {
        const clusterer = new YMapClusterer({
          method: clusterByGrid({ gridSize: 64 }),
          features: points,
          marker,
          cluster,
        })
        map.addChild(clusterer)
      },
    )
  }
}

onMounted(() => {
  nextTick(() => {
    initMap();
  })
})

definePageMeta({
  lockHover: true,
})

useSeoMeta({
  title: () => data.value?.seo.title || '',
  ogTitle: () => data.value?.seo.title || '',
  description: () => data.value?.seo.description || '',
  ogDescription: () => data.value?.seo.description || '',
  keywords: () => data.value?.seo.keywords || '',
})

useHead({
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
      <MoleculeBreadcrumb class="hidden 2xl:block" theme="dark" />
      <h1 class="text-2xl font-semibold text-primary md:text-5xl 2xl:mt-10">
        {{ $t('dealers.offical_kia_dealers') }}
      </h1>
    </div>

    <div class="mt-5 2xl:mt-10">
      <Popover ref="locationPopover" unstyled>
        <div class="bg-white p-5 border w-[--width] md:w-[378px] space-y-10 mt-4"
          :style="{ '--width': bounding.width.value + 'px' }">
          <AtomDropdownInput v-model:selected-option="selectedLocationConfirm"
            v-model:available-options="availableOptions" :float-label="true" input-id="locationDropdown"
            :placeholder="$t('dealers.your_city')" theme="light" size="large" />
          <AtomButton :label="$t('common.save')" color="primary" mode="full" class="md:w-full" @click="saveLocation" />
        </div>
      </Popover>
      <div class="container hidden">
        <button class="space-x-2.5 flex" @click="toggleLocationPopover">
          <UICompassIcon />
          <span class="text-primary text-base">{{
            selectedLocation.label
          }}</span>
        </button>
      </div>

      <MoleculeTabsContainer ref="tabsContainer" :tabs="[$t('common.map'), $t('common.list')]" class="mt-7.5"
        header-container-class="w-fit  mx-0" content-container-class="!px-0 mx-0 !max-w-none !mt-10" :cache="true">
        <template #1>
          <div class="relative">
            <Transition name="slide-fade">
              <div v-if="currentSelectedDealer"
                class="border-2 absolute z-[1000] left-[--x] top-5 border-primary p-7.5 text-primray bg-white w-[--width] 2xl:w-[320px]"
                :style="{
                  '--width': bounding.width.value + 'px',
                  '--x': bounding.x.value + 'px',
                }">
                <button class="absolute top-3 right-3 text-primary cursor-pointer"
                  @click="closeDealerPopover(currentSelectedDealer.name)">
                  <UIXIcon class="size-5" />
                </button>
                <h1 class="text-base font-semibold 2xl:text-lg">
                  {{ currentSelectedDealer.name }}
                </h1>
                <div class="space-y-2 mt-3 2xl:mt-4">
                  <p class="text-sm md:text-base+">
                    {{ currentSelectedDealer.address }}
                  </p>
                  <div class="flex gap-2 items-center">
                    <UIPhoneIcon class="size-5" />
                    <span class="text-xs md:text-base+">{{
                      currentSelectedDealer.phone
                    }}</span>
                  </div>
                  <p class="text-caption text-xs md:text-sm">
                    {{ currentSelectedDealer.workingHours }}
                  </p>
                </div>
              </div>
            </Transition>

            <div id="map" class="h-5h w-full"></div>
          </div>
        </template>
        <template #2>
          <div class="container pb-10">
            <div class="divide-y divide-protection space-y-7.5">
              <div v-for="(dealer, index) in data?.dealers" :key="dealer.name"
                class="md:grid md:grid-cols-2 2xl:grid-cols-12 md:gap-x-grid-12-gap" :class="{ 'pt-7.5': index !== 0 }">
                <h2 class="font-semibold 2xl:col-span-2 2xl:text-lg">
                  {{ dealer.name }}
                </h2>
                <div class="2xl:col-start-4 2xl:col-end-13 2xl:flex 2xl:justify-between 2xl:items-start">
                  <div
                    class="text-primary text-base mt-4 md:mt-0 space-y-2 2xl:flex 2xl:gap-x-grid-12-gap 2xl:space-y-0">
                    <div class="2xl:w-4h 2xl:space-y-2">
                      <p>{{ dealer.address }}</p>
                      <p class="text-caption">{{ dealer.workingHours }}</p>
                    </div>
                    <div class="flex gap-2">
                      <UIPhoneIcon class="size-5" />
                      <span>{{ dealer.phone }}</span>
                    </div>
                  </div>
                  <AtomButton :label="$t('dealers.show_in_maps')" color="primary" class="mt-5 md:py-2.5 2xl:mt-0"
                    mode="full" @click="handlers.onFeatureClick(dealer)" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </MoleculeTabsContainer>
    </div>
  </UISafeAreaView>
</template>
