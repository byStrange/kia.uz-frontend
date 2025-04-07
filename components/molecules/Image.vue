<template>
  <div class="relative overflow-hidden" :style="containerStyle">
    <!-- Low-resolution background for quick loading -->
    <div v-if="useLowResBackground && !imageLoaded" class="absolute inset-0 w-full h-full">
      <img :src="lowResImageUrl" :alt="alt" class="w-full h-full object-cover transition-opacity" />
    </div>

    <picture class="block w-full h-full">
      <!-- WebP format - highest priority now -->
      <source
v-for="size in sizes" :key="`webp-${size}`" :srcset="generateSrcSet('webp', size)"
        :media="getMediaQuery(size)" type="image/webp" />

      <!-- AVIF format - second priority -->
      <source
v-for="size in sizes" :key="`avif-${size}`" :srcset="generateSrcSet('avif', size)"
        :media="getMediaQuery(size)" type="image/avif" />

      <!-- PNG format - fallback -->
      <source v-for="size in sizes" :key="`png-${size}`" :srcset="generateSrcSet('png', size)" />

      <!-- Fallback image with all attributes passed to the component -->
      <img
:src="defaultImageUrl" :alt="alt" v-bind="$attrs" class="transition-opacity duration-300"
        :class="{ 'opacity-0': !imageLoaded && useLowResBackground }" @load="onImageLoaded" />
    </picture>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Define prop types
interface Props {
  baseUrl: string;
  alt?: string;
  useLowResBackground?: boolean;
  backgroundFormat?: 'avif' | 'webp' | 'png';
  sizes?: Array<string>;
  lowResSize?: string; // Size suffix for low-res placeholder
}

// Props definition with TypeScript
const props = withDefaults(defineProps<Props>(), {
  alt: '',
  useLowResBackground: true,
  backgroundFormat: 'webp',
  sizes: () => ['mid', 'low', ''], // Empty string represents original size
  lowResSize: 'low' // New prop for the low-res image size
})

// Define emits
const emit = defineEmits<{
  ready: [],
  loaded: [],
}>()

// Image loading state
const imageLoaded = ref(false)

// Image loaded handler
const onImageLoaded = () => {
  imageLoaded.value = true
  emit('loaded')
}

// Generate URL for specific size and format
const generateUrl = (size: string, format: string): string => {
  const baseWithoutExt = props.baseUrl.replace(/\.(avif|webp|png|jpg)$/, '')
  const sizeString = size ? `_${size}` : ''
  return `${baseWithoutExt}${sizeString}.${format}`
}

// Generate srcset attribute for specific format and size
const generateSrcSet = (format: string, size: string): string => {
  return generateUrl(size, format)
}

// Get appropriate media query for the size
const getMediaQuery = (size: string): string => {
  switch (size) {
    case 'low':
      return '(max-width: 480px)'
    case 'mid':
      return '(max-width: 1024px)'
    default:
      return '(min-width: 1025px)'
  }
}

// Default image URL (original size, PNG format as fallback)
const defaultImageUrl = computed((): string => {
  return generateUrl('', 'png')
})

// Low resolution image URL for the background
const lowResImageUrl = computed((): string => {
  return generateUrl(props.lowResSize, props.backgroundFormat)
})

// Computed style for container, to allow for custom styles to be merged
const containerStyle = computed(() => {
  return {}
})

// Emit ready event when mounted
onMounted(() => {
  emit('ready')
})
</script>
