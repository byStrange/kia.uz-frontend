export const useSafeArea = (extra?: number) => {
  const defaultHeaderHeight = ref(0)

  onMounted(() => {
    const headerHeight = useCssVar('--header-height')
    if (headerHeight.value) {
      defaultHeaderHeight.value = parseInt(headerHeight.value)
    }
  })

  const paddingTop = computed(() => {
    if (extra) return `${defaultHeaderHeight.value + extra}px`
    return 'var(--header-height)'
  })

  return { paddingTop }
}
