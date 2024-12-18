<script setup lang="ts">
const { src } = useUploadcareSource()
import { FormField } from '@primevue/forms'
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
      <UIContainer>
        <div>
          <div class="text-primary">
            <h2 class="text-lg font-semibold py-2 md:py-1 md:text-2xl">Seltos</h2>
            <img class="w-full h-2.5h object-contain" :src="src('ecceba26-a813-413b-8baf-d583ebb944be')"
              alt="Sel images">
            <div class="space-y-1 py-4 md:flex md:justify-between md:space-y-0 md:py-4.5">
              <p class="text-sm md:text-base">Стоимость авто</p>
              <p class="font-semibold text-base md:text-lg">от 360 905 000 сум</p>
            </div>
          </div>
        </div>
        <div class="space-y-7.5">
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
              <UIButton label="Отправить заявку" type="submit" color="primary" mode="full"  />
            </div>
          </Form>
        </div>
      </UIContainer>
    </UISection>
  </UISafeAreaView>
</template>
