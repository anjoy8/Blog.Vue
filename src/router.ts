import Router from "vue-router";
import store from "./store";
import Vue from "vue";
import Home from "./views/Home.vue";
import FormVuex from "./views/FormVuex.vue";
import Content from "./views/content.vue";
import Login from "./views/Login.vue";
import LoginCallbackView from "./views/LoginCallbackView.vue";
import Editor from "./views/Editor.vue";

import applicationUserManager from "./Auth/applicationusermanager";

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
      path: "/Editor",
      name: "Editor",
      component: Editor
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
      path: "/callback",
      name: "LoginCallbackView",
      component: LoginCallbackView
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Form.vue")
    },
    {
      path: "/home2",
      name: "home2",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Home2.vue")
    }
  ]
});

var storeTemp = store;
router.beforeEach((to, from, next) => {
  if (!storeTemp.state.token) {
    storeTemp.commit("saveToken", window.localStorage.Token);
  }
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (storeTemp.state.token) {
      // 通过vuex state获取当前的token是否存在
      next();
    } else {
      //这里使用Id4授权认证，用Jwt，请删之，并把下边的跳转login 打开；
      applicationUserManager.login();

      //这里使用Jwt登录，如果不用Id4授权认证，这里打开它；
      // next({
      //   path: "/login",
      //   query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      // });
    }
  } else {
    next();
  }
});

export default router;
