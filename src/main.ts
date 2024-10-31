import { createApp } from 'vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.css';
import './assets/transitions.css';

import router from './router';
import App from './App.vue';
import { createPinia } from 'pinia';
import { i18n } from './i18n';

import PrimeVue from 'primevue/config';
import Noir from './presets/Noir';

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
