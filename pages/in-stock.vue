<script lang="ts" setup>
import { Dialog } from 'primevue'
import type { ModelFilters } from '~/components/organisms/InStockFilter.vue';
import type { ModelPricingAndDetailsPage } from '~/server/api/models/[id]/features.get';
import type { Model } from '~/server/api/models/[id]/index.get';

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
    const step = formSteps.value.find((step) => step.step == 'model');
    if (!step) return;
    step.collectedValue = modelData.value?.models.find((m) => m.id == modelId)

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
  }
}


type ModelStep = { step: 'model', label: string, collectedValue: null | undefined | Model }

type ConfigurationStep = { step: 'configuration', label: string, collectedValue: null | undefined | string }
type ColorsAndEquipmentsStep = { step: 'colorsAndEquipments', label: string, collectedValue: null | undefined | string }
type PaymentStep = { step: 'payment', label: string, collectedValue: null | undefined | string }
type ResultStep = { step: 'result', label: string, collectedValue: null | undefined | string }


type FormStep = ModelStep | ConfigurationStep | ColorsAndEquipmentsStep | PaymentStep | ResultStep

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
  return { model, configurations: model?.engines.map((e) => e.configurations.flat()).flat(), modelFeatures }
})

const selectedConfiguration = computed(() => {
  const configurationId = formSteps.value.find((st) => st.step === 'configuration')?.collectedValue
  const configuration = selectedModel.value.configurations?.find((con) => con.id === configurationId)

  return configuration;
})

const selectedColor = computed(() => {
  const colorId = formSteps.value.find(step => step.step ==='colorsAndEquipments')?.collectedValue
  const color = selectedModel.value.model?.colors.find((color=> color.id === colorId))

  return color;
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

const paymentOptions = computed<PaymentOption[]>(() =>  {
  const options = ref<PaymentOption[]>([
    {
      id: 'full-payment',
      title: 'Полная оплата',
      mainAmount: selectedConfiguration.value?.price || 0,
      mainDescription: 'Спецена',
      additionalInfo: []
    },
    {
      id: 'credit',
      title: 'Покупка с льготным кредитом',
      mainAmount: selectedConfiguration.value?.credit_payment || 0,
      mainDescription: 'Ежемесячный платеж',
      additionalInfo: [
        {
          amount: selectedConfiguration.value?.minimum_prepayment || 0,
          description: 'Первоначальный взнос от 15%'
        }
      ]
    },
    {
      id: 'installment',
      title: 'Беспроцентная рассрочка',
      mainAmount: selectedConfiguration.value?.interest_free_installment_plan || 0,
      mainDescription: 'Ежемесячный платеж',
      additionalInfo: [
        {
          amount: selectedConfiguration.value?.installment_minimum_prepayment||0,
          description: 'Первоначальный взнос от 40%'
        }
      ]
    }
  ]);

  return options.value
})

const selectedPaymentOptionId = ref<string>(paymentOptions.value[0].id);

const selectPaymentOption = (id: string) => {
  selectedPaymentOptionId.value = id;
};

definePageMeta({
  lockHover: true
})
</script>
<template>
  <UISafeAreaView>
    <Dialog
v-model:visible="showModelFilter" modal pt:root="w-full h-full !max-h-none !rounded-none md:!max-w-[480px]"
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

    <MoleculeStepper ref="stepper" :steps="formSteps" step-label-key="label" step-key="step" :validate-done="(step)=> !!step.collectedValue">

      <template #header-after="{ step }">
        <Transition name="blur-fade" mode="out-in">
          <UIContainer
v-if="step.step === 'model'"
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
          <div v-else-if="step.step === 'configuration'" class="hidden 2xl:block">
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
                <div class="flex gap-x-2 text-caption">
                  <UIInfoIcon />
                  <p class="text-sm">Кредит от 14% годовых в Asakabank</p>
                </div>
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
          <OrganismModelsGroupList
v-else :models-group="modelData?.groupedModels || {}"
            group-title-class="text-lg 2xl:text-2xl" model-name-class="text-base"
            model-price-class="text-sm mt-1 flex gap-x-2 items-center" :show-price-button="false"
            @choose="handlers.firstStepHandler" />
        </UIContainer>
      </template>

      <template #step-2>
        <UIContainer class="mt-6 2xl:mt-0 2xl:pt-0 space-y-6 py-6 text-primary md:space-y-10">
          <Dialog
v-model:visible="showConfigurationDetail" modal
            pt:root="w-full h-full !max-h-none !rounded-none md:!max-w-[480px]" pt:mask="md:!justify-end">
            <template #container="{ closeCallback }">
              <div class="px-8 space-y-6 py-15 overflow-auto relative">
                <h1 class="text-2xl">Характеристики {{ selectedConfiguration?.name }}</h1>
                <OrganismConfigurationFeaturesList
:feature-groups="selectedConfiguration?.feature_groups || []"
                  :standard-features="selectedModel.modelFeatures.value?.standard_features || []" />

                <button class="absolute top-6 right-8" @click="closeCallback">
                  <UIXIcon class="size-5" />
                </button>
              </div>
            </template>
          </Dialog>
          <h1 class="text-2xl">Выберите комплектацию</h1>
          <div v-if="selectedModel" class="space-y-3 md:space-y-2">
            <OrganismConfigurationCard
v-for="configuration in selectedModel.configurations" :key="configuration.id"
              :configuration :selected="configuration.id == selectedConfiguration?.id"
              @choose="handlers.secondStepHandler" @show-all-features="showConfigurationDetail = true" />
          </div>
        </UIContainer>
      </template>

      <template #step-3>

        <UIContainer class="mt-6 2xl:mt-0 2xl:pt-0 space-y-6 py-6 text-primary md:space-y-10">
          <h1 class="text-2xl 2xl:text-3xl">Выберите цвет</h1>
          <OrganismColorCard v-for="color in selectedModel.model?.colors" :key="color.id"  :color :selected="color.id === selectedColor?.id" @choose="handlers.thirdStepHandler"/>
        </UIContainer>
      </template>

      <template #step-4>
        <UIContainer class="mt-6 2xl:mt-0 2xl:pt-0 space-y-6 py-6 text-primary md:space-y-10">

          <h1 class="text-2xl 2xl:text-3xl">Выберите способ оплаты</h1>
    
    <div class="space-y-4">
      <div 
        v-for="option in paymentOptions" 
        :key="option.id"
        class="cursor-pointer"
        @click="handlers.fourthStepHandler(option.id)"
      >
        <OrganismPaymentOptionCard 
          :option="option" 
          :selected="selectedPaymentOptionId === option.id" 
          @select="handlers.fourthStepHandler"
        />
      </div>
    </div>
    
    <div class="text-xs text-gray-500 mt-4">
      * Окончательная сумма зависит от выбранного тарифа. Общая сумма рассчитывается индивидуально.
    </div>

        </UIContainer>
      </template>
    </MoleculeStepper>
  </UISafeAreaView>
</template>
