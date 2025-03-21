<template>
  <div class="relative overflow-hidden" :style="containerStyle">
    <picture class="block w-full h-full">
      <!-- AVIF format - highest priority if supported -->
      <source
        v-for="size in sizes"
        :key="`avif-${size}`"
        :srcset="generateSrcSet('avif', size)"
        :media="getMediaQuery(size)"
        type="image/avif"
      />
      
      <!-- WebP format - second priority -->
      <source
        v-for="size in sizes"
        :key="`webp-${size}`"
        :srcset="generateSrcSet('webp', size)"
        :media="getMediaQuery(size)"
        type="image/webp"
      />
      
      <!-- PNG format - fallback -->
      <source
        v-for="size in sizes"
        :key="`png-${size}`"
        :srcset="generateSrcSet('png', size)"
      />
      
      <!-- Fallback image with all attributes passed to the component -->
      <img
        :src="defaultImageUrl"
        :alt="alt"
        v-bind="$attrs"
        @load="onImageLoaded"
      />
    </picture>
    
    <!-- Low-resolution background for quick loading -->
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
}

// Props definition with TypeScript
const props = withDefaults(defineProps<Props>(), {
  alt: '',
  useLowResBackground: true,
  backgroundFormat: 'webp',
  sizes: () => ['mid', 'low', ''] // Empty string represents original size
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

// Computed style for container, to allow for custom styles to be merged
const containerStyle = computed(() => {
  return {}
})

// Emit ready event when mounted
onMounted(() => {
  emit('ready')
})
</script>
