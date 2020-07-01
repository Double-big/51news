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
  {
    path: "/editperson",
    name: "EditPerson",
    component: () => import("@/views/person/edit.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/Test.vue"),
  },
  {
    path: "/follows",
    name: "Follows",
    component: () => import("@/views/person/follow.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
