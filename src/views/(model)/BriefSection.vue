<script setup lang="ts">
import { useContainer } from '@/composables/useContainer';

import SlideView from '@/components/common/SlideView.vue';

import Section from '@/components/home/Section.vue';

const { bounding } = useContainer();
</script>
<template>
  <Section
    sectionTitle="Новый Kia Carnival"
    align="left"
    class="2xl:grid 2xl:grid-cols-12 2xl:container"
    size="lg"
  >
    <template #title="{ sectionTitle, sectionTitleClass }">
      <div
        class="container 2xl:col-start-2 2xl:col-end-12 2xl:px-0 2xl:grid 2xl:grid-cols-10"
      >
        <h1 :class="sectionTitleClass" class="!mb-0 col-span-4">
          {{ sectionTitle }}
        </h1>
        <p
          class="text-sm text-primary mt-2 md:text-base+ md:mt-3 col-start-7 col-span-4 2xl:mt-0"
        >
          Откройте мир инноваций вместе с Kia Carnival — бесспорным лидером в
          своем классе. Новый дизайн добавляет семейному кроссвэну изысканность,
          роскошный интерьер обеспечивает комфорт, отличная управляемость
          гарантирует уверенность на любой дороге. Новый Kia Carnival наполнит
          вашу повседневную жизнь новыми впечатлениями.
        </p>
      </div>
    </template>
    <div class="mt-6 2xl:row-start-2 col-start-2 2xl:mt-[100px] col-end-12">
      <img src="https://ucarecdn.com/4fb8d4c8-b54d-48d3-8be5-3400607b0b07/" />
    </div>
  </Section>

  <Section
    size="lg"
    sectionTitle="Внешний вид"
    subtitle="Экстерьер"
    align="left"
    class="bg-background 2xl:grid 2xl:grid-cols-12 2xl:container"
  >
    <template
      #title="{ sectionTitle, sectionTitleClass, subtitle, subtitleClass }"
    >
      <div class="container 2xl:px-0 col-span-4 col-start-2">
        <p :class="subtitleClass">{{ subtitle }}</p>
        <h1 :class="sectionTitleClass" class="!mb-0 mt-2 2xl:mt-2.5">
          {{ sectionTitle }}
        </h1>
        <p class="text-sm text-primary mt-4 2xl:mt-7.5">
          Изысканный и утонченный дизайн нового Kia Carnival отражается в каждой
          детали, придавая семейному кроссвэну неповторимый стиль, который
          гармонично будет сочетаться с вашим образом жизни.
        </p>
        <div
          class="hidden 2xl:block border-t border-t-protection mt-7.5 pt-7.5"
        >
          <div>
            <ul class="space-y-3.5 text-base ml-3.5">
              <li class="font-semibold list-disc">Спортивный силуэт</li>
              <li>Проекционные светодиодные фары</li>
              <li>Светодиодные задние фонари</li>
              <li>19-дюймовые легкосплавные диски с механической обработкой</li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <div class="mt-10 col-start-7 col-span-6 2xl:mt-0">
      <img
        class="hidden 2xl:block max-h-[645px] object-cover w-full"
        src="https://ucarecdn.com/cf373707-f5c0-4856-b2d1-cb07c0fa4cbb/"
      />
      <SlideView
        class="2xl:hidden"
        :data="[1, 2, 3, 4, 5]"
        :slides-offset-before="bounding.x.value"
        :slides-offset-after="bounding.x.value"
        swiper-slide-class="!w-fit"
        :navigation="false"
        pagination-mt="1rem"
        :space-between="10"
      >
        <template #slide>
          <img
            class="max-h-[645px] object-cover"
            src="https://ucarecdn.com/cf373707-f5c0-4856-b2d1-cb07c0fa4cbb/-/preview/997x1000/"
            :style="{
              width: bounding.width.value + 'px',
            }"
          />
        </template>
      </SlideView>
      <p class="mt-4 container text-primary text-sm font-semibold 2xl:hidden">
        Спортивный силуэт
      </p>
    </div>
  </Section>

  <Section
    sectionTitle="Интерьер"
    align="left"
    class="2xl:grid 2xl:grid-cols-12 2xl:container"
    size="lg"
  >
    <template #title="{ sectionTitle, sectionTitleClass }">
      <div
        class="container 2xl:col-start-2 2xl:col-end-12 2xl:px-0 2xl:grid 2xl:grid-cols-10"
      >
        <h1 :class="sectionTitleClass" class="!mb-0 col-span-4">
          {{ sectionTitle }}
        </h1>
        <p
          class="text-sm text-primary mt-2 md:text-base+ md:mt-3 col-start-7 col-span-4 2xl:mt-0"
        >
          Современный и стильный интерьер, органично дополненный панорамным
          изогнутым монитором, отличается элегантностью, удобством
          и функциональностью планировки.
        </p>
      </div>
    </template>
    <div class="mt-6 2xl:row-start-2 col-start-2 2xl:mt-[100px] col-end-12">
      <img src="https://ucarecdn.com/d130551a-6373-41ac-9c01-0652a3caa014/" />
    </div>
  </Section>

  <Section
    size="lg"
    sectionTitle="Комфортное пространство"
    subtitle="Комфорт"
    align="left"
    class="bg-background 2xl:grid 2xl:grid-cols-12 2xl:container 2xl:rtl"
  >
    <template
      #title="{ sectionTitle, sectionTitleClass, subtitle, subtitleClass }"
    >
      <div class="container 2xl:px-0 col-span-4 col-start-2 ltr">
        <p :class="subtitleClass">{{ subtitle }}</p>
        <h1 :class="sectionTitleClass" class="!mb-0 mt-2 2xl:mt-2.5">
          {{ sectionTitle }}
        </h1>
        <p class="text-sm text-primary mt-4 2xl:mt-7.5">
          Интерьер нового Kia Carnival отличает не только премиальный уровень
          комфорта, но и особое внимание к каждой детали. Поддержка работы
          цифровых устройств и современный интерфейс позволят идти в ногу со
          временем. Удобная информационно-развлекательная система наполнит
          радостью и удовольствием каждое мгновение, проведенное с семьей в
          совместных поездках.
        </p>
        <div
          class="hidden 2xl:block border-t border-t-protection mt-7.5 pt-7.5"
        >
          <div>
            <ul class="space-y-3.5 text-base ml-3.5">
              <li class="font-semibold list-disc">
                Цифровое центральное зеркало (DCM)
              </li>
              <li>Кресло водителя Ergo motion</li>
              <li>Сиденья 2-го ряда с функцией релаксации</li>
              <li>Атмосферная подсветка салона</li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <div class="mt-10 col-start-7 col-span-6 2xl:mt-0 ltr">
      <img
        class="hidden 2xl:block max-h-[645px] object-cover w-full"
        src="https://ucarecdn.com/0c815b00-b55b-4e56-8c31-0ba0734d4cb0/"
      />
      <SlideView
        class="2xl:hidden"
        :data="[1, 2, 3, 4, 5]"
        :slides-offset-before="bounding.x.value"
        :slides-offset-after="bounding.x.value"
        swiper-slide-class="!w-fit"
        :navigation="false"
        pagination-mt="1rem"
        :space-between="10"
      >
        <template #slide>
          <img
            class="max-h-[645px] object-cover"
            src="https://ucarecdn.com/0c815b00-b55b-4e56-8c31-0ba0734d4cb0/"
            :style="{
              width: bounding.width.value + 'px',
            }"
          />
        </template>
      </SlideView>
      <div class="container ltr 2xl:px-0">
        <p class="mt-4 text-primary text-sm font-semibold 2xl:hidden">
          Цифровое центральное зеркало (DCM)
        </p>
        <p
          class="mt-1 text-sm text-primary 2xl:text-center 2xl:mt-6 2xl:max-w-4h 2xl:mx-auto"
        >
          Зеркало переключается между режимами оптического зеркала и дисплея
          камеры, обеспечиваяает превосходный задний обзор при любых условиях.
        </p>
      </div>
    </div>
  </Section>

  <Section
    size="lg"
    sectionTitle="Современные технологии"
    subtitle="Технологии"
    align="left"
    class="2xl:grid 2xl:grid-cols-12 2xl:container"
  >
    <template
      #title="{ sectionTitle, sectionTitleClass, subtitle, subtitleClass }"
    >
      <div class="container 2xl:px-0 col-span-4 col-start-2">
        <p :class="subtitleClass">{{ subtitle }}</p>
        <h1 :class="sectionTitleClass" class="!mb-0 mt-2 2xl:mt-2.5">
          {{ sectionTitle }}
        </h1>
        <p class="text-sm text-primary mt-4 2xl:mt-7.5">
          Передовое оснащение делает управление новым Kia Carnival незабываемым.
          В любом месте и в любой ситуации вы сможете прочувствовать
          бескомпромиссный комфорт и уверенность за рулем благодаря
          усовершенствованным инновационными решениям.
        </p>
        <div
          class="hidden 2xl:block border-t border-t-protection mt-7.5 pt-7.5"
        >
          <div>
            <ul class="space-y-3.5 text-base ml-3.5">
              <li class="font-semibold list-disc">Проекционный дисплей</li>
              <li>Камера кругового обзора</li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <div class="mt-10 col-start-7 col-span-6 2xl:mt-0">
      <img
        class="hidden 2xl:block max-h-[645px] object-cover w-full"
        src="https://ucarecdn.com/7d6bce9e-3286-4fb9-9d5c-3c2fd71e8cb5/"
      />
      <SlideView
        class="2xl:hidden"
        :data="[1, 2, 3, 4, 5]"
        :slides-offset-before="bounding.x.value"
        :slides-offset-after="bounding.x.value"
        swiper-slide-class="!w-fit"
        :navigation="false"
        pagination-mt="1rem"
        :space-between="10"
      >
        <template #slide>
          <img
            class="max-h-[645px] object-cover"
            src="https://ucarecdn.com/7d6bce9e-3286-4fb9-9d5c-3c2fd71e8cb5/"
            :style="{
              width: bounding.width.value + 'px',
            }"
          />
        </template>
      </SlideView>
      <div class="container ltr 2xl:px-0">
        <p
          class="mt-1 text-sm text-primary 2xl:text-center 2xl:mt-6 2xl:max-w-4h 2xl:mx-auto"
        >
          11-дюймовый проекционный дисплей высокой четкости отображает ключевую
          информацию о поездке, считывая данные с приборов и навигационной
          системы. Вы сможете узнать скорость движения, запас хода и данные
          круиз-контроля, не отвлекаясь от дороги.
        </p>
      </div>
    </div>
  </Section>

  <Section
    size="lg"
    sectionTitle="Современные системы помощи водителю"
    subtitle="Помощь водителю"
    align="left"
    class="bg-background 2xl:grid 2xl:grid-cols-12 2xl:container 2xl:rtl"
  >
    <template
      #title="{ sectionTitle, sectionTitleClass, subtitle, subtitleClass }"
    >
      <div class="container 2xl:px-0 col-span-4 col-start-2 ltr">
        <p :class="subtitleClass">{{ subtitle }}</p>
        <h1 :class="sectionTitleClass" class="!mb-0 mt-2 2xl:mt-2.5">
          {{ sectionTitle }}
        </h1>
        <p class="text-sm text-primary mt-4 2xl:mt-7.5">
          Усовершенствованные системы помощи водителю легко адаптируются к
          различным дорожным ситуациям, обеспечивая еще более высокий уровень
          комфорта и безопасности. Передовые технологии снимают даже малейший
          дискомфорт при вождении, помогая расслабиться и получить истинное
          удовольствие от управления кроссвэном премиум-класса.
        </p>
        <div
          class="hidden 2xl:block border-t border-t-protection mt-7.5 pt-7.5"
        >
          <div>
            <ul class="space-y-3.5 text-base ml-3.5">
              <li class="font-semibold list-disc">
                Система предотвращения столкновения при выезде с парковки задним
                ходом (PCA)
              </li>
              <li>Ассистент управления дальним светом (HBA)</li>
              <li>
                Система предотвращения бокового столкновения при выезде с
                парковки задним ходом (RCCA)
              </li>
              <li>Система предотвращения фронтального столкновения (FCA)</li>
              <li>Датчики парковки</li>
              <li>Ассистент движения в полосе (LFA)</li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <div class="mt-10 col-start-7 col-span-6 2xl:mt-0 ltr">
      <img
        class="hidden 2xl:block max-h-[645px] object-cover w-full"
        src="https://ucarecdn.com/10f563ab-ccc9-421a-8f89-f3bd60b98a3f/"
      />
      <SlideView
        class="2xl:hidden"
        :data="[1, 2, 3, 4, 5]"
        :slides-offset-before="bounding.x.value"
        :slides-offset-after="bounding.x.value"
        swiper-slide-class="!w-fit"
        :navigation="false"
        pagination-mt="1rem"
        :space-between="10"
      >
        <template #slide>
          <img
            class="max-h-[645px] object-cover"
            src="https://ucarecdn.com/10f563ab-ccc9-421a-8f89-f3bd60b98a3f/"
            :style="{
              width: bounding.width.value + 'px',
            }"
          />
        </template>
      </SlideView>
      <div class="container ltr 2xl:px-0">
        <p
          class="mt-1 text-sm text-primary 2xl:text-center 2xl:mt-6 2xl:max-w-4h 2xl:mx-auto"
        >
          Если при движении задним ходом возникает опасность столкновения с
          объектом или пешеходом позади вас, система сигнализирует, включая
          предупреждение. Если риск столкновения возрастает даже после
          предупреждения, система задействует экстренное торможение для
          предотвращения столкновения.
        </p>
      </div>
    </div>
  </Section>

  <Section
    sectionTitle="Система пассивной безопасности"
    align="left"
    class="2xl:grid 2xl:grid-cols-12 2xl:container"
    size="lg"
  >
    <template #title="{ sectionTitle, sectionTitleClass }">
      <div
        class="container 2xl:col-start-2 2xl:col-end-12 2xl:px-0 2xl:grid 2xl:grid-cols-10"
      >
        <h1 :class="sectionTitleClass" class="!mb-0 col-span-4">
          {{ sectionTitle }}
        </h1>
        <p
          class="text-sm text-primary mt-2 md:text-base+ md:mt-3 col-start-7 col-span-4 2xl:mt-0"
        >
          Автомобиль оборудован передними, центральными и боковыми подушками
          безопасности. Расширенные подушки защищают водителя и пассажиров
          на передних сиденьях, центральная боковая подушка безопасности первого
          ряда предотвращает столкновение между пассажирами, а шторные подушки
          безопасности чувствительны к опрокидыванию. Отдельная подушка
          предназначена для коленей водителя. В общей сложности салон Kia
          Carnival оборудован восемью подушками безопасности, которые
          обеспечивают дополнительную защиту водителя и пассажиров.
        </p>
      </div>
    </template>
    <div class="mt-6 2xl:row-start-2 col-start-2 2xl:mt-[100px] col-end-12">
      <img src="https://ucarecdn.com/485db143-3963-4e6c-ab7a-878e198953c1/" />
    </div>
  </Section>
</template>
