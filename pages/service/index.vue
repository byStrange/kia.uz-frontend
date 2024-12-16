<script setup lang="ts">
import { UIInput, UITickToLeft } from '#components'
import { Dialog, DatePicker } from 'primevue'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'

const requestTypes = ref([
  { label: 'Наличие и процесс поставки автомобиля Kia', value: '1' },
  {
    label: 'Наличие и стоимость запасных частей и аксессуаров Kia',
    value: '2',
  },
  { label: 'Сервисное обслуживание (ТО, гарантия, эксплуатация)', value: '3' },
  { label: 'Условия кредитования и страхования', value: '4' },
  { label: 'Прохождение тест-драйва', value: '5' },
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

definePageMeta({
  lockHover: true,
})

const initialValues = ref({
  name: '',
  surname: '',
  phone: '',
  email: '',
  city: '',
  comment: '',
  requestType: '',
  agree: false,
})

const resolver = ref(zodResolver(feedbackSchema))

const successfullySent = ref(false)

const onSubmit = (event: FormSubmitEvent) => {
  successfullySent.value = event.valid
}
</script>
<template>
  <UISafeAreaView>
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
        <Form :resolver :initial-values="initialValues" @submit="onSubmit" class="space-y-12.5 2xl:space-y-16">
          <div class="space-y-5">
            <h2 class="font-bold text-base md:text-lg">Данные автомобиля</h2>

            <FormField class="flex w-full">
              <UIInput inputId="vin_number" label="VIN-номер" v-bind="commonUIInputProps"
                class="flex-1 -translate-y-[1px]" />
              <button class="bg-primary size-12 2xl:size-15 text-white flex justify-center items-center">
                <UITickToRight class="size-5 text-white" />
              </button>
            </FormField>

            <FormField>
              <UIDropdownInput theme="light" v-model:availableOptions="requestTypes" placeholder="Модельный ряд"
                :float-label="true" />
            </FormField>

            <FormField>
              <UIInput input-id="issue_year" v-bind="commonUIInputProps" label="Год выпуска" />
            </FormField>
          </div>

          <div class="space-y-5">
            <h2 class="font-bold text-base md:text-lg">Сервисный центр</h2>

            <FormField>
              <UIDropdownInput input-id="city" theme="light" v-model:availableOptions="requestTypes" placeholder="Город"
                :float-label="true" />
            </FormField>

            <FormField>
              <UIDropdownInput input-id="fillial" theme="light" v-model:availableOptions="requestTypes"
                placeholder="Филиал" :float-label="true" />
            </FormField>


            <FormField>
              <UIDropdownInput input-id="work_type" theme="light" v-model:availableOptions="requestTypes"
                placeholder="Тип работы" :float-label="true" />
            </FormField>

            <FormField>
              <DatePicker unstyled :pt="{
                panel: 'bg-white border border-protection px-5 py-4',
                selectYear: 'hidden',
                selectMonth: 'text-sm+',
                header: 'flex justify-between items-start h-5',
                pcPrevButton: {
                  root: 'size-5',
                },
                pcNextbutton: {
                  root: 'size-5'
                },
                dayView: 'w-full mt-4',
                tableBody: 'mt-7.5',
                dayCell: 'size-7.5',
                day: 'size-7.5 block'
              }">
                <template #previcon>
                  <UITickToLeft class="size-5" />
                </template>
                <template #nexticon>
                  <UITickToRight class="size-5" />
                </template>

              </DatePicker>
            </FormField>
          </div>

          <div class="space-y-5">
            <h2 class="font-bold text-base md:text-lg">Ваши контакты</h2>

            <FormField>
              <UIInput input-id="name" v-bind="commonUIInputProps" label="Имя" />
            </FormField>

            <FormField>
              <UIInput input-id="phone" v-bind="commonUIInputProps" label="Телефон" />
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
            size="md+" />
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
