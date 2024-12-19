<script setup lang="ts">
import { UIInput } from '#components'
import { Dialog, Popover } from 'primevue'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod';

const resolver = ref(zodResolver(serviceForm))

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
  { label: 'Tashkent', value: '1' }
])

const modelOptions = ref([
  { label: 'Sorento', value: '1' }
])

const fillialOptions = ref([
  { label: 'Kia Sergeli', value: '1' }
])

const typeOfWork = ref([
  { label: 'TO', value: '1' }
])

const isPrivacyDialogVisible = ref(false)

const { data: privacyAndTerms } = useFetch('/api/terms')

const commonUIInputProps: Omit<
  InstanceType<typeof UIInput>['$props'],
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
    input.value = input.value;
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
  console.log(event)
  successfullySent.value = event.valid
}

definePageMeta({
  lockHover: true,
})
</script>
<template>
  <UISafeAreaView>
    <Popover ref="datePickerPopover" unstyled class="px-[--padding-x] w-full md:max-w-[426px] md:px-0 2xl:max-w-[320px]"
      :style="{
        '--padding-x': bounding.x.value + 'px'
      }">
      <UIDatePicker v-model="_datePickerValue" @dayChange="closeDatePickerPopover()" />
    </Popover>
    <Dialog v-model:visible="isPrivacyDialogVisible" modal :pt="{
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
        <UIButton label="Понятно" color="secondary" mode="full" class="mx-auto mt-8 2xl:mt-10"
          @click="isPrivacyDialogVisible = false" />
      </div>
    </Dialog>
    <UIContainer class="pt-6">
      <UIBreadcrumb class="hidden 2xl:block" theme="dark" />
    </UIContainer>
    <div>
      <h1
        class="text-primary text-2xl font-semibold py-7.5 border-b border-protection md:text-4xl container 2xl:text-7xl 2xl:py-10">
        Запись на сервис</h1>
      <!-- Form -->
      <UISection v-show="!successfullySent" class="container md:max-w-[426px] md:px-0 2xl:max-w-[618px]">
        <Form @submit="onSubmit" :initialValues :resolver class="space-y-12.5 2xl:space-y-16">

          <div class="space-y-5">
            <h2 class="font-bold text-base md:text-lg">Данные автомобиля</h2>

            <FormField class="flex w-full">
              <UIInput inputId="vin_number" label="VIN-номер" v-bind="commonUIInputProps"
                class="flex-1 -translate-y-[1px]" />
              <button class="bg-primary size-12 2xl:size-15 text-white flex justify-center items-center">
                <UITickToRight class="size-5 text-white" />
              </button>
            </FormField>

            <FormField name="model" v-slot="$field">
              <UIDropdownInput input-id="model" theme="light" v-model:availableOptions="modelOptions"
                placeholder="Модельный ряд" :float-label="true" />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>

            <FormField name="issue_year" v-slot="$field">
              <UIInput input-id="issue_year" v-bind="commonUIInputProps" label="Год выпуска" />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>
          </div>

          <div class="space-y-5">
            <h2 class="font-bold text-base md:text-lg">Сервисный центр</h2>

            <FormField name="region" v-slot="$field">
              <UIDropdownInput input-id="region" theme="light" v-model:availableOptions="regionOptions"
                placeholder="Город" :float-label="true" />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>

            <FormField name="fillial" v-slot="$field">
              <UIDropdownInput input-id="fillial" theme="light" v-model:availableOptions="fillialOptions"
                placeholder="Филиал" :float-label="true" />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>


            <FormField name="work_type" v-slot="$field">
              <UIDropdownInput input-id="work_type" theme="light" v-model:availableOptions="typeOfWork"
                placeholder="Тип работы" :float-label="true" />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>

            <UIInput v-date-format input-id="due_date" v-bind="commonUIInputProps" label="Date" :input-props="{
              onFocus: (event) => toggleDatePickerPopover(event),
              value: formattedDate,
              readonly: true
            }" />

            <FormField name="time" v-slot="$field">
              <Transition name="slide-fade" mode="in-out">
                <div v-if="formattedDate">
                  <div class="grid grid-cols-2 gap-2 md:grid-cols-3" v-if="availableTimes.length">
                    <button v-for="choice in timeChoices" :key="choice"
                      :class="[availableTimes.includes(choice) ? 'text-primary' : 'text-caption']"
                      class="option text-center py-3 text-sm md:text-base md:py-2.5 bg-background has-[:checked]:bg-primary relative has-[:checked]:text-white transition-colors">
                      <input v-bind="$field.props" type="radio"
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
              <UIInput input-id="name" v-bind="commonUIInputProps" label="Имя" />
            </FormField>

            <FormField name="phone" v-slot="$field">
              <UIInput input-id="phone" v-bind="commonUIInputProps" label="Телефон" />
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
                <button class="underline">здесь</button>.
              </div>
            </div>
            <div class="flex gap-x-2 items-start">
              <PrimeCheckbox binary />
              <div>
                Даю согласие на получение информации рекламного характера на условиях, указанных <button
                  class="underline">здесь</button>.
              </div>
            </div>
          </div>


          <UIButton type="submit" label="Записаться" color="secondary" mode="full" class="md:w-full 2xl:w-auto"
             />
        </Form>
      </UISection>

      <!-- Feedback -->

      <UISection v-show="successfullySent"
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
          <UIButton mode="full" color="secondary" label="На главную" />
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
      </UISection>
    </div>
  </UISafeAreaView>
</template>
