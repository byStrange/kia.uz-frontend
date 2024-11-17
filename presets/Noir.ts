import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const Noir = definePreset(Aura, {
  semantic: {
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
