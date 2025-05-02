<script setup lang="ts">
import { AtomInput } from '#components'
import { Dialog, Textarea } from 'primevue'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'

const { headerService } = useHeaderService()

const isPrivacyDialogVisible = ref(false)

const { locale } = useI18n()

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

definePageMeta({
  lockHover: true,
})

const initialValues = ref({
  name: '',
  phone: '',
  city: '',
  comment: '',
  agree: false,
})

const { data: pageData } = useAsyncData('seo', () => {
  return useFetchApi<SEO>('/pages/~feedback', locale.value)
})

onMounted(() => {
  console.log(pageData)
})

useSeoMeta({
  title: () => pageData.value?.seo.title || '',
  ogTitle: () => pageData.value?.seo.title || '',
  description: () => pageData.value?.seo.description || '',
  ogDescription: () => pageData.value?.seo.description || '',
  keywords: () => pageData.value?.seo.keywords || '',
})



const resolver = ref(zodResolver(feedbackSchema))

const successfullySent = ref(false)

const onSubmit = (event: FormSubmitEvent) => {
  console.log(event.values)
  if (event.valid) $fetch('/api/feedback', { method: 'post', body: event.values }).then(() => {
    successfullySent.value = true
  })
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

    <UIContainer class="pt-6">
      <MoleculeBreadcrumb class="hidden 2xl:block" theme="dark" />
    </UIContainer>

    <h1
      class="text-primary text-2xl font-semibold py-7.5 border-b border-protection md:text-4xl container 2xl:text-7xl 2xl:py-10">
      {{ $t('common.feedback') }}
    </h1>

    <!-- Form -->
    <MoleculeSection v-if="!successfullySent" class="container md:max-w-[426px] md:px-0 2xl:max-w-[618px]">
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

          <FormField v-slot="$field" name="phone">
            <AtomInput input-id="phone" :label="$t('common_form.phone')" v-bind="commonAtomInputProps" />
            <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
              {{ $t($field.error?.message) }}
            </p>
          </FormField>

          <FormField v-slot="$field" name="city">
            <AtomDropdownInput v-model:available-options="regionOptions" input-id="city" theme="light"
              :placeholder="$t('common_form.city')" :float-label="true" />
            <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
              {{ $t($field.error?.message) }}
            </p>
          </FormField>

          <FormField v-slot="$field" name="comment">
            <Textarea unstyled input-id="comment" :placeholder="$t('feedback.comment')"
              class="border focus:outline-none resize-none border-disabled hover:border-protection focus:border-primary w-full py-4.5 px-4 text-base placeholder:text-caption" />
            <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
              {{ $t($field.error.message) }}
            </p>
          </FormField>

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
        </div>
      </Form>
    </MoleculeSection>
    <MoleculeSection v-else
      class="space-y-8 container md:max-w-[426px] md:px-0 2xl:max-w-[618px] md:space-y-10 2xl:space-y-12">
      <div class="space-y-4 text-primary md:space-y-6 2xl:space-y-8">
        <h1 class="text-lg font-semibold md:text-2xl 2xl:text-3xl">
          {{ $t('service.success_title') }}
        </h1>

        <p class="text-sm md:text-base">
          {{ $t('service.success_message') }}
        </p>
        <AtomButton mode="full" color="secondary" :label="$t('common.go_home')" />
      </div>
      <hr />
      <div class="space-y-2 text-primary text-sm md:text-base">
        <p>{{ $t('menu.kia_hotline') }}</p>
        <p>
          <i18n-t keypath="service.kia_contact_info">
            <template #phoneLine1>
              <a :href="`tel:${headerService.phoneLine1}`">{{ headerService.phoneLine1 }}</a>
            </template>
            <template #phoneLine2>
              <a :href="`tel:${headerService.phoneLine2}`">{{ headerService.phoneLine2 }}</a>
            </template>
            <template #phoneLine3>
              <a :href="`tel:${headerService.phoneLine2}`">{{ headerService.phoneLine3 }}</a>
            </template>
          </i18n-t>
        </p>
      </div>
    </MoleculeSection>
  </UISafeAreaView>
</template>
