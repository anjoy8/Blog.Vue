import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import FormVuex from "./views/FormVuex.vue";
import Content from "./views/content";
import Login from "./views/Login";
import store from "./store";


Vue.use(Router);

console.log(store);


const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: "/Vuex",
      name: "Vuex",
      component: FormVuex
    },
    {
      path: "/Content/:id",
      name: "Content",
      component: Content
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

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (window.localStorage.Token&&window.localStorage.Token.length>=128) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})

export default router;



