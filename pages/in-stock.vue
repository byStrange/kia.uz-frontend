<script lang="ts" setup>
import { DataTable, Dialog, Column } from 'primevue'
import type { ModelFilters } from '~/components/organisms/InStockFilter.vue';
import type { PurchaseRequestData } from '~/server/api/in-stock/purchase-request.post';
import type { ModelPricingAndDetailsPage } from '~/server/api/models/[id]/features.get';
import type { InstallmentPlan, Model } from '~/server/api/models/[id]/index.get';
import { generateCode } from '~/utils';


const { t, locale } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const query = ref<Partial<ModelFilters>>({ lang: locale.value })
const { downloadFile } = useDownload()


const { data: modelData, execute, pending } = await useFetch('/api/in-stock', {
  query: query
})
const { headerService } = useHeaderService()
const { safe } = useSafeAccessMedia()
const generatedRequestCode = ref<null | string>(null)

const showModelFilter = ref(false)

const modelFeatures = ref<ModelPricingAndDetailsPage | null>(null)

const stepper = useTemplateRef('stepper')

const handleFilterChange = (a: Partial<ModelFilters>) => {
  query.value = {...a, lang: locale.value }
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

  stepChangeHandler(step: FormStep) {
    if (step.step === 'result') {
      submitPurchaseRequest()
    }
  }

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
    if (step.step == 'result' && !fromTemplate) {
      submitContactData()
    }
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
  { step: 'model', label: t("in_stock.model_selection"), collectedValue: null, },
  { step: 'configuration', label: t('in_stock.configuration_selection'), collectedValue: null },
  { step: 'colorsAndEquipments', label: t('in_stock.colors_and_accessories'), collectedValue: null },
  { step: 'payment', label: t('in_stock.credit_terms'), collectedValue: null },
  { step: 'result', label: t('in_stock.results'), collectedValue: null }
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
  const color = selectedModel.value.model?.colors?.find((color => color.id === colorId))

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
      title: t('in_stock.full_payment'),
      mainAmount: selectedConfiguration.value?.price || 0,
      mainDescription: t('in_stock.special_price'),
      additionalInfo: []
    },

  ]);

  if (selectedConfiguration.value?.installment_options.length) {
    options.value.push({
      id: 'installment',
      title: t('in_stock.interest_free_installment'),
      mainAmount: selectedConfiguration.value?.installment_options[0].monthly_payment || 0,
      mainDescription: t('in_stock.monthly_payment'),
      additionalInfo: [
        {
          amount: (selectedConfiguration.value?.price || 1) * ((selectedConfiguration.value?.installment_options[0].minimum_prepayment || 0) / 100) || 0,
          description: t(`in_stock.initial_payment_from_percent`, { price: selectedConfiguration.value.installment_options[0].minimum_prepayment })
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
  if (!selectedColor.value || !selectedConfiguration.value || !selectedModel.value.model.id) return;
  const code = generateCode()


  const data: PurchaseRequestData = {
    code,
    installment_plan: selectedInstallmentPlan.value?.id,
    color: selectedColor.value.id,
    configuration: selectedConfiguration.value.id,
    model: selectedModel.value.model.id,
    payment_type: ''
  }
  if (data.installment_plan) {
    data.payment_type = 'installment'
  } else {
    data.payment_type = 'full-payment'
  }

  $fetch('/api/in-stock/purchase-request', { method: 'post', body: JSON.stringify(data) }).then(() => {
    generatedRequestCode.value = code
  }).catch(() => {
    alert(t('in_stock.purchase_request_error'))
  })

}

const cleanUp = () => {
  formSteps.value.forEach((step) => {
    step.collectedValue = ''
  })

  userData.name = '';
  userData.phoneNumber = '';
  userData.city = '';
  userData.agree = false;
  userData.errors = {}
  generatedRequestCode.value = null
  selectedPaymentOptionId.value = null
}

const submitContactData = () => {
  if (!userData.agree) {
    userData.errors.agree = t('in_stock.form_must_agree_error')
  }

  if (!userData.name) {
    userData.errors.name = t('common.field_required')
  }

  if (!userData.phoneNumber) {
    userData.errors.phoneNumber = t('common.field_required')
  }

  if (!userData.city) {
    userData.errors.city = t('common.field_required')
  }

  if (Object.keys(userData.errors).length) return;

  $fetch('/api/in-stock/purchase-request-contact', {
    method: 'post',
    body: JSON.stringify({ name: userData.name, phone_number: userData.phoneNumber, city: userData.city, purchase_request: generatedRequestCode.value })
  }).then(() => {
    alert(t('in_stock.contact_success'))
    cleanUp()
    router.push(localePath('/'))
  }).catch(() => {
    alert(t('in_stock.contact_error'))
  })
}


type UserData = {
  name: string
  phoneNumber: string
  city: string
  agree: boolean
  errors: { [K in keyof Omit<UserData, 'errors'>]?: string }
}

const userData = reactive<UserData>({
  name: '',
  phoneNumber: '',
  city: '',
  agree: false,
  errors: {}
})

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
      <h1 class="text-2xl md:text-4xl 2xl:text-7xl">{{ $t('in_stock.car_in_stock') }}</h1>
    </UIContainer>

    <MoleculeStepper ref="stepper" :steps="formSteps" step-label-key="label" step-key="step"
      :validate-done="validators.stepperValidate" :validate-back="validators.stepperValidateBack"
      @step-change="handlers.stepChangeHandler">

      <template #header-after="{ step }">
        <Transition name="blur-fade" mode="out-in">
          <UIContainer v-if="step.step === 'model'"
            class="py-3 border-y border-protection mt-6 md:mt-7.5 sticky bg-white top-0 transition-all duration-300 z-10 2xl:hidden"
            :class="{ '!top-[--header-height]': headerService.isHeaderFixed }">
            <button class="flex items-center gap-x-2.5" @click="showModelFilter = true">
              <UIFilterIcon />
              {{ $t('common.filters') }}
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
              <img :src="safe(selectedModel.model?.main_image)" :alt="selectedModel.model.name" class="h-[188px]">
              <div class="space-y-3">
                <div v-if="selectedConfiguration" class="space-y-1">
                  <span class="text-sm text-caption">{{ $t('common.configuration') }}</span>
                  <h3 class="text-sm font-semibold">{{ selectedConfiguration.engine }}</h3>
                </div>
                <div v-if="selectedColor" class="space-y-1">
                  <span class="text-sm text-caption">{{ $t('common.color') }}</span>
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
          <h1 class="text-2xl 2xl:text-3xl">{{ $t('common.choose_model') }}</h1>
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
                <h1 class="text-2xl">{{ $t('common.configuration_properties', {
                  configuration:
                    selectedConfiguration?.name
                }) }} </h1>
                <OrganismConfigurationFeaturesList :feature-groups="selectedConfiguration?.feature_groups || []"
                  :standard-features="selectedModel.modelFeatures.value?.standard_features || []" />

                <button class="absolute top-6 right-8" @click="closeCallback">
                  <UIXIcon class="size-5" />
                </button>
              </div>
            </template>
          </Dialog>
          <h1 class="text-2xl">{{ $t('common.choose_configuration') }}</h1>
          <div v-if="selectedModel" class="space-y-3 md:space-y-2">
            <OrganismConfigurationCard v-for="configuration in selectedModel.configurations" :key="configuration.id"
              :configuration :selected="configuration.id == selectedConfiguration?.id"
              @choose="handlers.secondStepHandler" @show-all-features="showConfigurationDetail = true" />
          </div>
        </UIContainer>
      </template>

      <template #step-3>

        <UIContainer class="mt-6 2xl:mt-0 2xl:pt-0 space-y-6 py-6 text-primary md:space-y-10">
          <h1 class="text-2xl 2xl:text-3xl">{{ $t('common.choose_color') }}</h1>
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
                  <h1 class="text-xl font-semibold 2xl:text-3xl">{{ $t('common.repayment_schedule') }}</h1>
                  <div class="space-y-6">
                    <h2 class="text-lg font-semibold 2xl:text-2xl">{{ $t('common.interest_free_installment') }}</h2>
                    <div class="space-y-3 md:flex md:max-w-5.5h md:justify-between md:space-y-0">
                      <div class="space-y-1">
                        <h5 class="text-xs text-caption 2xl:text-sm">{{ $t('common.date') }}</h5>
                        <b class="font-semibold text-sm 2xl:text-base+">
                          {{ $t('in_stock.months', { months: downPaymentDetailedOption.months }) }}</b>
                      </div>
                      <div class="space-y-1">
                        <h5 class="text-xs text-caption 2xl:text-sm">{{ $t('in_stock.initial_payment') }}</h5>
                        <b class="font-semibold text-sm 2xl:text-base+">
                          {{ formatPrice(downPaymentDetailedOption.prepayment_calculated) }} ({{
                            downPaymentDetailedOption.minimum_prepayment }}%)</b>
                      </div>
                    </div>

                    <DataTable :removable-sort="true" :striped-rows="true"
                      :value="generateInstallmentSchedule(downPaymentDetailedOption, selectedConfiguration?.price || 0)"
                      responsive-layout="scroll" class="text-xs">
                      <Column field="no" :header="$t('in_stock.no')" sortable></Column>
                      <Column field="date" :header="$t('common.date')" sortable></Column>
                      <Column field="remainingAmount" :header="$t('in_stock.remaining_installment')"
                        class="text-nowrap min-w-2h">
                        <template #body="{ data }">
                          {{ formatPrice(data.remainingAmount) }}
                        </template>
                      </Column>
                      <Column field="paymentAmount" :header="$t('in_stock.installment_repayment_amount')"
                        class="text-nowrap">
                        <template #body="{ data }">
                          {{ formatPrice(data.paymentAmount) }}
                        </template>
                      </Column>
                      <Column field="totalPaid" :header="$t('in_stock.total_repayment')" class="text-nowrap">
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
                <h1 class="text-2xl 2xl:text-3xl">{{ $t('in_stock.installment_calculation') }}</h1>
                <p class="text-sm 2xl:hidden">
                  {{ $t('in_stock.purchase_your_dream_crossover_on_favorable_interest_free_installment_terms') }}</p>
              </div>

              <div class="space-y-6 md:space-y-5 2xl:space-y-0 2xl:flex 2xl:flex-col-reverse 2xl:gap-10">
                <div class="space-y-6 md:space-y-5 2xl:space-y-6">
                  <h2 class="text-base md:text-lg font-semibold">{{ $t('in_stock.interest_free_installment_terms') }}
                  </h2>
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
                    :label="$t('in_stock.down_payment')" :total-amount="selectedConfiguration.price" :min-percentage="50"
                    :max-percentage="90" :initial-percentage="90" @update:percentage="downPaymentPercentage = $event" />
                  <div v-if="selectedInstallmentPlan" class="bg-background w-full p-6 2xl:w-4.5h">
                    <div class="space-y-3 md:space-y-2 flex-1">
                      <div class="md:flex md:justify-between space-y-1 items-center">
                        <h5 class="text-sm md:text-base 2xl:text-sm">{{ $t('in_stock.down_payment') }}</h5>
                        <p class="text-base font-semibold 2xl:text-sm">
                          {{ formatPrice(selectedInstallmentPlan.prepayment_calculated) }} ({{
                            selectedInstallmentPlan.minimum_prepayment }}%)</p>
                      </div>

                      <div class="md:flex md:justify-between space-y-1 items-center">
                        <h5 class="text-sm md:text-base 2xl:text-sm">{{ $t('in_stock.installment_amount') }}</h5>
                        <p class="text-base font-semibold 2xl:text-sm">{{ formatPrice(selectedConfiguration?.price) }}
                        </p>
                      </div>
                      <div class="md:flex md:justify-between space-y-1 items-center">
                        <h5 class="text-sm md:text-base 2xl:text-sm">{{ $t('in_stock.installment_term') }}</h5>
                        <p class="text-base font-semibold 2xl:text-sm">{{ selectedInstallmentPlan.months }}</p>
                      </div>
                      <div class="md:flex md:justify-between space-y-1 items-center">
                        <h5 class="text-sm md:text-base 2xl:text-sm">{{ $t('in_stock.interest_rate') }}</h5>
                        <p class="text-base font-semibold 2xl:text-sm">0%</p>
                      </div>
                      <div class="md:flex md:justify-between space-y-1 pt-3 border-t border-t-protection items-center">
                        <h5 class="text-sm md:text-base 2xl:text-sm">{{ $t('in_stock.monthly_installment') }}</h5>
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

            <h1 class="text-2xl 2xl:text-3xl">{{ $t('in_stock.select_payment_method') }}</h1>

            <div class="space-y-4">
              <div v-for="option in paymentOptions" :key="option.id" class="cursor-pointer"
                @click="handlers.fourthStepHandler(option.id)">
                <OrganismPaymentOptionCard :option="option" :selected="selectedPaymentOptionId === option.id" />
              </div>

            </div>

            <div class="text-xs text-gray-500 mt-4">
              {{ $t('in_stock.final_amount_depends_on_tariff_total_calculated_individually') }}</div>

          </UIContainer>

        </div>
      </template>

      <template #step-5>
        <UIContainer class="p-4 2xl:px-0">
          <!-- Personal Offer Section -->
          <div class="w-full space-y-12 md:space-y-15 2xl:space-y-16">
            <!-- Heading -->
            <div class="space-y-6 md:spacey-10 2xl:space-y-5">
              <h1 class="text-2xl 2xl:text-3xl text-primary">{{ $t('in_stock.your_personal_offer') }}</h1>

              <!-- Total Cost -->
              <div v-if="selectedPaymentOptionId === 'full-payment'" class="bg-background p-6">
                <div class="flex justify-between items-center">
                  <span class="text-primary text-sm">{{ $t('in_stock.total_cost') }}</span>
                  <span class="text-primary font-semibold text-base">{{
                    formatPrice(selectedConfiguration?.price) }}</span>
                </div>
              </div>
              <div v-else-if="selectedInstallmentPlan" class="bg-background w-full p-6">
                <div class="flex-1 space-y-3 md:space-y-6 2xl:flex 2xl:space-y-0 2xl:gap-x-6">
                  <div class="space-y-3 md:space-y-2 2xl:flex-1">
                    <div class="md:flex md:justify-between space-y-1 items-center">
                      <h5 class="text-sm md:text-base 2xl:text-sm">{{ $t('in_stock.car_price') }}</h5>
                      <p class="text-sm font-semibold 2xl:text-sm">
                        {{ formatPrice(selectedConfiguration?.price) }}</p>
                    </div>
                    <div class="md:flex md:justify-between space-y-1 items-center">
                      <h5 class="text-sm md:text-base 2xl:text-sm">{{ $t(`in_stock.initial_payment_from_percent`, {
                        price: selectedConfiguration?.minimum_prepayment })}}</h5>
                      <p class="text-sm font-semibold 2xl:text-sm">
                        {{ formatPrice(selectedInstallmentPlan.prepayment_calculated) }}</p>
                    </div>

                    <div class="md:flex md:justify-between space-y-1 items-center text-sm md:text-base">
                      <h5 class="2xl:text-sm">{{ $t("in_stock.installment_amount") }}</h5>
                      <p class="font-semibold 2xl:text-sm">{{ formatPrice(selectedConfiguration?.price) }}
                      </p>
                    </div>
                    <div class="md:flex md:justify-between space-y-1 items-center text-sm md:text-base">
                      <h5 class="2xl:text-sm">{{ $t('in_stock.installment_term') }}</h5>
                      <p class="font-semibold 2xl:text-sm">{{ selectedInstallmentPlan.months }}</p>
                    </div>
                    <div class="md:flex md:justify-between space-y-1 items-center text-sm md:text-base">
                      <h5 class="2xl:text-sm">{{$t('in_stock.interest_rate')}}</h5>
                      <p class="font-semibold 2xl:text-sm">0%</p>
                    </div>
                  </div>
                  <div
                    class="md:flex md:justify-between space-y-1 pt-3 md:pt-6 2xl:pt-0 2xl:pl-6 2xl:border-l 2xl:border-t-0 border-t border-t-protection items-center 2xl:block">
                    <h5 class="text-sm md:text-base 2xl:text-sm">{{$t('in_stock.monthly_installment')}}</h5>
                    <p class="text-base font-semibold md:text-lg 2xl:text-sm">{{
                      formatPrice(selectedInstallmentPlan.monthly_payment) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Save Calculation Section -->
            <div class="space-y-6 md:space-y-5">
              <h2 class="text-lg font-semibold text-primary">{{ $t('in_stock.save_calculation') }}</h2>

              <div class="bg-background p-4 space-y-10 2xl:flex 2xl:space-y-0 2xl:justify-between">
                <div class="space-y-3 2xl:space-y-6 max-w-4.5h">
                  <p class="text-primary font-semibold text-base md:text-lg">{{ $t('in_stock.calculation_id', { code: generatedRequestCode }) }}</p>

                  <p class="text-primary text-sm">{{ $t('in_stock.save_calculation_info') }}</p>
                </div>

                <!-- Actions -->
                <div class="flex flex-col md:flex-row 2xl:pt-0">
                  <!-- Share Link Button -->
                  <div
                    class="flex-1 flex 2xl:pr-10 border-b md:border-b-0 md:border-r border-[#d9d9d9]-200 justify-start md:justify-center">
                      <button class="py-3 text-primary flex items-center justify-center gap-2 2xl:w-[125px] md:flex-col">
                      <UIShareIcon />
                      {{ $t('in_stock.share_link') }}
                    </button>

                  </div>

                  <!-- Download PDF Button -->
                  <div class="2xl:pl-10 flex-1 flex md:justify-center">
                    <button class=" py-3 text-primary flex items-center justify-center gap-2 2xl:w-[125px] md:flex-col"
                      @click="downloadFile(safe('/media/purchase/' + generatedRequestCode?.toLowerCase() + '.pdf'))">
                      <UIDocumentIcon />
                      {{ $t('in_stock.download_pdf') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dealer Application Section -->
            <div class="space-y-6">
              <div class="space-y-6 md:space-y-5">
                <h2 class="text-base+ font-semibold text-primary">{{ $t('in_stock.dealer_request') }}</h2>

                <p class="text-primary text-sm">{{ $t('in_stock.dealer_request_message') }}</p>
              </div>
              <form class="space-y-12 md:space-y-15">
                <div class="space-y-10">
                  <div class="2xl:max-w-4h">
                    <div>
                      <AtomInput v-model="userData.name" :label="$t('common.name')" theme="light" input-id="name" />
                    </div>
                    <div>
                      <AtomInput v-model="userData.phoneNumber" :label="$t('common.phone_number')" theme="light" input-id="phone" />
                    </div>
                    <div>
                      <AtomInput v-model="userData.city" :label="$t('common.city')" theme="light" input-id="city" />
                    </div>
                  </div>

                  <div class="flex items-start gap-x-2">
                    <PrimeCheckbox v-model="userData.agree" binary />
                    <label for="consent" class="text-primary text-sm">{{ $t('in_stock.consent_text') }}</label>
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
