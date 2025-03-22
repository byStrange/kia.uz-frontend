<script setup lang="ts">
import { DataTable, Column } from 'primevue'

const { paddingTop } = useSafeArea()

const { src } = useUploadcareSource()

const exampleRow = {
  month: 'Моторное масло и масляный фильтр *1',
}

const months = ['6', '12', '18', '24', '30', '36', '42', '48'] // Month intervals
const maintenanceData = reactive([
  {
    component: 'Моторное масло и масляный фильтр',
    intervals: [3, 3, 3, 3, 3, 3, 3, 3],
  },
  {
    component: 'Охлаждающая жидкость (двигатель)',
    intervals: [null, null, null, null, null, null, null, null],
  },
  {
    component: 'Вакуумные шланги и шланги вентиляции картера',
    intervals: [null, 'П', null, 'П', null, 'П', null, null],
  },
  {
    component: 'Свечи зажигания',
    intervals: [null, 'П', null, 3, null, 'П', null, null],
  },
])

// Get the body for the column
const getIntervalBody = (index: number) => (rowData: any) =>
  rowData.intervals[index] || '-'
</script>

<template>
  <div>
    <div
      class="h-5h overflow-hidden grid place-items-end md:place-items-start md:pt-[--safe-area-padding-top] md:h-[420px] 2xl:h-6h 2xl:place-items-end relative"
      :style="{
        '--safe-area-padding-top': paddingTop,
      }">
      <div
        class="shadowman absolute w-full h-full top-0 left-0 z-10 bg-[image:--gradient] md:bg-[image:--gradient-md] 2xl:bg-[image:--gradient-2xl]"
        :style="{
          '--gradient':
            'linear-gradient(180deg, rgba(8, 20, 30, 0.4) 0%, rgba(8, 20, 30, 0.589696) 40.99%, #08141E 65.6%), linear-gradient(0deg, rgba(5, 20, 31, 0) 91.15%, rgba(5, 20, 31, 0.2) 104.95%)',
          '--gradient-md':
            'radial-gradient(78.36% 75.48% at 67.71% 48.81%, rgba(0, 0, 0, 0) 25%, #08141E 100%), linear-gradient(0deg, rgba(8, 20, 30, 0.2), rgba(8, 20, 30, 0.2))',
          '--gradient-2xl':
            'linear-gradient(180deg, #05141F -8.93%, rgba(5, 20, 31, 0) 16.55%), radial-gradient(44.38% 112.58% at 72.19% 50%, rgba(0, 0, 0, 0) 25%, #08141E 100%)',
        }"></div>
      <picture>
        <source
:srcset="src('83410439-5208-44d2-bb4e-74771941e38f', {
          crop: '1440x864/0,0',
          preview: '1440x600',
        })
          " media="(min-width: 1440px)" />
        <source
:srcset="src('83410439-5208-44d2-bb4e-74771941e38f', {
          crop: '1556x1032/0,0',
          preview: '768x420',
        })
          " media="(min-width: 768px)" />
        <img
          class="w-full absolute top-0 left-0 h-2/3 object-cover md:h-full 2xl:w-3/4 2xl:left-full 2xl:-translate-x-full 2xl:h-full 2xl:object-contin"
          :src="src('83410439-5208-44d2-bb4e-74771941e38f', {
            crop: '852x965/311,0',
            preview: '375x490',
          })
            " />
      </picture>
      <UIContainer class="py-5 w-full absolute left-[--left] top-[--safe-area-padding-top] hidden 2xl:block z-20">
        <MoleculeBreadcrumb theme="light" />
      </UIContainer>
      <div
        class="container py-10 md:flex md:flex-col md:justify-between md:items-start 2xl:h-auto 2xl:pt-10 2xl:pb-20 relative z-20 2xl:mt-8">
        <div class="text-white space-y-3 md:max-w-5h md:space-y-3 2xl:max-w-7.25h">
          <h1 class="text-2xl md:text-4xl 2xl:text-7xl">
            {{ $t('common.technical_maintenance') }}
          </h1>
          <p class="text-base md:text-base+ 2xl:text-lg">
            {{ $t('technical_maintenance.kia_driving_enjoyment_tips')}}
          </p>
        </div>
        <AtomButton
:label="$t('common.online_booking')" color="secondary" mode="full"
          class="mt-6 md:mt-7.5 2xl:mt-10" />
      </div>
    </div>

    <UIContainer class="py-16 space-y-7.5 md:bg-background md:space-y-8 2xl:py-1h 2xl:space-y-[70px]">
      <h1 class="text-2xl text-center 2xl:text-3xl">
        {{ $t('technical_maintenance.kia_service_benefits')}}
      </h1>
      <div class="section-1-content-container">
        <div class="text-primary flex gap-x-9 md:py-3 md:gap-x-6 2xl:py-0">
          <UIServiceIcon />
          <div class="text-base+ border-b border-protection pb-3 flex-1 md:pb-0 md:border-none">
            <b class="h-12.5 inline-block md:h-auto">{{ $t('technical_maintenance.kia_technical_specialists')}}</b>
          </div>
        </div>

        <div class="text-primary flex gap-x-9 md:py-3 md:gap-x-6 md:ml-2.5 2xl:ml-0 2xl:py-0">
          <UISparePartsIcon />
          <div class="text-base+ border-b border-protection pb-3 flex-1 md:pb-0 md:border-none">
            <b class="h-12.5 inline-block md:h-auto">
              {{ $t('technical_maintenance.original_parts')}}
            </b>
          </div>
        </div>

        <div class="text-primary flex gap-x-9 md:py-3 md:gap-x-6 md:mt-2.5 2xl:mt-0 2xl:py-0">
          <UIEducationalAndMedicalInfoIcon />
          <div class="text-base+ border-b border-protection pb-3 flex-1 md:pb-0 md:border-none">
            <b class="h-12.5 inline-block md:h-auto">
              {{ $t('technical_maintenance.car_diagnostics')}}
            </b>
          </div>
        </div>

        <div class="text-primary flex gap-x-9 md:py-3 md:gap-x-6 md:ml-2.5 md:mt-2.5 2xl:m-0 2xl:py-0">
          <UIGuaranteeIcon />
          <div class="text-base+ border-b border-protection pb-3 flex-1 md:pb-0 md:border-none">
            <b class="h-12.5 inline-block md:h-auto">
              {{ $t('technical_maintenance.quality_and_best_price_guarantee')}}
            </b>
          </div>
        </div>
      </div>
    </UIContainer>

    <UIContainer class="py-10 space-y-12.5 md:py-[70px] 2xl:py-1h 2xl:space-y-7.5">
      <div>
        <h1 class="text-2xl 2xl:text-3xl">
          {{ $t('technical_maintenance.scheduled_maintenance')}}
        </h1>

        <div class="mt-2.5 2xl:mt-7.5">
          <p class="text-sm md:text-base+">
            Регламентное ТО на автомобили с двигателей 3,5
          </p>
          <DataTable :value="maintenanceData" :striped-rows="true" :responsive-layout="'scroll'">
            <Column field="component" header="Component" class="min-w-3h !px-3" />
            <Column v-for="(month, index) in months" :key="index" :header="month" :field="getIntervalBody(index)" />
          </DataTable>
        </div>
      </div>

      <div>
        <p class="text-sm md:text-base+">
          Регламентное ТО на автомобили с двигателей 3,5
        </p>
        <DataTable :value="maintenanceData" :striped-rows="true" :responsive-layout="'scroll'">
          <Column field="component" header="Component" class="min-w-3h !px-3" />
          <Column v-for="(month, index) in months" :key="index" :header="month" :field="getIntervalBody(index)" />
        </DataTable>
      </div>
    </UIContainer>
  </div>
</template>
<style lang="css" scoped>
.section-1-content-container {
  @apply space-y-5 md:space-y-0 md:grid md:grid-cols-2 2xl:py-7.5 2xl:grid-cols-4 2xl:gap-x-[70px] 2xl:after:hidden 2xl:before:hidden md:gap-6 after:hidden md:after:block before:hidden md:before:block after:w-full after:content-[''] after:absolute after:h-[1px] after:bg-protection relative after:top-1/2 after:-translate-y-1/2 before:h-full before:w-[1px] before:absolute before:content-[''] before:bg-protection before:left-1/2 before:-translate-x-1/2;
}

.section-1-content-container>div:not(:last-child) {
  @apply 2xl:after:content-[''] 2xl:after:h-full 2xl:after:bg-protection 2xl:after:w-[1px] 2xl:after:absolute 2xl:after:-right-7.5 2xl:relative;
}
</style>
