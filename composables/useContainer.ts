const container = ref<HTMLElement | null>(null)
const test = ref<HTMLElement | null>(null)

if (import.meta.client) {
  container.value = document.createElement('div')
  test.value = document.createElement('div')

  test.value.style.width = '100%'

  container.value.appendChild(test.value)
  container.value.classList.add('container')
  container.value.style.zIndex = '-99'
  document.body.appendChild(container.value)
}

export const useContainer = () => {
  const bounding = useElementBounding(test)
  const offset = useOffset(test.value)

  return {
    container,
    offset,
    bounding,
  }
}
