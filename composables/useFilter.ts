
/**
 * A generic composable for filtering data
 * @template T - The type of items in the data array
 * @template F - The type of filter configuration
 */
export default function useFilteredData<T extends Record<string, any>, F extends Record<string, any>>() {
  const data = ref<T[]>([]) as Ref<T[]>
  const filters = ref<F>({} as F)
  const isLoading = ref<boolean>(false)
  const error = ref<Error | null>(null)

  /**
   * Function to apply a filter configuration to a dataset
   * @param filterFn - Custom filter function that determines if an item passes the filters
   * @returns Computed property with filtered data
   */
  const createFilteredData = (
    filterFn: (item: T, filters: F) => boolean = () => true
  ) => {
    return computed(() => {
      return data.value.filter(item => filterFn(item, filters.value))
    })
  }

  /**
   * Default filtered data using a simple filter function
   * Can be overridden with custom filter logic
   */
  const filteredData = computed(() => {
    if (Object.keys(filters.value).length === 0) {
      return data.value
    }

    return data.value.filter(item => {
      return Object.entries(filters.value).every(([key, value]) => {
        // Skip undefined or null filter values
        if (value === undefined || value === null) return true

        // Handle array filter values (OR logic)
        if (Array.isArray(value) && value.length > 0) {
          // Skip empty arrays
          if (value.length === 0) return true

          // Check if the item's property matches any value in the array
          return value.includes(item[key])
        }

        // Handle boolean filters
        if (typeof value === 'boolean') {
          return item[key] === value
        }

        // Handle string filters (case insensitive search)
        if (typeof value === 'string' && value.trim() !== '') {
          if (typeof item[key] === 'string') {
            return item[key].toLowerCase().includes(value.toLowerCase())
          }
          return String(item[key]).includes(value)
        }

        // Handle numeric range filters
        if (typeof value === 'object' && value !== null) {
          const { min, max } = value as { min?: number; max?: number }
          const itemValue = Number(item[key])

          if (min !== undefined && max !== undefined) {
            return itemValue >= min && itemValue <= max
          }
          if (min !== undefined) {
            return itemValue >= min
          }
          if (max !== undefined) {
            return itemValue <= max
          }
        }

        // Default comparison
        return item[key] === value
      })
    })
  })

  /**
   * Fetch data from an API endpoint
   * @param url - API endpoint URL
   * @param options - Fetch options
   */
  const fetchData = async (url: string, options?: any) => {
    isLoading.value = true
    error.value = null

    try {
      data.value = await $fetch<T[]>(url, options)
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      console.error('Error fetching data:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Set data directly
   * @param newData - Data to set
   */
  const setData = (newData: T[]) => {
    data.value = newData
  }

  /**
   * Update filters
   * @param newFilters - New filter values to merge with existing filters
   */
  const updateFilters = (newFilters: Partial<F>) => {
    filters.value = { ...filters.value, ...newFilters } as F
  }

  /**
   * Reset filters to empty object
   */
  const resetFilters = () => {
    filters.value = {} as F
  }

  /**
   * Apply a specific filter
   * @param key - Filter key
   * @param value - Filter value
   */
  const applyFilter = <K extends keyof F>(key: K, value: F[K]) => {
    filters.value = {
      ...filters.value,
      [key]: value
    } as F
  }


  /**
   * Remove a specific filter
   * @param key - Filter key to remove
   */
  const removeFilter = <K extends keyof F>(key: K) => {
    const newFilters = { ...filters.value }
    delete newFilters[key]
    filters.value = newFilters as F
  }

  return {
    // State
    data,
    filters,
    filteredData,
    isLoading,
    error,

    // Methods
    fetchData,
    setData,
    updateFilters,
    resetFilters,
    applyFilter,
    removeFilter,
    createFilteredData
  }
}
