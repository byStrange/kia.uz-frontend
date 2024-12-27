<script setup lang="ts">
const { paddingTop } = useSafeArea()

const { bounding } = useContainer()

const { src } = useUploadcareSource()

const items = ref([
  {
    title: 'Широкий модельный ряд',
    description:
      'Kia позволяет Вам подобрать модели для любых задач от разъездных работ до перевозки первых лиц компании. Мы представлены в каждом классе и сегменте.',
  },
  {
    title: 'Крупнейшая дилерская сеть в Узбекистане',
    description: 'Более 20 дилеров в 12 городах Узбекистана',
  },
  {
    title: 'Заводская гарантия 5 лет на весь модельный ряд',
    description:
      'Kia — уникальный бренд на российском рынке, предоставляющий полноценную заводскую гарантию на 5 лет или 150 000 км пробега на весь модельный ряд.',
  },
  {
    title: 'Снижение расходов на содержание автопарка',
    description:
      'Специальные условия по обслуживанию автомобилей (сниженная стоимость нормо-часа и запасных частей) и выделенный в Представительстве Kia менеджер по сервисной поддержке корпоративных клиентов сделают Ваш опыт владения автомобилями Kia комфортным и выгодным.',
  },
])
</script>

<template>
  <div>
    <div
      class="h-5h overflow-hidden grid place-items-end md:place-items-start md:pt-[--safe-area-padding-top] md:h-[420px] 2xl:h-6h 2xl:place-items-end relative"
      :style="{
        '--safe-area-padding-top': paddingTop,
      }"
    >
      <div
        class="shadowman absolute w-full h-full top-0 left-0 z-10 bg-[image:--gradient] md:bg-[image:none] md:bg-primary md:bg-opacity-60"
        :style="{
          '--gradient':
            'linear-gradient(180deg, rgba(8, 20, 30, 0.4) 0%, rgba(8, 20, 30, 0.589696) 40.99%, #08141E 65.6%)',
        }"
      ></div>
      <picture>
        <source
          :srcset="
            src('baac8213-4129-40cb-ae4f-f601d90e61af', { preview: '1440x492' })
          "
          media="(min-width: 1440px)"
        />
        <source
          :srcset="
            src('78a7f64a-3b98-4d00-bac1-ae1be3de15bd', { preview: '768x420' })
          "
          media="(min-width: 768px)"
        />
        <img
          class="w-full absolute top-0 left-0 h-2/3 object-cover md:h-auto 2xl:h-full"
          :src="
            src('28607f12-4f02-4823-a9d1-afc0edb84f0d', { preview: '375x490' })
          "
        />
      </picture>
      <div
        class="!px-0 py-5 absolute left-[--left] top-[--safe-area-padding-top] hidden 2xl:block z-20"
        :style="{ '--left': bounding.x.value + 'px' }"
      >
        <MoleculeBreadcrumb theme="light" />
      </div>
      <div
        class="container py-10 md:h-[360px] md:flex md:flex-col md:justify-end md:items-start 2xl:h-auto 2xl:pt-10 2xl:pb-20 relative z-20"
      >
        <div
          class="text-white space-y-4 md:max-w-5h md:space-y-3 2xl:max-w-7.25h"
        >
          <h1 class="text-3xl md:text-4xl 2xl:text-5xl">Программа Трейд-ин</h1>
          <p class="text-base 2xl:text-lg">
            Предложение действует до 31/10/2024
          </p>
        </div>
        <AtomButton
          label="Заказать обратный звонок"
          mode="full"
          
          class="mt-4 md:mt-5 2xl:mt-10"
        />
      </div>
    </div>
    <UIContainer
      class="py-10 2xl:pt-20 2xl:pb-10 bg-white text-primary 2xl:grid 2xl:grid-cols-12 2xl:gap-grid-12-gap"
    >
      <div class="2xl:col-start-2 2xl:col-end-12">
        <div>
          <div class="space-y-2.5">
            <h1 class="text-lg font-semibold md:text-2xl 2xl:text-5xl">
              Преимущества Kia для бизнеса
            </h1>
            <p class="text-sm md:text-base">
              Стать корпоративным клиентом и пользоваться преимуществами
              программы корпоративных продаж Kia Вы можете даже при приобретении
              одного автомобиля (при условии его оформления на юридическое лицо
              или индивидуального предпринимателя).
            </p>
          </div>

          <div
            class="divide-y divide-protection mt-12.5 border-y border-protection"
          >
            <div
              v-for="(item, index) in items"
              :key="item.title"
              class="py-5 space-y-2.5 md:grid md:grid-cols-6 md:gap-grid-12-gap md:space-y-0"
            >
              <div class="flex gap-x-4 md:col-span-2">
                <span class="text-forest-green font-semibold text-sm"
                  >0{{ index + 1 }}</span
                >
                <h1 class="text-sm font-semibold md:text-base">
                  {{ item.title }}
                </h1>
              </div>
              <p class="text-sm md:col-span-4 md:text-base">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-12.5">
          <div class="space-y-6">
            <h1 class="text-sm md:text-base font-semibold">
              Готовы сотрудничать? <br />
              Свяжитесь с нами по номерам:
            </h1>

            <ul class="space-y-2.5">
              <li
                v-for="i in ['+998 93 0515555', '+998 97 1285050']"
                :key="i"
                class="flex items-start gap-2"
              >
                <UIMiniCheckIcon class="size-5 shrink-0" />
                <span class="text-sm md:text-base">{{ i }}</span>
              </li>
            </ul>

            <p class="text-sm md:text-base">
              <b>
                Или по почте: <a href="mailto:islom.farxodov@roodell.uz"
                  >islom.farxodov@roodell.uz</a
                >
              </b>
            </p>
          </div>
          <AtomButton
            label="Оставить заявку"
            color="secondary"
            class="mt-7.5"
            mode="full"
            
          />
        </div>
      </div>
    </UIContainer>
  </div>
</template>
