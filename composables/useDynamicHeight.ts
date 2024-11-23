export const useDynamicHeight = (
  excludedElements: HTMLElement[] | string[],
) => {
  const height = ref(import.meta.client ? window.innerHeight : 0)

  if (!excludedElements.length) {
    return { height: height, excludedElementsHeight: 0 }
  }

  const excludedElementsHeight = excludedElements
    .map((el) => {
      if (!import.meta.client) return 0
      let offset
      if (typeof el === 'string') {
        return document.querySelector(el)?.getBoundingClientRect().height || 0
      } else {
        offset = el?.offsetHeight
      }
      return offset
    })
    .reduce((a, b) => a + b)

  if (import.meta.client) {
    height.value = window.innerHeight - excludedElementsHeight
  }

  onMounted(() => {
    window.addEventListener('resize', () => {
      height.value = window.innerHeight - excludedElementsHeight
    })
  })

  return { height, excludedElementsHeight }
}
