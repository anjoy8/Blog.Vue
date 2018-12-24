import Router from "vue-router";
import store from "./store";
import Vue from "vue";
import Home from "./views/Home.vue";
import FormVuex from "./views/FormVuex.vue";
import Content from "./views/content";
import Login from "./views/Login";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/Vuex",
      name: "Vuex",
      component: FormVuex
    },
    {
      path: "/Content/:id",
      name: "Content",
      component: Content,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Form.vue")
    }
  ]
});

var storeTemp=store;
router.beforeEach((to, from, next) => {
  if (!storeTemp.state.token) {
    storeTemp.commit("saveToken",window.localStorage.Token)
  }
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (storeTemp.state.token) {
      // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;
