import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  // 初始化的数据
  state: {
    formDatas: null
  },
  // 改变state里面的值得方法
  mutations: {
    getFormData(state, data) {
      state.formDatas = data;
    }
  }
});
// 输出模块
export default store;

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {}
// });
