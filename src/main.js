import Vue from "vue";
import App from "./App.vue";
import router from "./router";


//引入 vant-ui 组件库并配置
// 全局引入
import Vant from "vant";
Vue.use(Vant);
import "vant/lib/index.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
