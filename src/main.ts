import { createApp } from 'vue';

import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import App from './App.vue';
import './assets/transitions.css';
import { i18n } from './i18n';
import Noir from './presets/Noir';
import router from './router';
import './style.css';

const pinia = createPinia();
const app = createApp(App);

app.use(i18n);

app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark',
      cssLayer: false,
    },
  },
});

app.use(router);

app.use(pinia);

app.mount('#app');
