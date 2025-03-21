<template>
  <div class="relative w-full h-full overflow-hidden" :style="containerStyle">
    <picture class="block w-full h-full">
      <!-- Device-specific sources with format prioritization -->
      <!-- Desktop Image -->
      <source
        v-if="desktopImage"
        media="(min-width: 1024px)"
        type="image/avif"
        :srcset="getImageUrl(desktopImage, 'avif')"
      />
      <source
        v-if="desktopImage"
        media="(min-width: 1024px)"
        type="image/webp"
        :srcset="getImageUrl(desktopImage, 'webp')"
      />
      <source
        v-if="desktopImage"
        media="(min-width: 1024px)"
        :srcset="getImageUrl(desktopImage, 'png')"
      />
      
      <!-- Tablet Image -->
      <source
        v-if="tabletImage"
        media="(min-width: 640px) and (max-width: 1023px)"
        type="image/avif"
        :srcset="getImageUrl(tabletImage, 'avif')"
      />
      <source
        v-if="tabletImage"
        media="(min-width: 640px) and (max-width: 1023px)"
        type="image/webp"
        :srcset="getImageUrl(tabletImage, 'webp')"
      />
      <source
        v-if="tabletImage"
        media="(min-width: 640px) and (max-width: 1023px)"
        :srcset="getImageUrl(tabletImage, 'png')"
      />
      
      <!-- Mobile/Default Image -->
      <source
        type="image/avif"
        :srcset="getImageUrl(defaultImage, 'avif')"
      />
      <source
        type="image/webp"
        :srcset="getImageUrl(defaultImage, 'webp')"
      />
      
      <!-- Fallback image with all attributes passed to the component -->
      <img
        :src="getImageUrl(defaultImage, 'png')"
        :alt="alt"
        v-bind="$attrs"
        @load="onImageLoaded"
        class="block w-full h-auto relative z-10 duration-300"
      />
    </picture>
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Define prop types
interface Props {
  defaultImage: string;
  tabletImage?: string;
  desktopImage?: string;
  alt?: string;
  useLowResBackground?: boolean;
  backgroundFormat?: 'avif' | 'webp' | 'png';
}

// Props definition with TypeScript
const props = withDefaults(defineProps<Props>(), {
  tabletImage: '',
  desktopImage: '',
  alt: '',
  useLowResBackground: true,
  backgroundFormat: 'webp'
})

// Define emits
const emit = defineEmits<{
  (e: 'ready'): void;
  (e: 'loaded'): void;
}>()

// Image loading state
const imageLoaded = ref(false)

// Image loaded handler
const onImageLoaded = () => {
  imageLoaded.value = true
  emit('loaded')
}

/**
 * Gets the URL for an image with the specified format
 * @param baseUrl The base image URL
 * @param format The image format to use (avif, webp, png)
 * @param lowRes Whether to use the low resolution version for background
 * @returns Formatted image URL
 */
const getImageUrl = (baseUrl: string, format: string, lowRes: boolean = false): string => {
  if (!baseUrl) return ''
  
  const baseWithoutExt = baseUrl.replace(/\.(avif|webp|png|jpg)$/, '')
  const lowResSuffix = lowRes ? '_low' : ''
  
  return `${baseWithoutExt}${lowResSuffix}.${format}`
}

// Computed style for container, to allow for custom styles to be merged
const containerStyle = computed(() => {
  return {}
})

// Emit ready event when mounted
onMounted(() => {
  emit('ready')
})
</script>
