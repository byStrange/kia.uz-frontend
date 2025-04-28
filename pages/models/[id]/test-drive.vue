<script setup lang="ts">
import { Dialog, Textarea } from 'primevue'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import { AtomInput } from '#components'
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { testDriveSchema } from '~/schemas/forms';

const { safe } = useSafeAccessMedia()
const route = useRoute()
const { data: pageData } = useFetch(`/api/models/${route.params.id}/test-drive`)
const resolver = ref(zodResolver(testDriveSchema))

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

const isPrivacyDialogVisible = ref(false)
const showSuccessModal = ref(false)

const initialValues = ref({
  name: '',
  region: '',
  phone: '',
  comment: '',
  agree: false
})

const regionOptions = ref([
  { label: 'Andijon viloyati', value: 'Andijon' },
  { label: 'Buxoro viloyati', value: 'Buxoro' },
  { label: 'Farg‘ona viloyati', value: 'Farg\'ona' },
  { label: 'Jizzax viloyati', value: 'Jizzax' },
  { label: 'Xorazm viloyati', value: 'Xorazm' },
  { label: 'Namangan viloyati', value: 'Namangan' },
  { label: 'Navoiy viloyati', value: 'Navoiy' },
  { label: 'Qashqadaryo viloyati', value: 'Qashqadaryo' },
  { label: 'Samarqand viloyati', value: 'Samarqand' },
  { label: 'Sirdaryo viloyati', value: 'Sirdaryo' },
  { label: 'Surxondaryo viloyati', value: 'Surxandaryo' },
  { label: 'Toshkent viloyati', value: 'Toshkent viloyati' },
  { label: 'Toshkent shahri', value: 'Toshkent Shahri' }
])

const onSubmit = ({ values }: FormSubmitEvent) => {
  $fetch(`/api/models/${route.params.id}/test-drive`, {
    method: 'post',
    body: JSON.stringify(values)
  }).then(() => {
    showSuccessModal.value = true;
  })
}

definePageMeta({
  lockHover: true
})

</script>
<template>
  <UISafeAreaView>
    <Dialog v-model:visible="showSuccessModal" modal>
      <template #closeicon>
        <UICloseIcon class="text-primary md:size-7.5" />
      </template>
      <p>{{ $t('common_form.test_drive_form_sent_successfully') }}</p>
    </Dialog>
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
          {{ $t('common.personal_data_consent_modal_title') }}
        </h1>
      </template>
      <div class="relative">
        <div class="space-y-5 text-primary">
          <p class="text-base">{{ $t('common.personal_data_consent_text') }}</p>
        </div>
        <AtomButton :label="$t('common.got_it')" color="primary" mode="full" class="mx-auto mt-8 2xl:mt-10"
          @click="isPrivacyDialogVisible = false" />
      </div>
    </Dialog>
    <UIDesktopOnly>
      <UIContainer class="pt-6">
        <MoleculeBreadcrumb theme="dark" />
      </UIContainer>
    </UIDesktopOnly>

    <h1
      class="text-primary text-2xl font-semibold py-7.5 border-b border-protection md:text-4xl container 2xl:text-7xl 2xl:py-10">
      {{ $t('common.sign_up_for_test_drive') }}</h1>

    <MoleculeSection>
      <UIContainer class="2xl:grid 2xl:grid-cols-12 2xl:gap-grid-12-gap">
        <div class="col-span-5">
          <div class="text-primary">
            <h2 class="text-lg font-semibold py-2 md:py-1 md:text-2xl 2xl:py-0">{{ pageData?.model.name }}</h2>
            <img class="w-full h-2.5h object-contain" :src="safe(pageData?.model.main_image)" alt="Sel images">
            <div class="space-y-1 py-4 md:flex md:justify-between md:space-y-0 md:py-4.5 2xl:pt-5 2xl:pb-2.5">
              <p class="text-sm md:text-base">{{ $t('common.car_price') }}</p>
              <p class="font-semibold text-base md:text-lg">{{ $t('prefixes.from', {
                price:
                  formatPrice(pageData?.model.starting_price)
              }) }}</p>
            </div>
          </div>
        </div>
        <div class="col-span-7 2xl:grid 2xl:grid-cols-8">
          <div class="space-y-7.5 2xl:col-start-2 2xl:col-end-8">
            <div class="space-y-1">
              <h2 class="font-semibold text-sm md:text-base">{{ $t('common_form.your_contacts') }}</h2>
              <p class="text-disabled text-sm md:text-base pb-1">{{ $t('common_form.fields_required_notice') }}</p>
            </div>
            <Form :key="showSuccessModal" :initial-values :resolver @submit="onSubmit">
              <div class="space-y-7.5">
                <FormField v-slot="$field" name="name">
                  <AtomInput :input-id="$field.props?.name" :label="$t('common_form.name')"
                    v-bind="commonAtomInputProps" />
                  <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                    {{ $t($field.error?.message) }}
                  </p>
                </FormField>
                <FormField v-slot="$field" name="region">
                  <AtomDropdownInput v-model:available-options="regionOptions" input-id="region" theme="light"
                    :placeholder="$t('common_form.city')" :float-label="true" />
                  <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                    {{ $t($field.error?.message) }}
                  </p>
                </FormField>
                <FormField v-slot="$field" name="phone">
                  <AtomInput v-bind="commonAtomInputProps" input-id="phone" :label="$t('common_form.phone')" />
                  <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                    {{ $t($field.error?.message) }}
                  </p>
                </FormField>
                <FormField v-slot="$field" name="comment">
                  <Textarea unstyled input-id="comment" :placeholder="$t('common_form.your_comment_or_question')"
                    class="border focus:outline-none resize-none border-disabled hover:border-protection focus:border-primary w-full py-4.5 px-4 text-sm md:text-base+ placeholder:text-caption" />
                  <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                    {{ $t($field.error?.message) }}
                  </p>
                </FormField>
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
                <AtomButton :label="$t('common_form.submit_application')" type="submit" color="primary" mode="full" />
              </div>
            </Form>
          </div>
        </div>
      </UIContainer>
    </MoleculeSection>
  </UISafeAreaView>
</template>
