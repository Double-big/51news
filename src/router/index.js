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
  {
    path: "/collect",
    name: "Collect",
    component: () => import("@/views/person/collect.vue"),
  },
  {
    // 动态路由匹配:
    path: "/postdetails/:id",
    // path: "/postdetails",
    name: "postDetails",
    component: () => import("@/views/postDetails.vue"),
  },
  {
    // 动态路由匹配:
    path: "/morecomment/:id",
    name: "moreComment",
    component: () => import("@/views/moreComment.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/search.vue"),
  },
  {
    path: "/mycomment",
    name: "myComment",
    component: () => import("@/views/person/myComment.vue"),
  },
  
];

const router = new VueRouter({
  routes,
});

export default router;
