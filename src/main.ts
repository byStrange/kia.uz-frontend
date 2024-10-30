import { createApp } from "vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style.css";
import "./assets/transitions.css";
import router from "./router";
import App from "./App.vue";
import { createPinia } from "pinia";
import { i18n } from "./i18n";

const pinia = createPinia();
const app = createApp(App);

app.use(i18n);
app.use(router);

app.use(pinia);

app.mount("#app");
