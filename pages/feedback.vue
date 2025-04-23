<script setup lang="ts">
import { AtomInput } from '#components'
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
        <AtomButton :label="$t('common.got_it')" color="primary" mode="full" class="mx-auto mt-8 2xl:mt-10"
          @click="isPrivacyDialogVisible = false" />
      </div>
    </Dialog>

    <UIContainer class="pt-6">
      <MoleculeBreadcrumb class="hidden 2xl:block" theme="dark" />
    </UIContainer>

    <h1
      class="text-primary text-2xl font-semibold py-7.5 border-b border-protection md:text-4xl container 2xl:text-7xl 2xl:py-10">
      {{ $t('common.feedback') }}
    </h1>

    <!-- Form -->
    <MoleculeSection v-show="!successfullySent" class="container md:max-w-[426px] md:px-0 2xl:max-w-[618px]">
      <div class="pb-8 border-b border-protection">
        <h4 class="text-sm md:text-base">{{ $t('menu.kia_hotline') }}</h4>
        <span class="mt-1 text-lg font-semibold md:text-2xl">1333</span>
      </div>

      <Form :resolver :initial-values="initialValues" class="space-y-8 mt-8" @submit="onSubmit">
        <div class="space-y-5">
          <p class="text-primary text-sm md:text-base">
            {{ $t('feedback.contact_instruction') }}
          </p>

          <FormField v-slot="$field" name="name">
            <AtomInput input-id="name" :label="$t('common_form.name')" v-bind="commonAtomInputProps" />
            <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
              {{ $t($field.error?.message) }}
            </p>
          </FormField>

          <FormField v-slot="$field" name="surname">
            <AtomInput input-id="surname" :label="$t('common_form.surname')" v-bind="commonAtomInputProps" />
            <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
              {{ $t($field.error?.message) }}
            </p>
          </FormField>

          <FormField v-slot="$field" name="phone">
            <AtomInput input-id="phone" :label="$t('common_form.phone')" v-bind="commonAtomInputProps" />
            <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
              {{ $t($field.error?.message) }}
            </p>
          </FormField>

          <FormField v-slot="$field" name="email">
            <AtomInput input-id="email" :label="$t('common_form.email')" v-bind="commonAtomInputProps"
              :input-props="{ invalid: $field.invalid }" />
            <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
              {{ $t($field.error?.message) }}
            </p>
          </FormField>

          <FormField v-slot="$field" name="city">
            <AtomInput input-id="city" :label="$t('common_form.city')" v-bind="commonAtomInputProps"
              :input-props="{ invalid: $field.invalid }" />
            <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
              {{ $t($field.error?.message) }}
            </p>
          </FormField>
        </div>

        <FormField v-slot="$field" name="comment">
          <Textarea unstyled input-id="comment" :placeholder="$t('feedback.comment')"
            class="border focus:outline-none resize-none border-disabled hover:border-protection focus:border-primary w-full py-4.5 px-4 text-base placeholder:text-caption" />
          <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
            {{ $t($field.error.message) }}
          </p>
        </FormField>

        <div class="space-y-4">
          <label class="text-primary text-sm md:text-base">{{ $t('feedback.request_type') }}</label>
          <FormField v-slot="$field" name="requestType">
            <AtomDropdownInput v-model:available-options="requestTypes"
              :placeholder="$t('feedback.select_question_type')" :float-label="true" />
            <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
              {{ $t($field.error?.message) }}
            </p>
          </FormField>
        </div>
        <div>
          <FormField v-slot="$field" name="agree">
            <div class="flex gap-x-2">
              <PrimeCheckbox input-id="agree" binary />
              <label for="agree" class="text-xs text-primary md:text-base">
                <i18n-t keypath="common_form.consent_personal_data_processing">
                  <template #button>
                    <button type="button" class="underline" @click="isPrivacyDialogVisible = true">
                      {{ $t('common_form.consent_personal_data_processing_button_text') }}
                    </button>
                  </template>
                </i18n-t>
              </label>
            </div>
            <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
              {{ $t($field.error?.message) }}
            </p>
          </FormField>
          <AtomButton type="submit" :label="$t('common_form.submit')" color="primary" mode="full"
            class="mt-10 md:w-full 2xl:w-auto" />
        </div>
      </Form>
    </MoleculeSection>
  </UISafeAreaView>
</template>
