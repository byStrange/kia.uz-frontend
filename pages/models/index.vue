<script setup lang="tsx">
import { UIInfoIcon, UITickToRight } from '#components'

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

const selectedOption = ref(null)

const modelGroups = ref([
  {
    label: 'Новинки',
    models: [
      {
        name: 'K5',
        image:
          'https://ucarecdn.com/0523f8bf-1254-4cf0-b492-1e640ccb8ab0/-/preview/1000x479/',
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
          'https://ucarecdn.com/b0ea31c9-923e-4bd3-93e0-0c80746b371a/-/preview/1000x479/',
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
          'https://ucarecdn.com/0523f8bf-1254-4cf0-b492-1e640ccb8ab0/-/preview/1000x479/',
      },
      {
        name: 'K8',
        from: '675 157 000 сум',
        image:
          'https://ucarecdn.com/0523f8bf-1254-4cf0-b492-1e640ccb8ab0/-/preview/1000x479/',
      },
      {
        name: 'K9',
        from: '869 900 000 сум',
        image:
          'https://ucarecdn.com/0bdd809b-c71e-4eda-b2fd-ecbc18a63eb6/-/preview/1000x479/',
      },
    ],
  },
  {
    label: 'Кроссоверы и внедорожники',
    models: [
      {
        name: 'K5',
        from: '379 900 000 сум',
        image:
          'https://ucarecdn.com/0523f8bf-1254-4cf0-b492-1e640ccb8ab0/-/preview/1000x479/',
      },
      {
        name: 'K8',
        from: '675 157 000 сум',
        image:
          'https://ucarecdn.com/0523f8bf-1254-4cf0-b492-1e640ccb8ab0/-/preview/1000x479/',
      },
      {
        name: 'K9',
        from: '869 900 000 сум',
        image:
          'https://ucarecdn.com/0bdd809b-c71e-4eda-b2fd-ecbc18a63eb6/-/preview/1000x479/',
      },

      {
        name: 'K5',
        from: '379 900 000 сум',
        image:
          'https://ucarecdn.com/0523f8bf-1254-4cf0-b492-1e640ccb8ab0/-/preview/1000x479/',
      },
      {
        name: 'K8',
        from: '675 157 000 сум',
        image:
          'https://ucarecdn.com/0523f8bf-1254-4cf0-b492-1e640ccb8ab0/-/preview/1000x479/',
      },
      {
        name: 'K9',
        from: '869 900 000 сум',
        image:
          'https://ucarecdn.com/0bdd809b-c71e-4eda-b2fd-ecbc18a63eb6/-/preview/1000x479/',
      },
    ],
  },
])

const ModelCard = ({ model }: { model: any }) => {
  return (
    <div class="max-w-md md:min-w-[310px] md:max-w-[310px]">
      <img src={model.image} class="w-full object-cover" />
      <div class="mt-4">
        <h2 class="text-lg font-semibold text-primary">{model.name}</h2>
        <p class="mt-1.5 flex gap-3 text-primary">
          от {model.from}
          <UIInfoIcon class="text-disabled" />
        </p>
        {model.benefitUpto && (
          <p class="text-caption">выгода до {model.benefitUpto}</p>
        )}
      </div>
      <button class="mt-1 flex items-center">
        <span class="text-base font-semibold text-primary">Цены</span>
        <UITickToRight />
      </button>
    </div>
  )
}
</script>

<template>
  <UISafeAreaView class="bg-white">
    <div class="container">
      <UIBreadcrumb class="mt-6 hidden 2xl:block" theme="dark" />
      <div class="pb-5 pt-10 md:pt-15 2xl:pt-9">
        <h1 class="text-3xl font-semibold text-primary md:text-5xl">
          Все модели Kia
        </h1>
        <UIDropdownInput
          v-model:selectedOption="selectedOption"
          v-model:availableOptions="availableOptions"
          class="mt-4 md:mt-7.5 md:max-w-sm"
        />
      </div>

      <div class="pb-10 pt-5 md:pb-15 2xl:py-20">
        <div class="space-y-10 md:space-y-12 2xl:space-y-15">
          <div v-for="modelGroup in modelGroups" :key="modelGroup.label">
            <h1 class="text-2xl font-semibold text-primary md:text-3xl">
              {{ modelGroup.label }}
            </h1>
            <div class="mt-4 flex-wrap md:mt-8 md:flex md:gap-9 2xl:mt-10">
              <ModelCard
                @click="
                  $router.push({
                    name: 'models-id',
                  })
                "
                class="mx-auto shrink-0 md:mx-0"
                :model="model"
                v-for="model in modelGroup.models"
                :key="model.name"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </UISafeAreaView>
</template>
