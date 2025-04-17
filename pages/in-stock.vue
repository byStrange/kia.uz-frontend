<script lang="ts" setup>
import { DataTable, Dialog, Column } from 'primevue'
import type { ModelFilters } from '~/components/organisms/InStockFilter.vue';
import type { ModelPricingAndDetailsPage } from '~/server/api/models/[id]/features.get';
import type { InstallmentPlan, Model } from '~/server/api/models/[id]/index.get';

const query = ref<Partial<ModelFilters>>({})
const { data: modelData, execute, pending } = await useFetch('/api/in-stock', {
  query: query
})
const { headerService } = useHeaderService()
const { safe } = useSafeAccessMedia()

const showModelFilter = ref(false)

const modelFeatures = ref<ModelPricingAndDetailsPage | null>(null)

const stepper = useTemplateRef('stepper')

const handleFilterChange = (a: Partial<ModelFilters>) => {
  query.value = a
  execute()
}

const handlers = {
  firstStepHandler(_: string, modelId: uuid) {

    const model = modelData.value?.models.find((m) => m.id == modelId)
    const step = formSteps.value.find((step) => step.step == 'model');
    if (!step || !model) return;

    const serializedModel = {
      name: model.name,
      starting_price: model.starting_price,
      main_image: model.main_image,
      id: model.id,
      engines: model.engines,
      colors: model.colors,
    }
    step.collectedValue = serializedModel

    $fetch(`/api/models/${step.collectedValue?.name}/features`).then((data) => {
      modelFeatures.value = data
    })

    stepper.value?.nextStep()
  },
  secondStepHandler(id: string) {
    const step = formSteps.value.find((step) => step.step == 'configuration')
    if (!step) return;

    step.collectedValue = id;
  },
  thirdStepHandler(id: string) {
    const step = formSteps.value.find((step) => step.step == 'colorsAndEquipments');
    if (!step) return;

    step.collectedValue = id;
  },
  fourthStepHandler(id: string) {
    const step = formSteps.value.find((step) => step.step === 'payment');

    if (!step) return;

    selectPaymentOption(id)
    step.collectedValue = id;
  },
  selectInstallmentPlanHandler(id: string) {
    const step = formSteps.value.find((step) => step.step === 'payment');
    if (!step) return

    step.collectedValue = id;
  },
}

const validators = {
  stepperValidateBack(step: FormStep) {
    if (showInstallmentDetails.value && step.step == 'payment') {
      showInstallmentDetails.value = false
      return false
    }

    if (step.step == 'result') {
      const step = formSteps.value.find((s) => s.step === 'payment')
      if (step) step.collectedValue = 'installment'
    }

    return true
  },
  stepperValidate(step: FormStep, fromTemplate?: boolean) {
    if (!step.collectedValue) return false;

    if (step.step === 'payment') {
      if (step.collectedValue == 'installment' && !fromTemplate) {
        showInstallmentDetails.value = true
        return false
      } else {
        return true
      }
    }

    return true
  }
}


type ModelStep = { step: 'model', label: string, collectedValue: null | undefined | Partial<Model> }

type ConfigurationStep = { step: 'configuration', label: string, collectedValue: null | undefined | string }
type ColorsAndEquipmentsStep = { step: 'colorsAndEquipments', label: string, collectedValue: null | undefined | string }
type PaymentStep = { step: 'payment', label: string, collectedValue: null | undefined | string }
type ResultStep = { step: 'result', label: string, collectedValue: null | undefined | string }


export type FormStep = ModelStep | ConfigurationStep | ColorsAndEquipmentsStep | PaymentStep | ResultStep

const formSteps = ref<FormStep[]>([
  { step: 'model', label: "Выбор модели", collectedValue: null, },
  { step: 'configuration', label: "Выбор комплектации", collectedValue: null },
  { step: 'colorsAndEquipments', label: "Цвета и аксессуары", collectedValue: null },
  { step: 'payment', label: "Кредитные условия", collectedValue: null },
  { step: 'result', label: "Результаты", collectedValue: null }
])

const showConfigurationDetail = ref(false)

const selectedModel = computed(() => {
  const model = formSteps.value.find((st) => st.step === 'model')?.collectedValue
  return {
    model: { ...model, engines: null },
    configurations: model?.engines?.map((e) => e.configurations.flat()).flat(),
    modelFeatures
  }
})

const selectedConfiguration = computed(() => {
  const configurationId = formSteps.value.find((st) => st.step === 'configuration')?.collectedValue
  const configuration = selectedModel.value.configurations?.find((con) => con.id === configurationId)

  return configuration;
})

const selectedColor = computed(() => {
  const colorId = formSteps.value.find(step => step.step === 'colorsAndEquipments')?.collectedValue
  const color = selectedModel.value.model?.colors.find((color => color.id === colorId))

  return color;
})

const selectedInstallmentPlan = computed(() => {
  const planId = formSteps.value.find((step) => step.step === 'payment')?.collectedValue
  const plan = selectedConfiguration.value?.installment_options.find((p) => p.id === planId)

  return plan;
})

interface AdditionalInfo {
  amount: number;
  description: string;
}

interface PaymentOption {
  id: string;
  title: string;
  mainAmount: number;
  mainDescription: string;
  additionalInfo?: AdditionalInfo[];
}

// This would come from your API in a real implementation

const paymentOptions = computed<PaymentOption[]>(() => {
  const options = ref<PaymentOption[]>([
    {
      id: 'full-payment',
      title: 'Полная оплата',
      mainAmount: selectedConfiguration.value?.price || 0,
      mainDescription: 'Спецена',
      additionalInfo: []
    },

  ]);

  if (selectedConfiguration.value?.installment_options.length) {
    options.value.push({
      id: 'installment',
      title: 'Беспроцентная рассрочка',
      mainAmount: selectedConfiguration.value?.installment_options[0].monthly_payment || 0,
      mainDescription: 'Ежемесячный платеж',
      additionalInfo: [
        {
          amount: (selectedConfiguration.value?.price || 1) * ((selectedConfiguration.value?.installment_options[0].minimum_prepayment || 0) / 100) || 0,
          description: `Первоначальный взнос от ${selectedConfiguration.value.installment_options[0].minimum_prepayment}%`
        }
      ]
    }
    )
  }

  return options.value
})

const selectedPaymentOptionId = ref<string | null>(null);

const downPaymentPercentage = ref(70);
const downPaymentDetailedOption = ref<null | InstallmentPlan>(null);
const showDownPaymentDetailedOption = ref(false)

watch(downPaymentDetailedOption, () => {
  showDownPaymentDetailedOption.value = !!downPaymentDetailedOption.value
})

const selectPaymentOption = (id: string) => {
  selectedPaymentOptionId.value = id;
};

const showInstallmentDetails = ref(false)

watchEffect(() => {
  console.log(formSteps)
})

const submitPurchaseRequest = () => {
  nodeModuleNameResolver
}

definePageMeta({
  lockHover: true
})
</script>
<template>
  <UISafeAreaView>
    <Dialog v-model:visible="showModelFilter" modal pt:root="w-full h-full !max-h-none !rounded-none md:!max-w-[480px]"
      pt:mask="md:!justify-end">
      <template #container="{ closeCallback }">
        <div class="w-full h-full relative">
          <OrganismInStockFilter @filter-change="handleFilterChange" @close-callback="closeCallback" />
        </div>
      </template>
    </Dialog>

    <UIContainer class="pt-12 pb-6 md:pb-8 md:pt-15 2xl:space-y-10 2xl:pb-10 2xl:pt-6">
      <UIDesktopOnly>
        <MoleculeBreadcrumb theme="dark" />
      </UIDesktopOnly>
      <h1 class="text-2xl md:text-4xl 2xl:text-7xl">Авто в наличии</h1>
    </UIContainer>

    <MoleculeStepper ref="stepper" :steps="formSteps" step-label-key="label" step-key="step"
      :validate-done="validators.stepperValidate" :validate-back="validators.stepperValidateBack">

      <template #header-after="{ step }">
        <Transition name="blur-fade" mode="out-in">
          <UIContainer v-if="step.step === 'model'"
            class="py-3 border-y border-protection mt-6 md:mt-7.5 sticky bg-white top-0 transition-all duration-300 z-10 2xl:hidden"
            :class="{ '!top-[--header-height]': headerService.isHeaderFixed }">
            <button class="flex items-center gap-x-2.5" @click="showModelFilter = true">
              <UIFilterIcon />
              Фильтры
            </button>
          </UIContainer>
        </Transition>
      </template>

      <template #left-sidebar="{ step }">
        <Transition name="blur-fade" mode="out-in">
          <div v-if="step.step === 'model'" class="hidden 2xl:block">
            <OrganismInStockFilter @filter-change="handleFilterChange" />
          </div>
          <div v-else class="hidden 2xl:block">
            <div>
              <div class="text-2xl text-primary space-y-1">
                <h1>{{ selectedModel.model?.name }}</h1>
                <h1>{{ $t('prefixes.from', { price: formatPrice(selectedModel.model?.starting_price) }) }}</h1>
              </div>
              <img :src="safe(selectedModel.model?.main_image)" alt="Cerato" class="h-[188px]">
              <div class="space-y-3">
                <div v-if="selectedConfiguration" class="space-y-1">
                  <span class="text-sm text-caption">Комплектация</span>
                  <h3 class="text-sm font-semibold">{{ selectedConfiguration.engine }}</h3>
                </div>
                <div v-if="selectedColor" class="space-y-1">
                  <span class="text-sm text-caption">Цвет</span>
                  <h3 class="text-sm font-semibold">{{ selectedColor.name }}</h3>
                </div>
                <hr class="bg-protection" />
              </div>
            </div>
          </div>
        </Transition>
      </template>

      <template #step-1>
        <UIContainer class="space-y-10 py-6 2xl:pt-0 2xl:pb-16 2xl:space-y-15">
          <h1 class="text-2xl 2xl:text-3xl">Выберите модель</h1>
          <div v-if="pending">
            <div class="loader"></div>
          </div>
          <OrganismModelsGroupList v-else :models-group="modelData?.groupedModels || {}"
            group-title-class="text-lg 2xl:text-2xl" model-name-class="text-base"
            model-price-class="text-sm mt-1 flex gap-x-2 items-center" :show-price-button="false"
            @choose="handlers.firstStepHandler" />
        </UIContainer>
      </template>

      <template #step-2>
        <UIContainer class="mt-6 2xl:mt-0 2xl:pt-0 space-y-6 py-6 text-primary md:space-y-10">
          <Dialog v-model:visible="showConfigurationDetail" modal
            pt:root="w-full h-full !max-h-none !rounded-none md:!max-w-[480px]" pt:mask="md:!justify-end">
            <template #container="{ closeCallback }">
              <div class="px-8 space-y-6 py-15 overflow-auto relative">
                <h1 class="text-2xl">Характеристики {{ selectedConfiguration?.name }}</h1>
                <OrganismConfigurationFeaturesList :feature-groups="selectedConfiguration?.feature_groups || []"
                  :standard-features="selectedModel.modelFeatures.value?.standard_features || []" />

                <button class="absolute top-6 right-8" @click="closeCallback">
                  <UIXIcon class="size-5" />
                </button>
              </div>
            </template>
          </Dialog>
          <h1 class="text-2xl">Выберите комплектацию</h1>
          <div v-if="selectedModel" class="space-y-3 md:space-y-2">
            <OrganismConfigurationCard v-for="configuration in selectedModel.configurations" :key="configuration.id"
              :configuration :selected="configuration.id == selectedConfiguration?.id"
              @choose="handlers.secondStepHandler" @show-all-features="showConfigurationDetail = true" />
          </div>
        </UIContainer>
      </template>

      <template #step-3>

        <UIContainer class="mt-6 2xl:mt-0 2xl:pt-0 space-y-6 py-6 text-primary md:space-y-10">
          <h1 class="text-2xl 2xl:text-3xl">Выберите цвет</h1>
          <OrganismColorCard v-for="color in selectedModel.model?.colors" :key="color.id" :color
            :selected="color.id === selectedColor?.id" @choose="handlers.thirdStepHandler" />
        </UIContainer>
      </template>

      <template #step-4>
        <div>
          <Dialog v-model:visible="showDownPaymentDetailedOption" modal pt:mask="2xl:container"
            pt:root="w-full h-full !max-h-none !rounded-none overflow-auto 2xl:!max-h-6.5h">
            <template #container="{ closeCallback }">
              <UIContainer v-if="downPaymentDetailedOption" class="pt-15 pb-12 relative text-primary overflow-auto">
                <button class="absolute top-6 right-page-padding-2" @click="closeCallback">
                  <UIXIcon class="size-5 2xl:size-6" />
                </button>
                <div class="space-y-8 2xl:space-y-10">
                  <h1 class="text-xl font-semibold 2xl:text-3xl">График погашения</h1>
                  <div class="space-y-6">
                    <h2 class="text-lg font-semibold 2xl:text-2xl">Беспроцентная рассрочка</h2>
                    <div class="space-y-3 md:flex md:max-w-5.5h md:justify-between md:space-y-0">
                      <div class="space-y-1">
                        <h5 class="text-xs text-caption 2xl:text-sm">Срок</h5>
                        <b class="font-semibold text-sm 2xl:text-base+">{{ downPaymentDetailedOption.months }}
                          месяцев</b>
                      </div>
                      <div class="space-y-1">
                        <h5 class="text-xs text-caption 2xl:text-sm">Годовая процентная ставка</h5>
                        <b class="font-semibold text-sm 2xl:text-base+">0%</b>
                      </div>
                      <div class="space-y-1">
                        <h5 class="text-xs text-caption 2xl:text-sm">Первоначальный платеж</h5>
                        <b class="font-semibold text-sm 2xl:text-base+">
                          {{ formatPrice(downPaymentDetailedOption.prepayment_calculated) }} ({{
                            downPaymentDetailedOption.minimum_prepayment }}%)</b>
                      </div>
                    </div>

                    <DataTable :removable-sort="true" :striped-rows="true"
                      :value="generateInstallmentSchedule(downPaymentDetailedOption, selectedConfiguration?.price || 0)"
                      responsive-layout="scroll" class="text-xs">
                      <Column field="no" header="№" sortable></Column>
                      <Column field="date" header="Дата" sortable></Column>
                      <Column field="remainingAmount" header="Остаток рассрочкi" class="text-nowrap min-w-2h">
                        <template #body="{ data }">
                          {{ formatPrice(data.remainingAmount) }}
                        </template>
                      </Column>
                      <Column field="paymentAmount" header="Сумма погашения рассрочки" class="text-nowrap">
                        <template #body="{ data }">
                          {{ formatPrice(data.paymentAmount) }}
                        </template>
                      </Column>
                      <Column field="totalPaid" header="Итого к погашению" class="text-nowrap">
                        <template #body="{ data }">
                          {{ formatPrice(data.totalPaid) }}
                        </template>
                      </Column>
                    </DataTable>
                  </div>
                </div>
              </UIContainer>
            </template>
          </Dialog>
          <UIContainer v-if="showInstallmentDetails" class="text-primary 2xl:px-0 mt-6 2xl:mt-0 2xl:pt-0 py-6">
            <div class="space-y-12">
              <div class="space-y-6">
                <h1 class="text-2xl 2xl:text-3xl">Расчет рассрочки</h1>
                <p class="text-sm 2xl:hidden">Приобретайте кроссовер своей мечты на выгодных условиях беспроцентной
                  рассрочки.</p>
              </div>

              <div class="space-y-6 md:space-y-5 2xl:space-y-0 2xl:flex 2xl:flex-col-reverse 2xl:gap-10">
                <div class="space-y-6 md:space-y-5 2xl:space-y-6">
                  <h2 class="text-base md:text-lg font-semibold">Условия беспроцентной рассрочки</h2>
                  <div class="space-y-3 md:space-y-2">
                    <OrganismInstallmentPlanCard v-for="plan in selectedConfiguration?.installment_options"
                      :key="plan.id" :installment-plan="plan" :selected="selectedInstallmentPlan?.id === plan.id"
                      :is-disabled="() => {
                        if (downPaymentPercentage < plan.minimum_prepayment) {
                          if (plan.id === selectedInstallmentPlan?.id) handlers.selectInstallmentPlanHandler('');
                          return true
                        }
                        return false
                      }" @click="handlers.selectInstallmentPlanHandler(plan.id)"
                      @show-detail="downPaymentDetailedOption = plan" />
                  </div>
                </div>

                <div class="flex justify-between">
                  <OrganismPercentageSlider v-if="selectedConfiguration" class="hidden 2xl:block"
                    label="Первоначальный взнос" :total-amount="selectedConfiguration.price" :min-percentage="50"
                    :max-percentage="90" :initial-percentage="90" @update:percentage="downPaymentPercentage = $event" />
                  <div v-if="selectedInstallmentPlan" class="bg-background w-full p-6 2xl:w-4.5h">
                    <div class="space-y-3 md:space-y-2 flex-1">
                      <div class="md:flex md:justify-between space-y-1 items-center">
                        <h5 class="text-sm md:text-base 2xl:text-sm">Первоначальный платеж</h5>
                        <p class="text-base font-semibold 2xl:text-sm">
                          {{ formatPrice(selectedInstallmentPlan.prepayment_calculated) }} ({{
                            selectedInstallmentPlan.minimum_prepayment }}%)</p>
                      </div>

                      <div class="md:flex md:justify-between space-y-1 items-center">
                        <h5 class="text-sm md:text-base 2xl:text-sm">Сумма рассрочки</h5>
                        <p class="text-base font-semibold 2xl:text-sm">{{ formatPrice(selectedConfiguration?.price) }}
                        </p>
                      </div>
                      <div class="md:flex md:justify-between space-y-1 items-center">
                        <h5 class="text-sm md:text-base 2xl:text-sm">Срок рассрочки</h5>
                        <p class="text-base font-semibold 2xl:text-sm">{{ selectedInstallmentPlan.months }}</p>
                      </div>
                      <div class="md:flex md:justify-between space-y-1 items-center">
                        <h5 class="text-sm md:text-base 2xl:text-sm">Процентная ставка</h5>
                        <p class="text-base font-semibold 2xl:text-sm">0%</p>
                      </div>
                      <div class="md:flex md:justify-between space-y-1 pt-3 border-t border-t-protection items-center">
                        <h5 class="text-sm md:text-base 2xl:text-sm">Платеж в месяц</h5>
                        <p class="text-base font-semibold 2xl:text-sm">{{
                          formatPrice(selectedInstallmentPlan.monthly_payment) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UIContainer>
          <UIContainer v-else class="mt-6 2xl:mt-0 2xl:pt-0 space-y-6 py-6 text-primary md:space-y-10">

            <h1 class="text-2xl 2xl:text-3xl">Выберите способ оплаты</h1>

            <div class="space-y-4">
              <div v-for="option in paymentOptions" :key="option.id" class="cursor-pointer"
                @click="handlers.fourthStepHandler(option.id)">
                <OrganismPaymentOptionCard :option="option" :selected="selectedPaymentOptionId === option.id" />
              </div>

            </div>

            <div class="text-xs text-gray-500 mt-4">
              * Окончательная сумма зависит от выбранного тарифа. Общая сумма рассчитывается индивидуально.
            </div>

          </UIContainer>

        </div>
      </template>

      <template #step-5>
        <UIContainer class="p-4 2xl:px-0">
          <!-- Personal Offer Section -->
          <div class="w-full space-y-12 md:space-y-15 2xl:space-y-16">
            <!-- Heading -->
            <div class="space-y-6 md:spacey-10 2xl:space-y-5">
              <h1 class="text-2xl 2xl:text-3xl text-primary">Ваше персональное предложение</h1>

              <!-- Total Cost -->
              <div v-if="selectedPaymentOptionId === 'full-payment'" class="bg-background p-6">
                <div class="flex justify-between items-center">
                  <span class="text-primary text-sm">Итоговая стоимость</span>
                  <span class="text-primary font-semibold text-base">{{
                    formatPrice(selectedConfiguration?.price) }}</span>
                </div>
              </div>
              <div v-else-if="selectedInstallmentPlan" class="bg-background w-full p-6">
                <div class="flex-1 space-y-3 md:space-y-6 2xl:flex 2xl:space-y-0 2xl:gap-x-6">
                  <div class="space-y-3 md:space-y-2 2xl:flex-1">
                    <div class="md:flex md:justify-between space-y-1 items-center">
                      <h5 class="text-sm md:text-base 2xl:text-sm">Стоимость автомобиля</h5>
                      <p class="text-sm font-semibold 2xl:text-sm">
                        {{ formatPrice(selectedConfiguration?.price) }}</p>
                    </div>
                    <div class="md:flex md:justify-between space-y-1 items-center">
                      <h5 class="text-sm md:text-base 2xl:text-sm">Первоначальный платеж {{
                        selectedInstallmentPlan.minimum_prepayment }}%</h5>
                      <p class="text-sm font-semibold 2xl:text-sm">
                        {{ formatPrice(selectedInstallmentPlan.prepayment_calculated) }}</p>
                    </div>

                    <div class="md:flex md:justify-between space-y-1 items-center text-sm md:text-base">
                      <h5 class="2xl:text-sm">Сумма рассрочки</h5>
                      <p class="font-semibold 2xl:text-sm">{{ formatPrice(selectedConfiguration?.price) }}
                      </p>
                    </div>
                    <div class="md:flex md:justify-between space-y-1 items-center text-sm md:text-base">
                      <h5 class="2xl:text-sm">Срок рассрочки</h5>
                      <p class="font-semibold 2xl:text-sm">{{ selectedInstallmentPlan.months }}</p>
                    </div>
                    <div class="md:flex md:justify-between space-y-1 items-center text-sm md:text-base">
                      <h5 class="2xl:text-sm">Процентная ставка</h5>
                      <p class="font-semibold 2xl:text-sm">0%</p>
                    </div>
                  </div>
                  <div
                    class="md:flex md:justify-between space-y-1 pt-3 md:pt-6 2xl:pt-0 2xl:pl-6 2xl:border-l 2xl:border-t-0 border-t border-t-protection items-center 2xl:block">
                    <h5 class="text-sm md:text-base 2xl:text-sm">Платеж в месяц</h5>
                    <p class="text-base font-semibold md:text-lg 2xl:text-sm">{{
                      formatPrice(selectedInstallmentPlan.monthly_payment) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Save Calculation Section -->
            <div class="space-y-6 md:space-y-5">
              <h2 class="text-lg font-semibold text-primary">Сохранить расчет</h2>

              <div class="bg-background p-4 space-y-10 2xl:flex 2xl:space-y-0 2xl:justify-between">
                <div class="space-y-3 2xl:space-y-6 max-w-4.5h">
                  <p class="text-primary font-semibold text-base md:text-lg">ID расчета: J0LDMQ</p>

                  <p class="text-primary text-sm">Сохраните ссылку или код и откройте ваш расчет в любое время с любого
                    устройства. Код действует 3 месяца</p>
                </div>

                <!-- Actions -->
                <div class="flex flex-col md:flex-row 2xl:pt-0">
                  <!-- Share Link Button -->
                  <div
                    class="flex-1 flex 2xl:pr-10 border-b md:border-b-0 md:border-r border-[#d9d9d9]-200 justify-start md:justify-center">
                    <button class="py-3 text-primary flex items-center justify-center gap-2 2xl:w-[125px] md:flex-col">
                      <UIShareIcon />
                      Поделиться ссылкой
                    </button>

                  </div>

                  <!-- Download PDF Button -->
                  <div class="2xl:pl-10 flex-1 flex md:justify-center">
                    <button class=" py-3 text-primary flex items-center justify-center gap-2 2xl:w-[125px] md:flex-col">
                      <UIDocumentIcon />
                      Загрузить в PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dealer Application Section -->
            <div class="space-y-6">
              <div class="space-y-6 md:space-y-5">
                <h2 class="text-base+ font-semibold text-primary">Заявка дилеру</h2>

                <p class="text-primary text-sm">Получите персональное предложение от дилера. Позвоните по Тел. 1333 или
                  оставьте ваши контакты и мы вам перезвоним</p>
              </div>
              <form class="space-y-12 md:space-y-15">
                <div class="space-y-10">
                  <div class="2xl:max-w-4h">
                    <div>
                      <AtomInput label="Имя" theme="light" input-id="name" />
                    </div>
                    <div>
                      <AtomInput label="Телефон" theme="light" input-id="phone" />
                    </div>
                    <div>
                      <AtomInput label="Город" theme="light" input-id="city" />
                    </div>
                  </div>

                  <div class="flex items-start gap-x-2">
                    <PrimeCheckbox />
                    <label for="consent" class="text-primary text-sm">Даю согласие на обработку своих персональных
                      данных
                      на
                      условиях, указанных здесь.</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </UIContainer>
      </template>
    </MoleculeStepper>
  </UISafeAreaView>
</template>
