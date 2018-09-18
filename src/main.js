import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router.js";


import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);


// 引用API文件
import api from "./api/http.js";
// 将API方法绑定到全局
Vue.prototype.$api = api;

Vue.config.productionTip = false;


new Vue({
    store,
    router,
  render: h => h(App)
}).$mount("#app");

