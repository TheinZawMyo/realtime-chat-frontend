import "./tailwind.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/route";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);


app.use(router).use(Toast).use(pinia).mount("#app");
