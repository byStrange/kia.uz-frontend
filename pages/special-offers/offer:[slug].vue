<script setup lang="ts">
const { paddingTop } = useSafeArea()

const { bounding } = useContainer()

const { headerService } = useHeaderService()

const { src } = useUploadcareSource()

onMounted(() => {
  headerService.value.lockHover = false
  headerService.value.isHeaderFixed = false
  headerService.value.isHover = false
})
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
            src('2ba0480c-303b-4b8e-b7b1-3318e82632de', { preview: '1440x492' })
          "
          media="(min-width: 1440px)"
        />
        <source
          :srcset="
            src('bb3bebbb-09d8-41d7-b89c-5e0cfa9bd855', { preview: '768x420' })
          "
          media="(min-width: 768px)"
        />
        <img
          class="w-full absolute top-0 left-0 h-2/3 object-cover md:h-auto 2xl:h-full"
          :src="
            src('61839bda-3ff1-4b35-926b-833fcae20e61', { preview: '375x490' })
          "
        />
      </picture>
      <div
        class="!px-0 py-5 absolute left-[--left] top-[--safe-area-padding-top] hidden 2xl:block z-20"
        :style="{ '--left': bounding.x.value + 'px' }"
      >
        <UIBreadcrumb theme="light" />
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
        <UIButton
          label="Заказать обратный звонок"
          mode="full"
          size="md+"
          class="mt-4 md:mt-5 2xl:mt-10"
        />
      </div>
    </div>
    <UIContainer
      class="pt-10 pb-12.5 2xl:pt-20 2xl:pb-10 bg-white text-primary"
    >
      <div>
        <h1 class="font-semibold text-xl md:text-2xl 2xl:text-5xl">
          Выгодный обмен вашего автомобиля на новый Kia!
        </h1>
        <div class="space-y-4.5 mt-4 md:mt-7.5 text-sm md:text-base">
          <p>
            Обменяйте свой автомобиль на новую Kia быстро, выгодно и комфортно
            в дилерском центре Kia с выгодой 10 миллионов сум.
          </p>
          <p>
            <b> Программа Trade-in </b> — это уникальная возможность передать
            свой автомобиль в счет стоимости нового Kia.
          </p>
          <div>
            <h3 class="font-semibold">Все, что от вас требуется — это:</h3>
            <ul class="space-y-4 py-6 md:py-0 md:mt-4.5">
              <li class="flex items-start gap-2.5">
                <UICheckIcon class="size-5 shrink-0" />
                <span>Юридическая чистота транспортного средства</span>
              </li>
              <li class="flex items-start gap-2.5">
                <UICheckIcon class="size-5 shrink-0" />
                <span>
                  Отсутствие серьезных повреждений кузова, оказывающих влияние
                  на его геометрию
                </span>
              </li>
              <li class="flex items-start gap-2.5">
                <UICheckIcon class="size-5 shrink-0" />
                <span>
                  Ваше желание поскорее поменять свой автомобиль на новый Kia
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="space-y-4 md:mt-7.5 md:space-y-6 text-sm md:text-base">
          <p>
            <b>Быстро! Удобно! Выгодно!</b> На оценку вашего транспортного
            средства и принятие решения уходит минимум времени.
          </p>
          <div>
            <h3 class="font-semibold">
              Чтобы купить новый Kia по программе Trade-in понадобится всего
              несколько этапов:
            </h3>
            <ul class="space-y-4 py-6 md:py-0 md:mt-4.5">
              <li
                class="flex items-start gap-2.5"
                v-for="i in [
                  'Приехать в дилерский центр Kia',
                  'Выбрать новый автомобиль',
                  'Пройти оценку вашего автомобиля',
                  'Заключить договор',
                  'Сдать свой автомобиль в счет стоимости нового',
                  'Уехать на новом автомобиле',
                ]"
              >
                <UICheckIcon class="size-5 shrink-0" />
                <span>{{ i }}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold">Преимущества Trade-in Kia:</h3>
            <ul class="space-y-4 py-6 md:py-0 md:mt-4.5">
              <li
                class="flex items-start gap-2.5"
                v-for="i in [
                  'Выгодная оценка авто, идущего в зачет',
                  'Весь процесс происходит не выходя из дилерского центра Kia, что экономит ваши силы и время',
                  '100% прозрачная сделка и отсутствие юридических рисков',
                  'Выгода 10 миллионов сум',
                ]"
              >
                <UICheckIcon class="size-5 shrink-0" />
                <span>{{ i }}</span>
              </li>
            </ul>
          </div>
        </div>
        <p class="text-primary md:mt-7.5">
          <b
            >Kia Uzbekistan дорожит своей репутацией: работать с нами удобно и
            надежно</b
          >
          Воспользуйтесь возможностью выгодно обменять свой автомобиль на
          новый.  Выбрав Kia, вы получаете высочайший уровень сервиса, комфорт и
          надежность, признанные во всем мире. Сделайте первый решительный шаг
          к большой цели вместе с Kia! Смелей!
        </p>
        <UIButton
          label="Позвонить"
          color="secondary"
          mode="full"
          size="md+"
          class="mt-6"
        />
      </div>
    </UIContainer>
  </div>
</template>
