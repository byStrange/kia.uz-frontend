<script setup lang="ts">
import { UIInput } from '#components'
import { Dialog, Textarea } from 'primevue'
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
const localePath = useLocalePath()

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
    <Dialog
      v-model:visible="isPrivacyDialogVisible"
      modal
      :pt="{
        root: '!rounded-none 2xl:h-full 2xl:!max-h-[758px]',
        mask: 'px-3',
        header:
          '!px-8 !pt-8 !pb-5 border-b border-protection 2xl:w-[624px] 2xl:!mx-auto 2xl:!px-0 2xl:!pt-20',
        content: '!pt-5 2xl:!px-0 2xl:max-w-[624px] 2xl:mx-auto',
        pcCloseButton: {
          root: '!absolute top-3 right-3 md:top-4 md:right-4 2xl:top-6 2xl:right-6',
        },
      }"
      class="w-full md:w-[--screen-md] 2xl:w-[840px]"
    >
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
        <UIButton
          label="Понятно"
          color="secondary"
          mode="full"
          class="mx-auto mt-8 2xl:mt-10"
          @click="isPrivacyDialogVisible = false"
        />
      </div>
    </Dialog>
    <UIContainer class="pt-6">
      <UIBreadcrumb class="hidden 2xl:block" theme="dark" />
    </UIContainer>
    <div>
      <h1
        class="text-primary text-2xl font-semibold py-7.5 border-b border-protection md:text-4xl container 2xl:text-7xl 2xl:py-10"
      >
        Обратная связь
      </h1>
      <!-- Form -->
      <UISection
        v-show="!successfullySent"
        class="container md:max-w-[426px] md:px-0 2xl:max-w-[618px]"
      >
        <div class="pb-8 border-b border-protection">
          <h4 class="text-sm md:text-base">Горячая линия</h4>
          <span class="mt-1 text-lg font-semibold md:text-2xl">1333</span>
        </div>

        <Form
          :resolver
          :initial-values="initialValues"
          @submit="onSubmit"
          class="space-y-8 mt-8"
        >
          <div class="space-y-5">
            <p class="text-primary text-sm md:text-base">
              Вы можете отправить ваше обращение дилеру. Оставьте ваши контакты
              и уточните тему запроса, и мы свяжемся с вами.
            </p>

            <FormField name="name" v-slot="$field">
              <UIInput
                input-id="name"
                label="Ваше имя"
                v-bind="commonUIInputProps"
              />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>

            <FormField name="surname" v-slot="$field">
              <UIInput
                input-id="surname"
                label="Фамилия"
                v-bind="commonUIInputProps"
              />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>

            <FormField name="phone" v-slot="$field">
              <UIInput
                input-id="phone"
                label="Телефон"
                v-bind="commonUIInputProps"
              />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>

            <FormField v-slot="$field" name="email">
              <UIInput
                input-id="email"
                label="E-mail"
                v-bind="commonUIInputProps"
                :input-props="{ invalid: $field.invalid }"
              />

              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>

            <FormField v-slot="$field" name="city">
              <UIInput
                input-id="city"
                label="Город"
                v-bind="commonUIInputProps"
                :input-props="{ invalid: $field.invalid }"
              />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>
          </div>

          <FormField v-slot="$field" name="comment">
            <Textarea
              unstyled
              input-id="comment"
              placeholder="Ваш комментарий или вопрос"
              class="border focus:outline-none resize-none border-disabled hover:border-protection focus:border-primary w-full py-4.5 px-4 text-base placeholder:text-caption"
            />
            <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
              {{ $field.error.message }}
            </p>
          </FormField>

          <div class="space-y-4">
            <label class="text-primary text-sm md:text-base">Тип запроса</label>
            <FormField v-slot="$field" name="requestType">
              <UIDropdownInput
                v-model:available-options="requestTypes"
                placeholder="Выберите тип вопроса"
                :float-label="true"
              />
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>
          </div>
          <div>
            <FormField v-slot="$field" name="agree">
              <div class="flex gap-x-2">
                <PrimeCheckbox input-id="agree" binary />
                <label for="agree" class="text-xs text-primary md:text-base"
                  >Даю согласие на обработку своих персональных данных на
                  условиях, указанных
                  <button
                    type="button"
                    class="underline"
                    @click="isPrivacyDialogVisible = true"
                  >
                    здесь.
                  </button></label
                >
              </div>
              <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                {{ $field.error?.message }}
              </p>
            </FormField>
            <UIButton
              type="submit"
              label="Отправить"
              color="secondary"
              mode="full"
              class="mt-10 md:w-full 2xl:w-auto"
            />
          </div>
        </Form>
      </UISection>

      <!-- Feedback -->

      <UISection
        v-show="successfullySent"
        class="space-y-8 container md:max-w-[426px] md:px-0 2xl:max-w-[618px] md:space-y-10 2xl:space-y-12"
      >
        <div class="space-y-4 text-primary md:space-y-6 2xl:space-y-8">
          <h1 class="text-lg font-semibold md:text-2xl 2xl:text-3xl">
            Ваше обращение успешно отправлено!
          </h1>

          <p class="text-sm md:text-base">
            Спасибо за обращение! Рассмотрение займет не больше одного рабочего
            дня, но обычно мы справляемся быстрее. Как только все будет готово,
            сотрудник службы поддержки свяжется с вами по электронной почте.
          </p>
          <UIButton
            mode="full"
            color="secondary"
            label="На главную"
            @click="$router.push(localePath('/'))"
          />
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
