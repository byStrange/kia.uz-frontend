
<template>
  <div class="relative w-full h-full overflow-hidden" :style="containerStyle">
    <!-- Low-resolution background for quick loading -->
    <div v-if="useLowResBackground && !imageLoaded" class="absolute inset-0 w-full h-full">
      <img 
        :src="getLowResImageUrl()" 
        :alt="alt" 
        class="w-full h-full object-cover"
      />
    </div>
    
    <picture class="block w-full h-full">
      <!-- Desktop Image -->
      <!-- WebP format - highest priority now -->
      <source
        v-if="desktopImage"
        media="(min-width: 1024px)"
        type="image/webp"
        :srcset="getImageUrl(desktopImage, 'webp')"
      />
      <!-- AVIF format - second priority -->
      <source
        v-if="desktopImage"
        media="(min-width: 1024px)"
        type="image/avif"
        :srcset="getImageUrl(desktopImage, 'avif')"
      />
      
      <!-- Tablet Image -->
      <!-- WebP format - highest priority now -->
      <source
        v-if="tabletImage"
        media="(min-width: 640px) and (max-width: 1023px)"
        type="image/webp"
        :srcset="getImageUrl(tabletImage, 'webp')"
      />
      <!-- AVIF format - second priority -->
      <source
        v-if="tabletImage"
        media="(min-width: 640px) and (max-width: 1023px)"
        type="image/avif"
        :srcset="getImageUrl(tabletImage, 'avif')"
      />
      <!-- PNG format - fallback -->
      
      <!-- Mobile/Default Image -->
      <!-- WebP format - highest priority now -->
      <source
        type="image/webp"
        :srcset="getImageUrl(defaultImage, 'webp')"
      />
      <!-- AVIF format - second priority -->
      <source
        type="image/avif"
        :srcset="getImageUrl(defaultImage, 'avif')"
      />
      
      <!-- Fallback image with all attributes passed to the component -->
      <img
        :src="getImageUrl(defaultImage, 'avif')"
        :alt="alt"
        v-bind="$attrs"
        @load="onImageLoaded"
        class="block w-full h-auto relative z-10 transition-opacity duration-300"
        :class="{'opacity-0': !imageLoaded && useLowResBackground}"
      />
    </picture>
  </div>
</template>

<script setup lang="ts">
interface Props {
  defaultImage: string;
  tabletImage?: string;
  desktopImage?: string;
  alt?: string;
  useLowResBackground?: boolean;
  backgroundFormat?: 'avif' | 'webp' | 'png';
  lowResSize?: string; // Size suffix for low-res placeholder
}

// Props definition with TypeScript
const props = withDefaults(defineProps<Props>(), {
  tabletImage: '',
  desktopImage: '',
  alt: '',
  useLowResBackground: true,
  backgroundFormat: 'webp',
  lowResSize: 'low' // New prop for the low-res image size
})

// Define emits
const emit = defineEmits<{
  ready: [],
  loaded: []
}>()

const imageLoaded = ref(false)

const onImageLoaded = () => {
  imageLoaded.value = true
  emit('loaded')
}

/**
 * Gets the URL for an image with the specified format
 * @param baseUrl The base image URL
 * @param format The image format to use (avif, webp, png)
 * @returns Formatted image URL
 */
const getImageUrl = (baseUrl: string, format: string): string => {
  if (!baseUrl) return ''
  
  const baseWithoutExt = baseUrl.replace(/\.(avif|webp|png|jpg|jpeg)$/, '')
  return `${baseWithoutExt}.${format}`
}



/**
 * Gets the URL for a low resolution version of the appropriate image
 * @returns URL for the low resolution image
 */
const getLowResImageUrl = (): string => {
  // Use appropriate image based on current viewport
  // For simplicity, we'll use defaultImage for the low-res background
  // Could be enhanced to use media queries to determine which image to use
  const baseUrl = props.desktopImage
  const baseWithoutExt = baseUrl.replace(/\.(avif|webp|png|jpg|jpeg)$/, '')
  return `${baseWithoutExt}_${props.lowResSize}.${props.backgroundFormat}`
}

// Computed style for container, to allow for custom styles to be merged
const containerStyle = computed(() => {
  return {}
})

// Emit ready event when mounted
onMounted(() => {
  onImageLoaded()
  emit('ready')
})
</script>
