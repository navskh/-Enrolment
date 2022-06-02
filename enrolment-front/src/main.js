import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { router } from "./router/index.js";
import axios from "axios";
import vuex from "vuex";

Vue.use(vuex);

import { store1 } from "./store/store";

const store = store1;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
