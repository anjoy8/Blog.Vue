import Vue from "vue";
import App from "./App.vue";
import router from "./router1.js";
import store from "./store";

// 引用API文件
import api from './http.js'
// 将API方法绑定到全局
Vue.prototype.$api = api


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
