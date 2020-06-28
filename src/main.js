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
axios.defaults.baseURL = "http://liangwei.tech:3000";
// 本地地址
// axios.defaults.baseURL = "http://127.0.0.1:3000";

axios.interceptors.response.use((res) => {
  // console.log("拦截了响应");
  //必须return res ,整个请求才能进行下去
  // console.log(res.data);
  const { statusCode, message } = res.data;
  const errorRegExp = /^4\d\d$/;

  if (statusCode && errorRegExp.test(statusCode)) {
    Toast.fail(message || "系统错误");
  }

  return res;
});

//全局前置路由守卫
router.beforeEach((to, from, next) => {
  // console.log('拦截了响应');
  const token = localStorage.getItem("token");
  // console.log(to);
  // console.log(from);
  if (to.path == "/person" && !token) {
    //跳转到个人中心页没有token则跳转到登录页
    return router.replace("/login");
  } else {
    //跳转到个人中心页时有token则放行
    return next();
  }
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
