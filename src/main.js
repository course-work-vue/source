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


// Vuetify
/*
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'
const vuetify = createVuetify({     components:{         ...components,         ...labsComponents     },     directives,  })
*/
const options = {
  // You can set your toast options here
};

createApp(App)
  .use(router)
  .use(store)
  .use(Toast, options)
 // .use(vuetify)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component('Select2', Select2)
  .mount("#app");