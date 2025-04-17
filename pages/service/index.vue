<script setup lang="ts">
import { AtomInput } from '#components'
import { Dialog, Popover } from 'primevue'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod';

const resolver = ref(zodResolver(serviceForm))
const { locale } = useI18n()
const { data: pageData } = useFetch('/api/service', { query: { lang: locale.value }})

const initialValues = ref({
  model: '',
  issue_year: '',
  region: '',
  fillial: '',
  work_type: '',
  time: '',
  name: '',
  phone: '',
})

const touched = ref(false)

const regionOptions = ref([
  { label: 'Andijon viloyati', value: '2' },
  { label: 'Buxoro viloyati', value: '3' },
  { label: 'Farg‘ona viloyati', value: '4' },
  { label: 'Jizzax viloyati', value: '5' },
  { label: 'Xorazm viloyati', value: '6' },
  { label: 'Namangan viloyati', value: '7' },
  { label: 'Navoiy viloyati', value: '8' },
  { label: 'Qashqadaryo viloyati', value: '9' },
  { label: 'Samarqand viloyati', value: '10' },
  { label: 'Sirdaryo viloyati', value: '11' },
  { label: 'Surxondaryo viloyati', value: '12' },
  { label: 'Toshkent viloyati', value: '13' },
  { label: 'Toshkent shahri', value: '14' }
])


const modelOptions = ref(pageData.value?.models.map((m) => ({ label: m.name, value: m.id })))

const fillialOptions = ref(
  pageData.value?.dealers.map((d) => ({ label: d.name, value: d.id }))
)

const typeOfWork = ref([
  { label: 'TO', value: '1' }
])

const isPrivacyDialogVisible = ref(false)

const { data: privacyAndTerms } = useFetch('/api/terms')

const commonAtomInputProps: Omit<
  InstanceType<typeof AtomInput>['$props'],
  'inputId' | 'label'
> = {
  inputProps: {
    fluid: true,
  },
  theme: 'light',
  size: 'large',
}

const timeChoices = ref(['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'])

const availableTimes = ref<string[]>([])

const successfullySent = ref(false)

const datePickerPopover = ref<InstanceType<typeof Popover> | null>(null)
const _datePickerValue = ref<null | CalendarDay>(null)

const debounce = useDebounceFn((data) => {
  availableTimes.value = data as string[]
}, 300)

watch(_datePickerValue, () => {
  // call api
  availableTimes.value = [];
  debounce(['13:00', '14:30', '16:00', '17:30'])
})

const formattedDate = computed(() => {
  if (_datePickerValue.value && _datePickerValue.value.date) {
    return _datePickerValue.value.date.toDateString();
  }
  return '';
})

const { bounding } = useContainer()

const vDateFormat = {
  updated(el: HTMLSpanElement) {
    const input = el.querySelector('input');
    if (!input || !input.value) return;

    input.classList.add('p-filled');
  }
}


function toggleDatePickerPopover(event: Event) {
  datePickerPopover.value?.toggle(event);
}

function closeDatePickerPopover() {
  datePickerPopover.value?.hide()
}

const onSubmit = (event: FormSubmitEvent) => {
  touched.value = true;
  console.log(event.values)
  successfullySent.value = event.valid
}

useSeoMeta({
  title: () => pageData.value?.seo.title || '',
  ogTitle: () => pageData.value?.seo.title || '',
  description: () => pageData.value?.seo.description || '',
  ogDescription: () => pageData.value?.seo.description || '',
  keywords: () => pageData.value?.seo.keywords || '',
})

definePageMeta({
  lockHover: true,
})
</script>
<template>
  <UISafeAreaView>
    <Popover
ref="datePickerPopover" unstyled class="px-[--padding-x] w-full md:max-w-[426px] md:px-0 2xl:max-w-[320px]"
      :style="{
        '--padding-x': bounding.x.value + 'px'
      }">
      <MoleculeDatePicker v-model="_datePickerValue" @day-change="closeDatePickerPopover()" />
    </Popover>
    <Dialog
v-model:visible="isPrivacyDialogVisible" modal :pt="{
      root: '!rounded-none 2xl:h-full 2xl:!max-h-[758px]',
      mask: 'px-3',
      header:
        '!px-8 !pt-8 !pb-5 border-b border-protection 2xl:w-[624px] 2xl:!mx-auto 2xl:!px-0 2xl:!pt-20',
      content: '!pt-5 2xl:!px-0 2xl:max-w-[624px] 2xl:mx-auto',
      pcCloseButton: {
        root: '!absolute top-3 right-3 md:top-4 md:right-4 2xl:top-6 2xl:right-6',
      },
    }" class="w-full md:w-[--screen-md] 2xl:w-[840px]">
      <template #closeicon>
        <UICloseIcon class="text-primary md:size-7.5" />
      </template>
      <template #header>
        <h1 class="text-2xl text-primary font-semibold">
          {{ privacyAndTerms?.terms.title }}
        </h1>
      </template>
      <div class="relative">
        <div class="space-y-5 text-primary">
          <p class="text-base">{{ privacyAndTerms?.terms.description }}</p>
        </div>
        <AtomButton
label="Понятно" color="secondary" mode="full" class="mx-auto mt-8 2xl:mt-10"
          @click="isPrivacyDialogVisible = false" />
      </div>
    </Dialog>
    <UIContainer class="pt-6">
      <MoleculeBreadcrumb class="hidden 2xl:block" theme="dark" />
    </UIContainer>
    <div>
      <h1
        class="text-primary text-2xl font-semibold py-7.5 border-b border-protection md:text-4xl container 2xl:text-7xl 2xl:py-10">
        Запись на сервис</h1>
      <!-- Form -->
      <MoleculeSection v-show="!successfullySent" class="container md:max-w-[426px] md:px-0 2xl:max-w-[618px]">
        <Form :initial-values :resolver class="space-y-12.5 2xl:space-y-16" @submit="onSubmit">

          <div class="space-y-5">
            <h2 class="font-bold text-base md:text-lg">Данные автомобиля</h2>

            <FormField class="flex w-full">
              <AtomInput
input-id="vin_number" label="VIN-номер" v-bind="commonAtomInputProps"
                class="flex-1 -translate-y-[1px]" />
              <button class="bg-primary size-12 2xl:size-15 text-white flex justify-center items-center">
                <UITickToRight class="size-5 text-white" />
              </button>
            </FormField>

            <FormField v-slot="$field" name="model">
              <AtomDropdownInput
v-model:available-options="modelOptions" input-id="model" theme="light"
                placeholder="Модельный ряд" :float-label="true" />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>

            <FormField v-slot="$field" name="issue_year">
              <AtomInput input-id="issue_year" v-bind="commonAtomInputProps" label="Год выпуска" />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>
          </div>

          <div class="space-y-5">
            <h2 class="font-bold text-base md:text-lg">Сервисный центр</h2>

            <FormField v-slot="$field" name="region">
              <AtomDropdownInput
v-model:available-options="regionOptions" input-id="region" theme="light"
                placeholder="Город" :float-label="true" />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>

            <FormField v-slot="$field" name="fillial">
              <AtomDropdownInput
v-model:available-options="fillialOptions" input-id="fillial" theme="light"
                placeholder="Филиал" :float-label="true" />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>


            <FormField v-slot="$field" name="work_type">
              <AtomDropdownInput
v-model:available-options="typeOfWork" input-id="work_type" theme="light"
                placeholder="Тип работы" :float-label="true" />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>

            <AtomInput
v-date-format input-id="due_date" v-bind="commonAtomInputProps" label="Date" :input-props="{
              onFocus: (event) => toggleDatePickerPopover(event),
              value: formattedDate,
              readonly: true
            }" />

            <FormField v-slot="$field" name="time">
              <Transition name="slide-fade" mode="in-out">
                <div v-if="formattedDate">
                  <div v-if="availableTimes.length" class="grid grid-cols-2 gap-2 md:grid-cols-3">
                    <button
v-for="choice in timeChoices" :key="choice"
                      :class="[availableTimes.includes(choice) ? 'text-primary' : 'text-caption']"
                      class="option text-center py-3 text-sm md:text-base md:py-2.5 bg-background has-[:checked]:bg-primary relative has-[:checked]:text-white transition-colors">
                      <input
v-bind="$field.props" type="radio"
                        class="opacity-0 left-0 top-0 w-full h-full absolute cursor-pointer" :value="choice"
                        :disabled="!availableTimes.includes(choice)" />
                      <span class="">{{ choice }}</span>
                    </button>
                  </div>

                  <div v-else class="flex justify-center">
                    <div class="loader w-6"></div>
                  </div>

                  <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                    {{ $field.error?.message }}
                  </p>
                </div>
              </Transition>

            </FormField>

          </div>

          <div class="space-y-5">
            <h2 class="font-bold text-base md:text-lg">Ваши контакты</h2>

            <FormField name="name">
              <AtomInput input-id="name" v-bind="commonAtomInputProps" label="Имя" />
            </FormField>

            <FormField v-slot="$field" name="phone">
              <AtomInput input-id="phone" v-bind="commonAtomInputProps" label="Телефон" />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>
          </div>


          <div class="space-y-5">
            <div class="flex gap-x-2 items-start">
              <PrimeCheckbox binary />
              <div>
                Даю согласие на обработку своих персональных данных на условиях, указанных
                <span class="underline">здесь</span>.
              </div>
            </div>
            <div class="flex gap-x-2 items-start">
              <PrimeCheckbox binary />
              <div>
                Даю согласие на получение информации рекламного характера на условиях, указанных <span
                  class="underline">здесь</span>.
              </div>
            </div>
          </div>


          <AtomButton type="submit" label="Записаться" color="primary" mode="full" class="md:w-full 2xl:w-auto" />
        </Form>
      </MoleculeSection>

      <!-- Feedback -->

      <MoleculeSection
v-show="successfullySent"
        class="space-y-8 container md:max-w-[426px] md:px-0 2xl:max-w-[618px] md:space-y-10 2xl:space-y-12">
        <div class="space-y-4 text-primary md:space-y-6 2xl:space-y-8">
          <h1 class="text-lg font-semibold md:text-2xl 2xl:text-3xl">
            Ваше обращение успешно отправлено!
          </h1>

          <p class="text-sm md:text-base">
            Спасибо за обращение! Рассмотрение займет не больше одного рабочего
            дня, но обычно мы справляемся быстрее. Как только все будет готово,
            сотрудник службы поддержки свяжется с вами по электронной почте.
          </p>
          <AtomButton mode="full" color="secondary" label="На главную" />
        </div>
        <hr />
        <div class="space-y-2 text-primary text-sm md:text-base">
          <p>Информационная линия Kia</p>
          <p>
            По всем вопросам, связанным с покупкой автомобиля, сервисным
            обслуживанием, действующими акциями и предложениями, Вы можете
            обратиться по телефону: +998 71 215-70-07
          </p>
        </div>
      </MoleculeSection>
    </div>
  </UISafeAreaView>
</template>
