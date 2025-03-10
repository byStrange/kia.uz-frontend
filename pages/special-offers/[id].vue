<script setup lang="ts">
import { DataTable, Column } from 'primevue'

const { paddingTop } = useSafeArea()

const { bounding } = useContainer()

const { src } = useUploadcareSource()

const example = {
  model: 'Sorento',
  option: 'Comfort 5S (G1Q8)',
  productionYear: '2024',
  oldPrice: '616 900 000',
  specialOffer: '586 055 000',
  benefit: '30 845 000',
}

const details = Array.from({ length: 10 }, () => example)

const fields = [
  { field: 'model', label: 'Модель' },
  { field: 'option', label: 'Опция' },
  { field: 'productionYear', label: 'Год производства' },
  { field: 'oldPrice', label: 'Старая цена' },
  { field: 'specialOffer', label: 'Специальный оффер' },
  { field: 'benefit', label: 'Преимущество' },
]

const route = useRoute()

const { data: pageData, pending, error, refresh } = await useFetch(`/api/special-offers/${route.params.id}`, {

})
</script>

<template>
  <div>
    <div
      class="h-5h overflow-hidden grid place-items-end md:place-items-start md:pt-[--safe-area-padding-top] md:h-[420px] 2xl:h-6h 2xl:place-items-end relative"
      :style="{
        '--safe-area-padding-top': paddingTop,
      }">
      <div
        class="shadowman absolute w-full h-full top-0 left-0 z-10 bg-[image:--gradient] md:bg-[image:none] md:bg-primary md:bg-opacity-60"
        :style="{
          '--gradient':
            'linear-gradient(180deg, rgba(8, 20, 30, 0.4) 0%, rgba(8, 20, 30, 0.589696) 40.99%, #08141E 65.6%)',
        }"></div>
      <picture>

        <source :srcset="pageData?.desktop_image" media="(min-width: 1440px)" />
        <source :srcset="pageData?.tablet_image" media="(min-width: 768px)" />
        <img class="w-full absolute top-0 left-0 h-2/3 object-cover md:h-auto" :src="pageData?.default_image" />
      </picture>
      <div class="!px-0 py-5 absolute left-[--left] top-[--safe-area-padding-top] hidden 2xl:block z-20"
        :style="{ '--left': bounding.x.value + 'px' }">
        <MoleculeBreadcrumb theme="light" />
      </div>
      <div
        class="container py-10 md:h-[360px] md:flex md:flex-col md:justify-between md:items-start 2xl:h-auto 2xl:pt-10 2xl:pb-20 relative z-20">
        <div class="text-white space-y-4 md:max-w-5h md:space-y-3 2xl:max-w-7.25h">
          <h1 class="text-3xl md:text-4xl 2xl:text-5xl">
            {{ pageData.title }}
          </h1>
          <p class="text-base 2xl:text-lg">
            {{ pageData.subtitle }}
          </p>
        </div>
        <AtomButton label="Заказать обратный звонок" color="secondary" mode="full" class="mt-4 2xl:mt-10" />
      </div>
    </div>

    <div v-html="pageData.content"></div>
  </div>
</template>

<style>
.p-datatable th,
.p-datatable td {
  @apply text-primary;
}

.p-datatable.p-datatable-striped .p-datatable-tbody>tr.p-row-odd {
  @apply !bg-transparent;
}

.p-datatable.p-datatable-striped .p-datatable-tbody>tr.p-row-even {
  @apply bg-background;
}
</style>
