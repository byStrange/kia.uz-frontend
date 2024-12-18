// Types to define the structure of our calendar
export interface CalendarDay {
  date: Date | null  // Allow null for empty cells
  day: number | null  // Allow null for empty cells
  month: number | null  // Allow null for empty cells
  year: number | null  // Allow null for empty cells
  isCurrentMonth: boolean
  isDisabled: boolean
  isEmpty: boolean  // New flag to identify empty cells
}

export interface CalendarOptions {
  // Optional configuration for disabling specific dates, months, or years
  disabledDates?: Date[]
  disabledMonths?: number[]
  disabledYears?: number[]
  minDate?: Date
  maxDate?: Date

  // New option to control grid filling behavior
  fillEmptyCells?: boolean
}

export function useCalendar(options: CalendarOptions = {}) {
  // Default filling behavior to true if not specified
  const fillEmptyCells = options.fillEmptyCells ?? true

  // Current selected date
  const currentDate = ref(new Date())

  // List of available months (0-11)
  const months = computed(() => [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ])

  // List of available years (configurable range)
  const years = computed(() => {
    const currentYear = new Date().getFullYear()
    const startYear = options.minDate?.getFullYear() || currentYear - 10
    const endYear = options.maxDate?.getFullYear() || currentYear + 10
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    )
  })

  // Change current month
  function changeMonth(month: number) {
    if (options.disabledMonths?.includes(month)) return

    const newDate = new Date(currentDate.value)
    newDate.setMonth(month)
    currentDate.value = newDate
  }

  // Navigate to previous month
  function prevMonth() {
    const newDate = new Date(currentDate.value)
    newDate.setMonth(newDate.getMonth() - 1)

    // Check if the new month is disabled
    if (!options.disabledMonths?.includes(newDate.getMonth())) {
      currentDate.value = newDate
    }
  }

  // Navigate to next month
  function nextMonth() {
    const newDate = new Date(currentDate.value)
    newDate.setMonth(newDate.getMonth() + 1)

    // Check if the new month is disabled
    if (!options.disabledMonths?.includes(newDate.getMonth())) {
      currentDate.value = newDate
    }
  }

  // Change current year
  function changeYear(year: number) {
    if (options.disabledYears?.includes(year)) return

    const newDate = new Date(currentDate.value)
    newDate.setFullYear(year)
    currentDate.value = newDate
  }

  // Determine if a specific date is disabled
  function isDateDisabled(date: Date): boolean {
    // Check against explicitly disabled dates
    if (options.disabledDates?.some(d => d.toDateString() === date.toDateString())) {
      return true
    }

    // Check against min and max date
    if (options.minDate && date < options.minDate) return true
    if (options.maxDate && date > options.maxDate) return true

    // Check against disabled months and years
    if (options.disabledMonths?.includes(date.getMonth())) return true
    if (options.disabledYears?.includes(date.getFullYear())) return true

    return false
  }

  // Generate days for the current month, including days from previous and next months
  const monthDays = computed((): CalendarDay[] => {
    const days: CalendarDay[] = []
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()

    // First day of the current month
    const firstDay = new Date(year, month, 1)
    // Last day of the current month
    const lastDay = new Date(year, month + 1, 0)

    // Determine how many days from the previous month to show
    const startingDayOfWeek = firstDay.getDay() // 0 (Sunday) to 6 (Saturday)

    // Fill in days from previous month or empty cells
    for (let i = 0; i < startingDayOfWeek; i++) {
      if (fillEmptyCells) {
        // Fill with previous month's dates
        const prevMonthDate = new Date(year, month, -startingDayOfWeek + i + 1)
        days.push({
          date: prevMonthDate,
          day: prevMonthDate.getDate(),
          month: prevMonthDate.getMonth(),
          year: prevMonthDate.getFullYear(),
          isCurrentMonth: false,
          isDisabled: isDateDisabled(prevMonthDate),
          isEmpty: false
        })
      } else {
        // Create an empty cell
        days.push({
          date: null,
          day: null,
          month: null,
          year: null,
          isCurrentMonth: false,
          isDisabled: false,
          isEmpty: true
        })
      }
    }

    // Fill in days of current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day)
      days.push({
        date,
        day,
        month,
        year,
        isCurrentMonth: true,
        isDisabled: isDateDisabled(date),
        isEmpty: false
      })
    }

    // Fill in days from next month to complete the grid (6 rows of 7 days)
    const totalDaysToShow = 42 // 6 weeks * 7 days
    const currentDaysCount = days.length
    for (let i = 1; i <= totalDaysToShow - currentDaysCount; i++) {
      if (fillEmptyCells) {
        // Fill with next month's dates
        const nextMonthDate = new Date(year, month + 1, i)
        days.push({
          date: nextMonthDate,
          day: i,
          month: nextMonthDate.getMonth(),
          year: nextMonthDate.getFullYear(),
          isCurrentMonth: false,
          isDisabled: isDateDisabled(nextMonthDate),
          isEmpty: false
        })
      } else {
        // Create an empty cell
        days.push({
          date: null,
          day: null,
          month: null,
          year: null,
          isCurrentMonth: false,
          isDisabled: false,
          isEmpty: true
        })
      }
    }

    return days
  })

  // Get weeks for the current month
  const weeks = computed(() => {
    const weeksArray: CalendarDay[][] = []
    for (let i = 0; i < 6; i++) {
      weeksArray.push(monthDays.value.slice(i * 7, (i + 1) * 7))
    }
    return weeksArray
  })

  const currentMonth = computed(() => {
    return months.value[currentDate.value.getMonth()];
  })

  // set the current date
  const changeCurrentDate = (date: CalendarDay) => {
    if (date.isEmpty || date.isDisabled || !date.date) {
      return;
    }

    currentDate.value = date.date;
  }

  // checks if the given date is current selecte date
  const isCurrentDate = (date: CalendarDay) => {
    if (!currentDate.value) return false;

    if (!date.date || date.isDisabled || date.isEmpty) return false;

    return date.date.toDateString() == currentDate.value.toDateString()
  }

  return {
    // Reactive state
    currentDate,
    currentMonth,
    changeCurrentDate,
    isCurrentDate,

    // Month-related methods and data
    months,
    changeMonth,
    prevMonth,
    nextMonth,

    // Year-related methods and data
    years,
    changeYear,

    // Days and weeks
    monthDays,
    weeks,

    // Utility methods
    isDateDisabled
  }
}
