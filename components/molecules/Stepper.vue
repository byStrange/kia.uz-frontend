<script setup lang="ts" generic="T">

const activeStep = ref(0)
const { bounding } = useContainer()

const isLastStep = computed(() => {
  return activeStep.value == props.steps.length - 1
})

const handleStepChange = (index: number) => {
  if (index >= props.steps.length) return;

  activeStep.value = index;
}

interface Props {
  steps: T[],
  stepLabelKey?: keyof T
  stepKey?: keyof T
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    <div
class="step-header relative mx-auto max-w-[--max-width] 2xl:pb-10"
      :style="{ '--max-width': bounding.width.value + 'px' }">

      <div class="progress divider border-t border-t-protection absolute content-[''] -z-10 w-full"></div>
      <div class="flex overflow-scroll no-scrollbar">
        <button
v-for="(step, index) in steps" :key="(stepKey ? step[stepKey] : step) as string"
          class="w-1/2 shrink-0 border-t-[3px] border-t-transparent transition-colors pt-4 text-base+ space-x-2 text-caption 2xl:w-2.5h 2xl:text-start"
          :class="{ 'active-step  !border-t-primary !text-primary': activeStep == index }"
          @click="handleStepChange(index)">
          <b>{{ `0${index + 1}` }}</b>
          {{ stepLabelKey ? step[stepLabelKey] : step }}
        </button>
      </div>
    </div>

    <slot name="header-after" :step="steps[activeStep]" />

    <div class="grid 2xl:grid-cols-12 2xl:gap-grid-12-gap 2xl:container 2xl:pt-10">
      <div class="col-span-3">
        <slot name="left-sidebar" :step="steps[activeStep]"></slot>
      </div>
      <div class="col-start-4 col-end-13">
        <slot :name="`step-${activeStep + 1}`" :step="steps[activeStep]" />
      </div>
    </div>

    <div class="flex justify-end sticky bottom-0 bg-white border-t border-t-protection 2xl:py-6 2xl:container">
      <slot name="next-button">
        <AtomButton label="Next" class="w-1/2 2xl:w-3h" @click="handleStepChange(activeStep + 1)" />
      </slot>
    </div>
  </div>
</template>
