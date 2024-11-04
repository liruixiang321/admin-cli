import { createApp } from "vue";
import App from "./App.vue";
import "./styles/reset.css";
import router from "./router";
import pinia from "./store";
const app = createApp(App).use(router).use(pinia).mount("#app");
