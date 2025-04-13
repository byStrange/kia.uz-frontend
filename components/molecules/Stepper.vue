<script setup lang="ts" generic="T">

const activeStep = ref(0)
const { bounding } = useContainer()
const stepElements = useTemplateRef('step')

const isLastStep = computed(() => {
  return activeStep.value == props.steps.length - 1
})

const prevStep = () => {
  if (!props.validateBack) handleStepChange(activeStep.value - 1)

  if (props.validateBack && props.validateBack(props.steps[activeStep.value])) {
    handleStepChange(activeStep.value - 1)
  }
}

const handleStepChange = (index: number) => {
  if (index >= props.steps.length || index < 0) return;

  activeStep.value = index;

  if (stepElements.value) {
    const element = stepElements.value[activeStep.value];
    if (element.scrollIntoView) element.scrollIntoView()
  }
}

const nextStep = () => {
  handleStepChange(activeStep.value + 1)
}

interface Props {
  steps: T[],
  stepLabelKey?: keyof T
  stepKey?: keyof T,
  validateDone?: (step: T, fromTemplate?: boolean) => boolean,
  validateBack?: (step: T) => boolean
}

const props = defineProps<Props>()

defineExpose({ nextStep })
</script>

<template>
  <div>
    <div
class="step-header relative mx-auto max-w-[--max-width] 2xl:pb-10"
      :style="{ '--max-width': bounding.width.value + 'px' }">

      <div class="progress divider border-t border-t-protection absolute content-[''] -z-10 w-full"></div>
      <div class="flex overflow-scroll no-scrollbar">
        <div
v-for="(step, index) in steps" ref="step" :key="(stepKey ? step[stepKey] : step) as string"
          class="w-1/2 shrink-0 border-t-[3px] border-t-transparent transition-colors pt-4 text-base+ space-x-2 text-caption 2xl:flex-1 2xl:text-start"
          :class="{ '!border-t-primary !text-primary': activeStep == index, '!border-t-forest-green': validateDone ? validateDone(step, true) : false }">
          <b>{{ `0${index + 1}` }}</b>
          {{ stepLabelKey ? step[stepLabelKey] : step }}
        </div>
      </div>
    </div>

    <slot name="header-after" :step="steps[activeStep]" />

    <div class="2xl:grid 2xl:grid-cols-12 2xl:gap-grid-12-gap 2xl:container 2xl:pt-10">
      <div class="col-span-3 hidden 2xl:block">
        <slot name="left-sidebar" :step="steps[activeStep]"></slot>
      </div>
      <div class="col-start-4 col-end-13">
        <Transition name="blur-fade" mode="out-in">
          <slot :name="`step-${activeStep + 1}`" :step="steps[activeStep]" :next-step />
        </Transition>
      </div>
    </div>

    <div
      class="flex justify-between sticky bottom-0 bg-white border-t border-t-protection 2xl:py-6 2xl:container items-center">
      <p class="text-sm text-caption max-w-6.5h hidden 2xl:block">Стоимость носит исключительно информационный характер.
        Общая сумма рассчитывается индивидуально в дилерском центре.</p>
      <div class="flex 2xl:gap-x-6 flex-1 2xl:flex-none">
        <button
v-if="activeStep != 0" class="w-1/2 flex items-center text-base justify-center 2xl:w-auto"
          @click="prevStep">
          <UITickToLeft class="size-5" />
          <span>Назад</span>
        </button>
        <AtomButton
label="Next" class="w-1/2 2xl:w-3h"
          @click="validateDone(steps[activeStep]) ? handleStepChange(activeStep + 1) : () => { }" />
      </div>
    </div>
  </div>
</template>
