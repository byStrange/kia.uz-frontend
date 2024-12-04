const container = ref<HTMLElement | null>(null)
const containerInner = ref<HTMLElement | null>(null)

if (import.meta.client) {
  container.value = document.createElement('div')
  containerInner.value = document.createElement('div')

  containerInner.value.style.width = '100%'

  container.value.appendChild(containerInner.value)
  container.value.classList.add('container')
  container.value.style.zIndex = '-99'
  document.body.appendChild(container.value)
}

export const useContainer = () => {
  const bounding = useElementBounding(containerInner)
  const offset = useOffset(containerInner.value)

  return {
    container,
    offset,
    bounding,
  }
}
