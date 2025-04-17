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
const { locale } = useI18n()

const { data: pageData } = useAsyncData('seo', () => {
  return useFetchApi<SEO>('/pages/~owners~car-info~warning-indicators', locale.value)
})

const indicatorGroups = [
  {
    label: 'warning_indicators.malfunctions',
    description:
      'warning_indicators.danger_warning_take_action',
    indicators: [
      {
        label: 'airbag_warning_indicator',
        content:
          'airbag_warning_indicator_desc',
        icon: UIAirbagIcon,
      },
      {
        label: 'seatbelt_warning_indicator',
        content: 'seatbelt_warning_indicator_desc',
        icon: UISeatBeltIcon,
      },
      {
        label:
          'parking_brake_low_brake_fluid_indicator',
        content: 'parking_brake_low_brake_fluid_indicator_desc',
        icon: UIBrakeIcon,
      },
      {
        label:
          'eps_steering_warning_indicator',
        content: 'eps_steering_warning_indicator_desc',
        icon: UISteeringWheelIcon,
      },
      {
        label: 'charging_system_warning_indicator',
        content: 'charging_system_warning_indicator_desc',
        icon: UIChargingIcon,
      },
      {
        label: 'engine_oil_pressure_warning_indicator',
        content: 'engine_oil_pressure_warning_indicator_desc',
        icon: UIMotorOilIcon,
      },
      {
        label:
          'fuel_filter_warning_indicator_diesel',
        content: 'fuel_filter_warning_indicator_diesel_desc',
        icon: UIFuelFilterIcon,
      },
    ],
  },
  {
    label: 'warning_indicators.warning',
    description:
      'warning_indicators.fault_warning_or_service_action_required',
    indicators: [
      {
        label: 'abs_warning_indicator',
        content: 'abs_warning_indicator_desc',
        icon: UIAntiLockBrakinSystemIcon,
      },
      {
        label: 'general_malfunction_indicator',
        content: 'general_malfunction_indicator_desc',
        icon: UIMalfunctionIndicatorIcon,
      },
      {
        label: 'low_fuel_warning_indicator',
        content: 'low_fuel_warning_indicator_desc',
        icon: UIFuelLevelIcon,
      },
      {
        label: 'tire_pressure_warning_indicator',
        content: 'tire_pressure_warning_indicator_desc',
        icon: UITirePressureIcon,
      },
      {
        label: 'epb_warning_indicator',
        content: 'epb_warning_indicator_desc',
        icon: UIElectronicParkingBrakeIcon,
      },
      {
        label:
          'fca_warning_indicator',
        content: 'fca_warning_indicator_desc',
        icon: UIFCAIcon,
      },
      {
        label: 'all_wheel_drive_indicator',
        content: 'all_wheel_drive_indicator_desc',
        icon: UIAllWheelDriveIcon,
      },
      {
        label: 'emergency_warning_indicator',
        content: 'emergency_warning_indicator_desc',
        icon: UIEmergencyIcon,
      },
      {
        label: 'esc_warning_indicator',
        content: 'esc_warning_indicator_desc',
        icon: UIESCIcon,
      },
      {
        label: 'immobilizer_warning_indicator_no_smart_key',
        content: 'immobilizer_warning_indicator_no_smart_key_desc',
        icon: UIImmobilizerIcon,
      },
      {
        label: 'immobilizer_warning_indicator_smart_key',
        content: 'immobilizer_warning_indicator_smart_key_desc',
        icon: UIImmobilizerIcon,
      },
      {
        label: 'led_headlight_indicator',
        content: 'led_headlight_indicator_desc',
        icon: UILEDSignalIndicator,
      },
      {
        label:
          'glow_plug_indicator_diesel',
        content: 'glow_plug_indicator_diesel_desc',
        icon: UIGlowPlugsIcon,
      },
      {
        label:
          'dpf_warning_indicator_diesel',
        content: 'dpf_warning_indicator_diesel_desc',
        icon: UIDPFIcon,
      },
      {
        label: 'sport_mode_indicator',
        content: 'sport_mode_indicator_desc',
        icon: UISportIcon,
      },
      {
        label: 'auto_hold_indicator',
        icon: UISmartIcon,
        content: 'auto_hold_indicator_desc',
      },
    ],
  },
]


useSeoMeta({
  title: () => pageData.value?.seo.title || '',
  ogTitle: () => pageData.value?.seo.title || '',
  description: () => pageData.value?.seo.description || '',
  ogDescription: () => pageData.value?.seo.description || '',
  keywords: () => pageData.value?.seo.keywords || '',
})
</script>
<template>
  <div class="bg-black">
    <div>
      <picture>
        <source
:srcset="src('dc1cf959-5d73-40f2-989f-0ff684613b16', { preview: '1440x560' })
          " media="(min-width: 1440px)" />

        <source
media="(min-width: 768px)" :srcset="src('393188e3-1559-4ef9-9079-1f1be8106772', { preview: '768x420' })
          " />
        <img
:src="src('ad49fc6a-e846-4096-bacf-3ee441219c46', { preview: '375x260' })
          " class="w-full h-[260px] md:h-full object-cover" alt="" />
      </picture>
      <UIContainer
class="text-white md:absolute md:top-[--safe-area-top] md:w-full py-7.5 md:py-10 2xl:py-0 2xl:pt-6"
        :style="{ '--safe-area-top': paddingTop }">
        <UIDesktopOnly>
          <MoleculeBreadcrumb theme="light" />
        </UIDesktopOnly>

        <div class="space-y-4 md:max-w-[360px] 2xl:mt-2.5">
          <h1 class="text-2xl md:text-4xl 2xl:text-5xl">
            {{ $t('common.warning_indicators') }}
          </h1>
          <p class="text-base+">{{ $t('warning_indicators.vehicle_service_functions_info') }}</p>
        </div>
      </UIContainer>
    </div>

    <div class="2xl:flex 2xl:flex-row-reverse 2xl:mt-1h 2xl:justify-between">
      <UIContainer
        class="py-7.5 flex gap-x-5 overflow-auto 2xl:flex-col 2xl:w-fit 2xl:pl-0 2xl:gap-x-0 2xl:gap-y-3 2xl:mx-0">
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-kia-live-red rounded-full shrink-0"></div>
          <p class="text-sm+ text-caption 2xl:text-base+">{{ $t('warning_indicators.malfunctions') }}</p>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-kia-afternoon-yellow rounded-full shrink-0"></div>
          <p class="text-sm+ text-caption 2xl:text-base+">{{ $t('warning_indicators.warning') }}</p>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-kia-forest-green rounded-full shrink-0"></div>
          <p class="text-sm+ text-caption 2xl:text-base+">{{ $t('warning_indicators.informational') }}</p>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-2 h-2 bg-disabled rounded-full shrink-0"></div>
          <p class="text-sm+ text-caption text-nowrap 2xl:text-wrap 2xl:text-base">{{
            $t('warning_indicators.readiness_indicators') }}</p>
        </div>
      </UIContainer>

      <UIContainer class="text-white py-4 space-y-15 md:space-y-1h 2xl:py-0 2xl:max-w-9h 2xl:mx-0 2xl:pr-0">
        <div v-for="group in indicatorGroups" :key="group.label">
          <div class="space-y-2.5 md:space-y-4">
            <h2 class="text-lg md:text-2xl">{{ $t(group.label) }}</h2>
            <p class="text-caption">{{ $t(group.description) }}</p>
          </div>

          <MoleculeAccordion
:items="group.indicators" :classes="{
            contentContainerExpanded: 'mt-5',
            root: 'mt-9 md:mt-4',
          }">
            <template #header="{ item, toggle, expanded }">
              <div
class="py-5 cursor-pointer flex items-center justify-between w-full gap-4 transition-colors" :class="{
                'border-white border-b-2': expanded,
                'border-description border-b': !expanded,
              }" @click="toggle">
                <div class="flex items-center gap-4.5">
                  <button class="text-kia-live-red" @click="toggle">
                    <component :is="item.icon" />
                  </button>

                  <h2 class="text-base font-semibold text-left select-none">
                    {{ $t('warning_indicators.' + item.label) }}
                  </h2>
                </div>
                <button @click="toggle">
                  <UITickToBottom class="!text-white transition-transform" :class="{ '!rotate-180': expanded }" />
                </button>
              </div>
            </template>
            <template #content="{ content }">
              <p>{{ $t('warning_indicators.' + content) }}</p>
            </template>
          </MoleculeAccordion>
        </div>
      </UIContainer>
    </div>
  </div>
</template>
