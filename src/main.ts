import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "@/assets/main.css";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

// import "primevue/resources/themes/lara-light-indigo/theme.css";
// import "primevue/resources/primevue.min.css";
// import "primeicons/primeicons.css";
const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);
app.use(createPinia());
app.mount("#app");
