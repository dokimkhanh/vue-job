import './assets/main.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from './router';
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, fab)
dom.watch();

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon)

app.use(router).use(Toast);
app.mount('#app')