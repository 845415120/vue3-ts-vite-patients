import { createApp } from "vue";
import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";
import pinia from "./stores";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(pinia);
app.use(createPinia().use(persist));
app.use(router);

app.mount("#app");
