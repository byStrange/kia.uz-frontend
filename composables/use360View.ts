interface CarViewerBaseOptions {
  /**
   * Initial image index to show
   * @default 0
   */
  initialIndex?: number
  /**
   * Whether to preload images before mounting
   * @default false
   */
  preloadBeforeMount?: boolean
  /**
   * Sensitivity of the rotation (lower = more sensitive)
   * @default 5
   */
  sensitivity?: number
  /**
   * Inertia factor for smooth rotation
   * @default 0.95
   */
  inertia?: number
  /**
   * Reverse the rotation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Enable auto-rotation
   * @default false
   */
  autoRotate?: boolean
  /**
   * Auto-rotation speed in ms per frame
   * @default 100
   */
  autoRotateSpeed?: number
}

interface CarViewerArrayOptions extends CarViewerBaseOptions {
  /**
   * Array of image URLs for different angles
   */
  images: string[]
}

interface CarViewerDirectoryOptions extends CarViewerBaseOptions {
  /**
   * Base URL for the image directory
   */
  images: string
  /**
   * Total number of images available
   */
  totalImages: number
  /**
   * Image filename prefix (default: '')
   */
  prefix?: string
  /**
   * Image filename suffix (default: '')
   */
  suffix?: string
  /**
   * Number of digits to pad the image index (default: 1)
   * @example if padding is 3, indices will be formatted as 001, 002, etc.
   */
  padding?: number
  /**
   * File extension (default: 'jpg')
   */
  extension?: string
}

type CarViewerOptions = CarViewerArrayOptions | CarViewerDirectoryOptions

interface CarViewerState {
  currentIndex: number
  isLoading: boolean
  isDragging: boolean
  progress: number
  velocity: number
  direction: 'left' | 'right' | null
}

const isDirectoryOptions = (
  options: CarViewerOptions
): options is CarViewerDirectoryOptions => {
  return typeof options.images === 'string'
}

export const use360View = (
  rootRef: Ref<HTMLElement | null>,
  options: CarViewerOptions
) => {
  // Normalize options with defaults
  const {
    initialIndex = 0,
    preloadBeforeMount = false,
    sensitivity = 5,
    inertia = 0.95,
    reverse = false,
    autoRotate = false,
    autoRotateSpeed = 100
  } = options

  // Additional defaults for directory-based loading
  const directoryDefaults = {
    prefix: '',
    suffix: '',
    padding: 1,
    extension: 'jpg'
  }

  // State
  const state = ref<CarViewerState>({
    currentIndex: initialIndex,
    isLoading: true,
    isDragging: false,
    progress: 0,
    velocity: 0,
    direction: null
  })

  // Cached values
  const loadedImages = ref<HTMLImageElement[]>([])
  const startX = ref<number>(0)
  const lastX = ref<number>(0)
  const autoRotateInterval = ref<NodeJS.Timeout | null>(null)

  // Generate image URLs based on options
  const imageUrls = computed(() => {
    if (!isDirectoryOptions(options)) {
      return options.images
    }

    const {
      images: baseUrl,
      totalImages,
      prefix = directoryDefaults.prefix,
      suffix = directoryDefaults.suffix,
      padding = directoryDefaults.padding,
      extension = directoryDefaults.extension
    } = options

    return Array.from({ length: totalImages }, (_, index) => {
      const paddedIndex = index.toString().padStart(padding, '0')
      const filename = `${prefix}${+paddedIndex + 1}${suffix}.${extension}`
      // Ensure the base URL ends with a slash
      const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
      return `${normalizedBaseUrl}${filename}`
    })
  })

  // Computed values
  const currentSrc = computed(() => loadedImages.value[state.value.currentIndex]?.src || '')
  const totalImages = computed(() => imageUrls.value.length)

  // Methods
  const preloadImages = async () => {
    state.value.isLoading = true

    const loadPromises = imageUrls.value.map(url => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image()
        img.src = url
        img.onload = () => resolve(img)
        img.onerror = (e) => {
          console.error(`Failed to load image: ${url}`, e)
          reject(e)
        }
      })
    })

    try {
      loadedImages.value = await Promise.all(loadPromises)
      state.value.isLoading = false
    } catch (error) {
      console.error('Failed to preload images:', error)
      state.value.isLoading = false
    }
  }

  const updateIndex = (deltaX: number) => {
    console.log('i should be moving')

    const movement = deltaX / sensitivity
    const total = totalImages.value

    let newIndex = state.value.currentIndex
    const direction = reverse ? -1 : 1

    newIndex -= Math.floor(movement) * direction


    console.log('deltaX:', deltaX, 'sensitivity:', sensitivity, 'movement:', movement);
    // Normalize index to stay within bounds
    while (newIndex < 0) newIndex += total
    while (newIndex >= total) newIndex -= total

    state.value.currentIndex = newIndex
    state.value.direction = deltaX > 0 ? 'left' : 'right'
    console.log(state.value.currentIndex)
  }

  const handleDragStart = (x: number) => {
    state.value.isDragging = true
    startX.value = x
    lastX.value = x
    state.value.velocity = 0

    if (autoRotateInterval.value) {
      clearInterval(autoRotateInterval.value)
    }
  }

  const handleDragMove = (x: number) => {
    if (!state.value.isDragging) return

    const deltaX = x - lastX.value
    updateIndex(deltaX)

    state.value.velocity = deltaX
    lastX.value = x
  }

  const handleDragEnd = () => {
    state.value.isDragging = false

    if (autoRotate) {
      startAutoRotate()
    }
  }

  const applyInertia = () => {
    if (Math.abs(state.value.velocity) > 0.1) {
      updateIndex(state.value.velocity)
      state.value.velocity *= inertia
      requestAnimationFrame(applyInertia)
    } else {
      state.value.velocity = 0
      state.value.direction = null
    }
  }

  const startAutoRotate = () => {
    console.log('atutor')
    if (autoRotateInterval.value) {
      clearInterval(autoRotateInterval.value)
    }
    console.log('hi')

    autoRotateInterval.value = setInterval(() => {
      updateIndex(reverse ? -1 : 1)
    }, autoRotateSpeed)
  }

  // Event handlers
  const setupEvents = () => {
    const element = rootRef.value

    if (!(element instanceof HTMLElement)) return

    // Mouse events
    element.addEventListener('mousedown', (e) => {
      handleDragStart(e.clientX)
    })

    window.addEventListener('mousemove', (e) => {
      handleDragMove(e.clientX)
    })

    window.addEventListener('mouseup', () => {
      handleDragEnd()
      applyInertia()
    })

    // Touch events
    element.addEventListener('touchstart', (e) => {
      handleDragStart(e.touches[0].clientX)
    })

    element.addEventListener('touchmove', (e) => {
      handleDragMove(e.touches[0].clientX)
    })

    element.addEventListener('touchend', () => {
      handleDragEnd()
      applyInertia()
    })
  }

  // Lifecycle
  onMounted(async () => {
    if (preloadBeforeMount) {
      await preloadImages()
    }
    setupEvents()
    if (autoRotate) {
      startAutoRotate()
    }
  })

  // Watch for option changes
  watch(() => options.autoRotate, (newValue) => {
    if (newValue) {
      startAutoRotate()
    } else if (autoRotateInterval.value) {
      clearInterval(autoRotateInterval.value)
    }
  })

  // Cleanup
  onUnmounted(() => {
    if (autoRotateInterval.value) {
      clearInterval(autoRotateInterval.value)
    }
  })

  return {
    ...toRefs(state),
    currentSrc,
    preloadImages,
    loadedImages,
    totalImages
  }
}
