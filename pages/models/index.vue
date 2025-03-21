<script setup lang="ts">
import { UIInfoIcon, UITickToRight } from '#components'
import type { ModelGroup } from '~/types'

const { data: pageData } = useFetch('/api/models/')
const locale = useLocalePath()
const { safe } = useSafeAccessMedia()

const availableOptions = ref([
  { label: 'Carens', value: 'car' },
  { label: 'Carnival', value: 'carnival' },
  { label: 'Ceed', value: 'ceed' },
  { label: 'Ceed GT', value: 'ceed-gt' },
  { label: 'Ceed SW', value: 'ceed-sw' },
  { label: 'Carnival', value: 'carnival' },
  { label: 'Seed', value: 'seed' },
  { label: 'Seed', value: 'seed' },
  { label: 'Seed', value: 'seed' },
  { label: 'Seed', value: 'seed' },
])

const selectedOption = ref('')

const modelGroups = ref<ModelGroup[]>([
  {
    label: 'Новинки',
    models: [
      {
        name: 'K5',
        image:
          'https://ucarecdn.com/c5d8a804-6397-4a3d-97f4-6d50b2a65699/-/preview/290x140/',
        from: '379 900 000 сум',
        benefitUpto: '90 000 000 сум',
      },
    ],
  },
  {
    label: 'Компактные',
    models: [
      {
        name: 'Cerato',
        image:
          'https://ucarecdn.com/73741da6-946d-4bd2-938d-9ca65e5ef7e3/-/preview/290x140/',
        from: '292 468 000 сум',
        benefitUpto: '64 000 000 сум',
      },
    ],
  },
  {
    label: 'Бизнес-класс и представительский класс',

    models: [
      {
        name: 'K5',
        from: '379 900 000 сум',
        image:
          'https://ucarecdn.com/5dd2c487-5ede-400d-aa6c-21fbdda82b32/-/preview/290x140/',
      },
      {
        name: 'K8',
        from: '675 157 000 сум',
        image:
          'https://ucarecdn.com/35cbc2ae-ce0b-4e09-ae2d-5135b74ffb9b/-/preview/290x140/',
      },
      {
        name: 'K9',
        from: '869 900 000 сум',
        image:
          'https://ucarecdn.com/d5bb50c5-59eb-40c5-b331-63a7819d698a/-/preview/290x140/',
      },
    ],
  },
  {
    label: 'Кроссоверы и внедорожники',
    models: [
      {
        name: 'Sonet',
        from: '199 900 000 сум',
        image:
          'https://ucarecdn.com/362bccf9-55d4-49bf-a0a4-6b06447f1949/-/preview/290x140/',
      },
      {
        name: 'Sportage',
        from: '398 905 000 сум',
        image:
          'https://ucarecdn.com/3cbde714-f28b-41d8-b9be-c61b5d81ffd8/-/preview/290x140/',
      },
      {
        name: 'Sorento',
        from: '586 055 000 сум',
        image:
          'https://ucarecdn.com/92d1e566-dc7e-46e5-811a-adfe2a3257e1/-/preview/290x140/',
      },

      {
        name: 'Seltos',
        from: '360 905 000 сум',
        image:
          'https://ucarecdn.com/f629bb37-5e93-4161-9294-03f94417879c/-/preview/290x140/',
      },
      {
        name: 'Carens',
        from: '299 900 000 сум',
        image:
          'https://ucarecdn.com/b70576f0-48b3-4cb0-8381-81a8e831aabb/-/preview/290x140/',
      },
      {
        name: 'Carnival',
        from: '543 510 000 сум',
        image:
          'https://ucarecdn.com/b94eab73-14cf-42a7-9a9b-635372b240a9/-/preview/290x140/',
      },
    ],
  },
  {
    label: 'Электрические кроссоверы',
    models: [
      {
        name: 'EV6',
        image:
          'https://ucarecdn.com/58105b81-9100-400f-b10b-bab60b4f5d16/-/preview/290x140/',
        from: '699 900 000 сум',
        electric: true,
      },
      {
        name: 'Новый Kia EV9',
        image:
          'https://ucarecdn.com/f7443b8a-d4cd-4ee0-9513-ea272f7a630e/-/preview/290x140/',
        from: '999 900 000 сум',
        electric: true,
      },
    ],
  },
  {
    label: 'Коммерческие автомобили',
    models: [
      {
        name: 'Bongo',
        image:
          'https://ucarecdn.com/6a8b3688-16bb-4b33-9905-2a3a3fa6a2f4/-/preview/290x140/',
        from: '256 405 000 сум',
      },
    ],
  },
])



definePageMeta({
  lockHover: true,
})
</script>

<template>
  <UISafeAreaView class="bg-white">
    <div class="container">
      <MoleculeBreadcrumb class="hidden mt-6 2xl:block" theme="dark" />
      <div class="pt-10 pb-5 md:pt-15 2xl:pt-9">
        <h1 class="text-3xl font-semibold text-primary md:text-5xl">
          Все модели Kia
        </h1>
        <AtomDropdownInput v-model:selected-option="selectedOption" v-model:available-options="availableOptions"
          placeholder="Выберите модель" class="mt-4 md:mt-7.5 md:max-w-sm" />
      </div>

      <div class="pt-5 pb-10 md:pb-15 2xl:py-20">
        <div class="space-y-10 md:space-y-12 2xl:space-y-15">
          <div v-for="[id, group] in Object.entries(pageData?.groupedModels || {})" :key="id">
            <h1 class="text-2xl font-semibold text-primary md:text-3xl">
              {{ group.categoryName }}
            </h1>
            <div class="flex-wrap mt-4 md:mt-8 md:flex md:gap-9 2xl:mt-10">
              <div v-for="model in group.models" :key="model.name" class="max-w-md md:min-w-[310px] md:max-w-[310px]">
                <img :src="safe(model.main_image)" class="object-cover w-full" />
                <div class="mt-4">
                  <h2 class="text-lg font-semibold text-primary">
                    {{ model.name }}
                  </h2>
                  <p class="mt-1.5 flex gap-3 text-primary">
                    {{ $t('prefixes.from', { price: formatPrice(model.starting_price) }) }}
                    <UIInfoIcon class="text-disabled" />
                  </p>
                </div>
                <button class="flex items-center mt-1 link-hover link-hover-dark" :style="{ '--l-bottom': '-2px' }"
                  @click="$router.push(locale(`/models/${model.slug}`))">
                  <span class="text-base font-semibold text-primary">Цены</span>
                  <UITickToRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UISafeAreaView>
</template>
