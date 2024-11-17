export function useOffset(element: HTMLElement | undefined | null) {
  const offsetLeft = ref(0)
  const offsetTop = ref(0)

  const updateOffsetLeft = () => {
    if (element) {
      offsetLeft.value = element.offsetLeft
      offsetTop.value = element.offsetTop
    }
  }

  if (!element) {
    return { offsetLeft, offsetTop }
  }

  onMounted(() => {
    updateOffsetLeft()
    const observer = new MutationObserver(updateOffsetLeft)

    observer.observe(element, {
      attributes: true,
      childList: true,
      subtree: true,
    })

    window.addEventListener('resize', updateOffsetLeft)

    onBeforeUnmount(() => {
      observer.disconnect()
      window.removeEventListener('resize', updateOffsetLeft)
    })
  })

  return { offsetLeft, offsetTop }
}
