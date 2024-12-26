<script setup lang="ts">
interface Props {
  fillEmptyCells: boolean
  minDate: Date
  maxDate: Date
  disabledDates: Date[]
  weekLabels: string[]
}

const currentDate = defineModel<null | undefined | CalendarDay>();

const { fillEmptyCells, minDate, maxDate, weekLabels } = withDefaults(defineProps<Partial<Props>>(), {
  fillEmptyCells: false,
  minDate: () => getYesterday(),
  maxDate: () => getDateInFuture(15),
  weekLabels: () => ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
})

const calendar = useCalendar({ fillEmptyCells, minDate, maxDate })

const emit = defineEmits<{ dayChange: [day: CalendarDay] }>();

const changeDay = (day: CalendarDay) => {
  calendar.changeCurrentDate(day);
  currentDate.value = day;
  emit("dayChange", day)
}

onMounted(() => {
  if (currentDate.value) {
    calendar.changeCurrentDate(currentDate.value)
  }
})

defineExpose({
  calendar
})
</script>
<template>
  <div class="calendar-container border border-protection bg-white w-full overflow-auto">
    <div class="header px-5 py-4 bg-background">
      <div class="controls flex items-center justify-between">
        <button @click="calendar.prevMonth">
          <UITickToLeft class="size-5" />
        </button>
        <span class="text-sm+ font-semibold">
          {{ calendar.currentMonth.value }}
        </span>
        <button @click="calendar.nextMonth">
          <UITickToRight class="size-5" />
        </button>
      </div>
      <div class="weeks mt-4 grid grid-cols-7 gap-6">
        <div v-for="week in weekLabels" class="week-cell text-disabled">
          {{ week }}
        </div>
      </div>
    </div>
    <div class="body px-5 pt-4 pb-6">
      <div class="grid grid-cols-7 gap-6">
        <template v-for="(date, index) in calendar.monthDays.value">
          <div v-if="!(index > 15 && date.isEmpty)" @click="changeDay(date)"
            class="day-cell relative after:rounded-full after:z-10 rounded-full flex items-center justify-center cursor-pointer after:size-7.5 after:absolute after:content-[''] after:bg-transparent after:transition-colors"
            :class="{
              'after:!bg-primary !text-white': !date.isDisabled && calendar.isCurrentDate(date),
              '!text-disabled': date.isDisabled
            }">
            <span class="z-20 relative">{{ date.day }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
