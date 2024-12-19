<script setup lang="ts">
import { type ModelGroup } from '~/types'
const modelGroups = ref<ModelGroup[]>([
  {
    label: 'Бизнес-класс и представительский класс',
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
])

definePageMeta({
  lockHover: true,
})
</script>
<template>
  <UISafeAreaView class="bg-white">
    <div class="container">
      <UIBreadcrumb class="hidden mt-6 2xl:block" theme="dark" />
      <div class="pt-10 pb-5 md:pt-15 2xl:pt-9">
        <h1 class="text-3xl font-semibold text-primary md:text-5xl">Запись на тест-драйв</h1>
      </div>

      <div class="pt-5 pb-10 md:pb-15 2xl:py-20">
        <div class="space-y-10 md:space-y-12 2xl:space-y-15">
          <div v-for="modelGroup in modelGroups" :key="modelGroup.label">
            <h1 class="text-2xl font-semibold text-primary md:text-3xl">
              {{ modelGroup.label }}
            </h1>
            <div class="flex-wrap mt-4 md:mt-8 md:flex md:gap-9 2xl:mt-10">
              <NuxtLinkLocale v-for="model in modelGroup.models" :key="model.name"
                :to="`/models/${model.name}/test-drive`">
                <div class="max-w-md md:min-w-[310px] md:max-w-[310px]">
                  <img :src="model.image" class="object-cover w-full" />
                  <div class="mt-4">
                    <h2 class="text-lg font-semibold text-primary">
                      {{ model.name }}
                    </h2>
                  </div>
                </div>
              </NuxtLinkLocale>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UISafeAreaView>
</template>
