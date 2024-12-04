<script setup lang="ts">
import { DataTable, Column } from 'primevue'

const { paddingTop } = useSafeArea()

const { bounding } = useContainer()

const { headerService } = useHeaderService()

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

onMounted(() => {
  headerService.value.lockHover = false
  headerService.value.isHeaderFixed = false
  headerService.value.isHover = false
})
</script>

<template>
  <div>
    <div
      class="h-5h overflow-hidden grid place-items-end md:place-items-start md:pt-[--safe-area-padding-top] md:h-[420px] 2xl:h-6h 2xl:place-items-end relative"
      :style="{
        '--safe-area-padding-top': paddingTop,
      }"
    >
      <div
        class="shadowman absolute w-full h-full top-0 left-0 z-10 bg-[image:--gradient] md:bg-[image:none] md:bg-primary md:bg-opacity-60"
        :style="{
          '--gradient':
            'linear-gradient(180deg, rgba(8, 20, 30, 0.4) 0%, rgba(8, 20, 30, 0.589696) 40.99%, #08141E 65.6%)',
        }"
      ></div>
      <picture>
        <source
          media="(min-width: 1600px)"
          :srcset="
            src('c4cf135d-9589-487e-b461-bdaa8c182d02', {
              crop: '1439x692/0,258',
              preview: '3000x3000/438b1403d5a9198cef0a0d3906f6c60c',
              format: '',
              quality: '',
            }, false)
          "
        />
        <source
          :srcset="
            src('d3ca786f-29fa-45ac-b5de-ef5da8f64557', { preview: '1440x600' })
          "
          media="(min-width: 1440px)"
        />
        <source
          :srcset="
            src('16c972c6-01c4-4aa4-a695-ec1552e6303d', { preview: '768x420' })
          "
          media="(min-width: 768px)"
        />
        <img
          class="w-full absolute top-0 left-0 h-2/3 object-cover md:h-auto"
          :src="
            src('a9a133a8-6bb2-4862-b3e4-d0053e85fa44', { preview: '375x490' })
          "
        />
      </picture>
      <div
        class="!px-0 py-5 absolute left-[--left] top-[--safe-area-padding-top] hidden 2xl:block z-20"
        :style="{ '--left': bounding.x.value + 'px' }"
      >
        <UIBreadcrumb theme="light" />
      </div>
      <div
        class="container py-10 md:h-[360px] md:flex md:flex-col md:justify-between md:items-start 2xl:h-auto 2xl:pt-10 2xl:pb-20 relative z-20"
      >
        <div
          class="text-white space-y-4 md:max-w-5h md:space-y-3 2xl:max-w-7.25h"
        >
          <h1 class="text-3xl md:text-4xl 2xl:text-5xl">
            Выгода до 94 880 000 сум: Sorento, K8, Cerato, Seltos и Bongo
          </h1>
          <p class="text-base 2xl:text-lg">
            Предложение действует до 31/10/2024
          </p>
        </div>
        <UIButton
          label="Заказать обратный звонок"
          mode="full"
          size="md+"
          class="mt-4 2xl:mt-10"
        />
      </div>
    </div>

    <UIContainer>
      <div
        class="pt-10 pb-12.5 space-y-1 2xl:max-w-[1060px] 2xl:pt-20 2xl:pb-10 2xl:mx-auto 2xl:space-y-7.5"
      >
        <h1 class="text-primary font-semibold text-lg md:text-2xl 2xl:text-5xl">
          Успей приобрести авто своей мечты на выгодных условиях
        </h1>
        <p class="text-primary text-base">
          Предложение действует до 31/10/2024 на модели
          <b>Sorento, K8, Cerato, Seltos и Bongo</b> 
        </p>
      </div>

      <div>
        <DataTable
          :value="details"
          striped-rows
          :style="{ '--container-width': bounding.width.value + 'px' }"
        >
          <Column
            v-for="field in fields"
            :key="field.field"
            :field="field.field"
            :header="field.label"
            header-class="min-w-[calc(var(--container-width)/2)] md:min-w-[calc(var(--container-width)/3)] 2xl:min-w-[213px]"
          />
        </DataTable>
      </div>

      <div class="py-10 space-y-7.5 2xl:max-w-[1060px] 2xl:mx-auto">
        <div
          class="text-primary space-y-6 2xl:flex 2xl:space-y-0 2xl:space-x-7"
        >
          <p class="text-sm md:text-base+ 2xl:max-w-7h 2xl:self-center">
            Не упустите шанс стать владельцем автомобиля Kia на выгодных
            условиях. Предложение действует на ограниченное количество
            автомобилей. Узнайте подробности прямо сейчас!
          </p>
          <div class="border border-protection"></div>
          <div class="space-y-1 2xl:self-center">
            <p class="text-sm md:text-base+">Подробная информация по номеру</p>
            <span class="text-2xl font-semibold">1333</span>
          </div>
        </div>

        <UIButton
          label="Отправить заявку"
          color="secondary"
          mode="full"
          size="md+"
        />

        <p class="text-caption text-xs+ md:text-xs++">
          Внешний вид автомобиля может отличаться от представленного в рекламе.
          Указанные опции доступны не во всех комплектациях. Наличие автомобилей
          уточняйте у дилера. Настоящее предложение не является публичной
          офертой и не обязывает Дистрибьютора к заключению сделки.
          Представленная информация носит только ознакомительный характер
        </p>
      </div>
    </UIContainer>
  </div>
</template>

<style>
.p-datatable th,
.p-datatable td {
  @apply text-primary;
}
.p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd {
  @apply !bg-transparent;
}

.p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-even {
  @apply bg-background;
}
</style>
