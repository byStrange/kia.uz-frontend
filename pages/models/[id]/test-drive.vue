<script setup lang="ts">
const { src } = useUploadcareSource()
import { Dialog, Textarea } from 'primevue'
import { Form, FormField } from '@primevue/forms'
import { UIInput } from '#components'

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

const { data: privacyAndTerms } = useFetch('/api/terms')

const isPrivacyDialogVisible = ref(false)

const initialValues = ref({
  name: '',
  region: '',
  phone: '',
  comment: '',
  agree: false
})

const regionOptions = ref([
  { label: 'Tashkent', value: '1' }
])

definePageMeta({
  lockHover: true
})

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
        <UIButton label="Понятно" color="primary" mode="full" class="mx-auto mt-8 2xl:mt-10"
          @click="isPrivacyDialogVisible = false" />
      </div>
    </Dialog>
    <UIDesktopOnly>
      <UIContainer class="pt-6">
        <UIBreadcrumb theme="dark" />
      </UIContainer>
    </UIDesktopOnly>

    <h1
      class="text-primary text-2xl font-semibold py-7.5 border-b border-protection md:text-4xl container 2xl:text-7xl 2xl:py-10">
      Обратная связь
    </h1>

    <UISection>
      <UIContainer class="2xl:grid 2xl:grid-cols-12 2xl:gap-grid-12-gap">
        <div class="col-span-5">
          <div class="text-primary">
            <h2 class="text-lg font-semibold py-2 md:py-1 md:text-2xl 2xl:py-0">Seltos</h2>
            <img class="w-full h-2.5h object-contain" :src="src('ecceba26-a813-413b-8baf-d583ebb944be')"
              alt="Sel images">
            <div class="space-y-1 py-4 md:flex md:justify-between md:space-y-0 md:py-4.5 2xl:pt-5 2xl:pb-2.5">
              <p class="text-sm md:text-base">Стоимость авто</p>
              <p class="font-semibold text-base md:text-lg">от 360 905 000 сум</p>
            </div>
          </div>
        </div>
        <div class="col-span-7 2xl:grid 2xl:grid-cols-8">
          <div class="space-y-7.5 2xl:col-start-2 2xl:col-end-8">
            <div class="space-y-1">
              <h2 class="font-semibold text-sm md:text-base">Ваши контакты</h2>
              <p class="text-disabled text-sm md:text-base pb-1">Поля, отмеченные *, обязательны для заполнения</p>
            </div>
            <Form :initial-values>
              <div class="space-y-7.5">
                <FormField name="name" v-slot="$field">
                  <UIInput :input-id="$field.props?.name" label="Имя" v-bind="commonUIInputProps" />
                </FormField>
                <FormField name="region" v-slot="$field">
                  <UIDropdownInput input-id="region" theme="light" v-model:availableOptions="regionOptions"
                    placeholder="Город" :float-label="true" />
                  <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                    {{ $field?.error?.message }}
                  </p>
                </FormField>
                <FormField name="phone" v-slot="$field">
                  <UIInput input-id="phone" v-bind="commonUIInputProps" label="Телефон" />
                  <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                    {{ $field.error?.message }}
                  </p>
                </FormField>
                <FormField v-slot="$field" name="comment">
                  <Textarea unstyled input-id="comment" placeholder="Ваш комментарий или вопрос"
                    class="border focus:outline-none resize-none border-disabled hover:border-protection focus:border-primary w-full py-4.5 px-4 text-sm md:text-base+ placeholder:text-caption" />
                  <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                    {{ $field.error.message }}
                  </p>
                </FormField>
                <FormField v-slot="$field" name="agree">
                  <div class="flex gap-x-2">
                    <PrimeCheckbox input-id="agree" binary />
                    <label for="agree" class="text-xs text-primary md:text-base">Даю согласие на обработку своих
                      персональных
                      данных на
                      условиях, указанных
                      <button type="button" class="underline" @click="isPrivacyDialogVisible = true">
                        здесь.
                      </button></label>
                  </div>
                  <p v-if="$field.invalid" class="mt-1 text-kia-live-red text-xs">
                    {{ $field.error?.message }}
                  </p>
                </FormField>
                <UIButton label="Отправить заявку" type="submit" color="primary" mode="full" />
              </div>
            </Form>
          </div>
        </div>
      </UIContainer>
    </UISection>
  </UISafeAreaView>
</template>
