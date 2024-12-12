<script setup lang="ts">
import {
  UIAirbagIcon,
  UIAllWheelDriveIcon,
  UIAntiLockBrakinSystemIcon,
  UIBrakeIcon,
  UIChargingIcon,
  UIDesktopOnly,
  UIDPFIcon,
  UIElectronicParkingBrakeIcon,
  UIEmergencyIcon,
  UIESCIcon,
  UIFCAIcon,
  UIFuelFilterIcon,
  UIFuelLevelIcon,
  UIGlowPlugsIcon,
  UIImmobilizerIcon,
  UILEDSignalIndicator,
  UIMalfunctionIndicatorIcon,
  UIMotorOilIcon,
  UISeatBeltIcon,
  UISmartIcon,
  UISportIcon,
  UISteeringWheelIcon,
  UITirePressureIcon,
} from '#components'

const { src } = useUploadcareSource()
const { paddingTop } = useSafeArea()

const indicatorGroups = [
  {
    label: 'Неисправности',
    description:
      'Говорят об опасности, стоит обратить внимание на сигнал бортового компьютера, чтобы предпринять меры по быстрому устранению неисправности.',
    indicators: [
      {
        label: 'Сигнальный индикатор подушки безопасности',
        content:
          'Убедитесь, что после запуска двигателя сигнальный индикатор подушки безопасности погас. Если сигнальный индикатор по-прежнему горит, в этом случае рекомендуем обратиться к официальному дилеру Kia.',
        icon: UIAirbagIcon,
      },
      {
        label: 'Сигнальный индикатор непристегнутого ремня безопасности',
        content: '...',
        icon: UISeatBeltIcon,
      },
      {
        label:
          'Сигнальный индикатор включенного стояночного тормоза и низкого уровня тормозной жидкости',
        content: '...',
        icon: UIBrakeIcon,
      },
      {
        label:
          'Сигнальный индикатор рулевого управления с электроусилителем (EPS)',
        content: '...',
        icon: UISteeringWheelIcon,
      },
      {
        label: 'Сигнальный индикатор системы зарядки',
        content: '...',
        icon: UIChargingIcon,
      },
      {
        label: 'Сигнальный индикатор давления моторного масла',
        content: '...',
        icon: UIMotorOilIcon,
      },
      {
        label:
          'Сигнальный индикатор топливного фильтра (для автомобилей с дизельным двигателем)',
        content: '...',
        icon: UIFuelFilterIcon,
      },
    ],
  },
  {
    label: 'Предупреждающие',
    description:
      'Предупреждают о неисправности или необходимости произвести какие-то действия по управлению автомобилем, или его сервисном обслуживании',
    indicators: [
      {
        label: 'Сигнальный индикатор антиблокировочной тормозной системы (ABS)',
        content: '...',
        icon: UIAntiLockBrakinSystemIcon,
      },
      {
        label: 'Сигнальный индикатор неисправности',
        content: '...',
        icon: UIMalfunctionIndicatorIcon,
      },
      {
        label: 'Сигнальный индикатор низкого уровня топлива',
        content: '...',
        icon: UIFuelLevelIcon,
      },
      {
        label: 'Сигнальный индикатор низкого давления в шинах',
        content: '...',
        icon: UITirePressureIcon,
      },
      {
        label: 'Сигнальный индикатор электронного стояночного тормоза (EPB)',
        content: '...',
        icon: UIElectronicParkingBrakeIcon,
      },
      {
        label:
          'Сигнальный индикатор вспомогательной системы предупреждения о лобовом столкновении (FCA)',
        content: '...',
        icon: UIFCAIcon,
      },
      {
        label: 'Сигнальный индикатор полного привода',
        content: '...',
        icon: UIAllWheelDriveIcon,
      },
      {
        label: 'Сигнальный аварийный индикатор',
        content: '...',
        icon: UIEmergencyIcon,
      },
      {
        label: 'Сигнальный индикатор электронного контроля устойчивости (ESC)',
        content: '...',
        icon: UIESCIcon,
      },
      {
        label: 'Сигнальный индикатор иммобилайзера (без смарт-ключа)',
        content: '...',
        icon: UIImmobilizerIcon,
      },
      {
        label: 'Сигнальный индикатор иммобилайзера (со смарт-ключом)',
        content: '...',
        icon: UIImmobilizerIcon,
      },
      {
        label: 'Светодиодный сигнальный индикатор головной фары',
        content: '...',
        icon: UILEDSignalIndicator,
      },
      {
        label:
          'Сигнальный индикатор свечей накаливания (в автомобилях с дизельным двигателем)',
        content: '...',
        icon: UIGlowPlugsIcon,
      },
      {
        label:
          'Сигнальный индикатор выхлопной системы (DPF) (в автомобилях с дизельным двигателем)',
        content: '...',
        icon: UIDPFIcon,
      },
      {
        label: 'Сигнальный индикатор спортивного режима (SPORT)',
        icon: UISportIcon,
        content: '...',
      },
      {
        label: 'Сигнальный индикатор удержания автомобиля AUTO HOLD',
        icon: UISmartIcon,
        content: '..',
      },
    ],
  },
]
</script>
<template>
  <div class="bg-black">
    <div>
      <picture>
        <source
          :srcset="
            src('dc1cf959-5d73-40f2-989f-0ff684613b16', { preview: '1440x560' })
          "
          media="(min-width: 1440px)"
        />

        <source
          media="(min-width: 768px)"
          :srcset="
            src('393188e3-1559-4ef9-9079-1f1be8106772', { preview: '768x420' })
          "
        />
        <img
          :src="
            src('ad49fc6a-e846-4096-bacf-3ee441219c46', { preview: '375x260' })
          "
          class="w-full h-[260px] md:h-full object-cover"
          alt=""
        />
      </picture>
      <UIContainer
        class="text-white md:absolute md:top-[--safe-area-top] md:w-full py-7.5 md:py-10 2xl:py-0 2xl:pt-6"
        :style="{ '--safe-area-top': paddingTop }"
      >
        <UIDesktopOnly>
          <UIBreadcrumb theme="light" />
        </UIDesktopOnly>

        <div class="space-y-4 md:max-w-[360px] 2xl:mt-2.5">
          <h1 class="text-2xl md:text-4xl 2xl:text-5xl">
            Предупреждающие индикаторы
          </h1>
          <p class="text-base+">
            Информируют о сервисных функциях автомобиля и их активности.
          </p>
        </div>
      </UIContainer>
    </div>

    <div class="2xl:flex 2xl:flex-row-reverse 2xl:mt-1h 2xl:justify-between">
      <UIContainer
        class="py-7.5 flex gap-x-5 overflow-auto 2xl:flex-col 2xl:w-fit 2xl:pl-0 2xl:gap-x-0 2xl:gap-y-3 2xl:mx-0"
      >
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-kia-live-red rounded-full shrink-0"></div>
          <p class="text-sm+ text-caption 2xl:text-base+">Неисправности</p>
        </div>
        <div class="flex gap-2 items-center">
          <div
            class="w-2 h-2 bg-kia-afternoon-yellow rounded-full shrink-0"
          ></div>
          <p class="text-sm+ text-caption 2xl:text-base+">Предупреждающие</p>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-kia-forest-green rounded-full shrink-0"></div>
          <p class="text-sm+ text-caption 2xl:text-base+">Информационные</p>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-disabled rounded-full shrink-0"></div>
          <p
            class="text-sm+ text-caption text-nowrap 2xl:text-wrap 2xl:text-base"
          >
            Индикаторы готовности
          </p>
        </div>
      </UIContainer>

      <UIContainer
        class="text-white py-4 space-y-15 md:space-y-1h 2xl:py-0 2xl:max-w-9h 2xl:mx-0 2xl:pr-0"
      >
        <div v-for="group in indicatorGroups" :key="group.label">
          <div class="space-y-2.5 md:space-y-4">
            <h2 class="text-lg md:text-2xl">{{ group.label }}</h2>
            <p class="text-caption">{{ group.description }}</p>
          </div>

          <UIAccordion
            :items="group.indicators"
            :classes="{
              contentContainerExpanded: 'mt-5',
              root: 'mt-9 md:mt-4',
            }"
          >
            <template #header="{ item, toggle, expanded }">
              <div
                class="py-5 cursor-pointer flex items-center justify-between w-full gap-4 transition-colors"
                :class="{
                  'border-white border-b-2': expanded,
                  'border-description border-b': !expanded,
                }"
                @click="toggle"
              >
                <div class="flex items-center gap-4.5">
                  <button class="text-kia-live-red" @click="toggle" >
                    <component :is="item.icon" />
                  </button>

                  <h2 class="text-base font-semibold text-left select-none">
                    {{ item.label }}
                  </h2>
                </div>
                <button @click="toggle">
                  <UITickToBottom class="!text-white transition-transform" :class="{ '!rotate-180': expanded }" />
                </button>
              </div>
            </template>
          </UIAccordion>
        </div>
      </UIContainer>
    </div>
  </div>
</template>
