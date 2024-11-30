<script setup lang="ts">
import { UIInput } from '#components'
import { Dialog } from 'primevue'

const { headerService } = useHeaderService()

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

const formData = reactive({
  name: '',
  surname: '',
  phone: '',
  email: '',
  city: '',
  comment: '',

  requestType: '',
  agree: false,
})

const isPrivacyDialogVisible = ref(false)

const privacyAndTerms = {
  title: 'Согласие на обработку персональных данных',
  description:
    'Отправляя сообщение, я выражаю свое согласие и разрешаю ООО «Roodell», а также, по их поручению, третьим лицам осуществлять обработку моих персональных данных (фамилия, имя, отчество, год, месяц, дата и место рождения; адрес, номер паспорта и сведения о дате выдачи паспорта и выдавшем его органе; образование, профессия, место работы и должность; домашний, рабочий и мобильный телефоны; адрес электронной почты и другие данные, требуемые для отправки сообщения), включая сбор, систематизацию, накопление, хранение, уточнение, использование, распространение (в том числе трансграничную передачу), обезличивание, уничтожение персональных данных), в целях связанных с возможностью предоставления информации о товарах и услугах, которые потенциально могут представлять интерес, а также в целях сбора и обработки статистической информации и проведения маркетинговых исследований. Согласие на обработку персональных данных в соответствии с указанными выше условиями я предоставляю на 10 (десять) лет. Я уведомлен и согласен с тем, что указанное согласие может быть мной отозвано посредством направления письменного заявления заказным почтовым отправлением с описью вложения, либо вручено лично под подпись.',
}

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

onMounted(() => {
  headerService.value.isHeaderFixed = true
  headerService.value.lockHover = true
})
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
          {{ privacyAndTerms.title }}
        </h1>
      </template>
      <div class="relative">
        <div class="space-y-5 text-primary">
          <p class="text-base">{{ privacyAndTerms.description }}</p>
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
      <form>
        <UISection
          sectionTitle=""
          class="space-y-8 container md:max-w-[426px] md:px-0 2xl:max-w-[618px]"
        >
          <template #title>
            <div class="pb-8 border-b border-protection">
              <h4 class="text-sm md:text-base">Горячая линия</h4>
              <span class="mt-1 text-lg font-semibold md:text-2xl">1333</span>
            </div>
          </template>

          <div class="space-y-5">
            <p class="text-primary text-sm md:text-base">
              Вы можете отправить ваше обращение дилеру. Оставьте ваши контакты
              и уточните тему запроса, и мы свяжемся с вами.
            </p>
            <UIInput
              inputId="name"
              label="Ваше имя"
              v-bind="commonUIInputProps"
              v-model="formData.name"
            />
            <UIInput
              inputId="surname"
              label="Фамилия"
              v-bind="commonUIInputProps"
              v-model="formData.surname"
            />

            <UIInput
              inputId="phone"
              label="Телефон"
              v-bind="commonUIInputProps"
              v-model="formData.phone"
            />
            <UIInput
              label="E-mail"
              inputId="email"
              v-bind="commonUIInputProps"
              v-model="formData.email"
            />
            <UIInput
              label="Город"
              inputId="city"
              v-bind="commonUIInputProps"
              v-model="formData.city"
            />
          </div>

          <textarea
            placeholder="Ваш комментарий или вопрос"
            rows="4"
            class="border focus:outline-none resize-none border-disabled hover:border-protection focus:border-primary w-full py-4.5 px-4 text-base placeholder:text-caption"
            v-model="formData.comment"
          ></textarea>

          <div class="space-y-4">
            <label class="text-primary text-sm md:text-base">Тип запроса</label>
            <UIDropdownInput
              v-model:available-options="requestTypes"
              v-model:selected-option="formData.requestType"
              placeholder="Выберите тип вопроса"
              :float-label="true"
            />
          </div>
          <div>
            <div class="flex gap-x-2">
              <PrimeCheckbox inputId="agree" v-model="formData.agree" binary />
              <label class="text-xs text-primary md:text-base"
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

            <UIButton
              type="submit"
              label="Отправить"
              color="secondary"
              mode="full"
              class="mt-10 md:w-full 2xl:w-auto"
            />
          </div>
        </UISection>
      </form>
    </div>
  </UISafeAreaView>
</template>
