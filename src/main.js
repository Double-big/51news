import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//引入 vant-ui 组件库并配置
// 全局引入
import Vant from "vant";
Vue.use(Vant);
import "vant/lib/index.css";


//引入axios库
import axios from "axios";
// 绑定到原型
Vue.prototype.$axios = axios;

//设置基准路径
//远程地址
axios.defaults.baseURL = "http://liangwei.tech:3000";
// 本地地址
// axios.defaults.baseURL = "http://127.0.0.1:3000";

Vue.config.productionTip = false;

new Vue({
  router,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
