import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    //第一种写法, 需要在上面 import 对应文件
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
    //第二种写法, 不需要在上面 import 对应文件.在这里直接引入了
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/register.vue"),
  },
  {
    path: "/person",
    name: "Person",
    component: () => import("@/views/person/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
