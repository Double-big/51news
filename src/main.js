import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//引入 vant-ui 组件库并配置
// 全局引入,引入所有组件
import Vant from "vant";
Vue.use(Vant);
//引入vant  CSS样式
import "vant/lib/index.css";

//引入axios库
import axios from "axios";
// 绑定到原型
Vue.prototype.$axios = axios;

//引入单个组件
import { Toast } from "vant";
Vue.use(Toast);


//设置基准路径
//远程地址
// axios.defaults.baseURL = "http://liangwei.tech:3000";
axios.defaults.baseURL = "http://157.122.54.189:9083";

// 本地地址
// axios.defaults.baseURL = "http://127.0.0.1:3000";
// 设置请求拦截
axios.interceptors.request.use((config) => {
  //如果本地有token, 请求里面没有token
  if (localStorage.getItem("token") && !config.headers.Authorization) {
    //则把本地的token赋值到请求中
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  }
  //必须返回
  return config;
});
//创建响应拦截器-----抽离了登录页和注册页中请求错误的逻辑
axios.interceptors.response.use((res) => {
  // console.log("拦截了响应");
  //必须return res ,整个请求才能进行下去
  // console.log(res.data);
  const { statusCode, message } = res.data;
  const errorRegExp = /^4\d\d$/;

  if (statusCode && errorRegExp.test(statusCode)) {
    Toast.fail(message || "系统错误");

    if (message === "用户信息验证失败") {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");

      return router.push("/login");
    }
  }

  return res;
});

//创建全局前置路由守卫----用于页面权限的控制
router.beforeEach((to, from, next) => {
  // console.log('拦截了响应');
  const token = localStorage.getItem("token");
  // console.log(to);
  // console.log(from);
  const PageNeed = ["/person", "/editperson"];
  //把所有路由跳转的路径存到一个数组中, 当索引值大于  -1  则存在, 小于 -1  则不存在
  //设置访问权限
  if (PageNeed.indexOf(to.path) > -1 && !token) {
    //跳转到个人中心页没有token则跳转到登录页
    // return router.replace("/login");
    return router.push("/login");
  } else {
    //跳转到个人中心页时有token则放行
    return next();
  }
});

//创建一个修复图片地址的全局过滤器
Vue.filter("fixImgUrl", function(url) {
  const fullUrlReg = /^http/;
  if (fullUrlReg.test(url)) {
    return url;
  } else {
    return axios.defaults.baseURL + url;
  }
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
