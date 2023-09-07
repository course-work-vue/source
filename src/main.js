import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'
import Select2 from 'vue3-select2-component';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


const options = {
  // You can set your toast options here
};

createApp(App)
  .use(router)
  .use(store)
  .use(Toast, options)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component('Select2', Select2)
  .mount("#app");