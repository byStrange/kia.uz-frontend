import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      950: '#05141F',
      900: '#1D2B34',
      800: '#37434C',
      600: '#697279',
      400: '#9BA1A5',
      200: '#CDD0D2',
      100: '#E5E7E8',
      50: '#05141F',
      300: '#05141F',
      500: '#05141F',
      700: '#05141F',
    },
    // suppose we have noir preset
  },
})

export default {
  preset: Noir,
  options: {
    prefix: 'p',
    darkModeSelector: false,
    cssLayer: false,
  },
}
