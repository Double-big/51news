<template>
  <div>
    <div class="top"></div>
    <div class="closeBtn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <AuthInput
      type="text"
      placeholder="用户名/手机号"
      rule="^.{3,10}$"
      errMsg="请输入正确内容"
      @valueChange="setUsername"
    ></AuthInput>
    <AuthInput
      type="password"
      placeholder="密码"
      rule="^.{3,10}$"
      errMsg="请输入正确内容"
      @valueChange="setPassword"
    ></AuthInput>

    <!-- 子组件发送被监听的事件和原生的事件不一样,即使同名也不是同一个事件,所以尽量起一个独特好辨认的名字 -->
    <AuthBtn btnText="登录" @clickBtn="login"></AuthBtn>

    <div class="bottom"></div>
  </div>
</template>

<script>
import AuthInput from "@/components/AuthInput.vue";
import AuthBtn from "@/components/AuthBtn.vue";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: {
    AuthInput,
    AuthBtn
  },
  methods: {
    // 这里的username用来接受子组件传过来的参数
    setUsername(username) {
      // console.log("父组件接受到子组件的值存到data中");
      this.username = username;
    },
    setPassword(password) {
      // 把input框中更新的值存到data中
      // console.log("父组件接受到子组件的值存到data中");
      this.password = password;
    },
    login() {
      // console.log("父组件监听子组件的事件");
      if (!this.username || !this.password) {
        this.$toast("请输入完整内容");
        return;
      }
      this.$axios({
        url: "http://liangwei.tech:3000/login",
        method: "post",
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(res => {
          // console.log("这里是成功处理");

          console.log(res.data);
          const { statusCode, message } = res.data;
          if (statusCode == 200 || message) {
            this.$toast.success(message);
          }
          this.$router.replace("/");
        })
        .catch(err => {
          // console.log("这里是错误处理");
          this.$toast.fail("系统错误");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 12.5vw;
  background-color: #757575;
}
.closeBtn {
  padding: 5.556vw;
  span {
    // color: #101010;
    font-size: 6.944vw;
  }
}
.logo {
  text-align: center;
  span {
    color: #d81e06;
    font-size: 35vw;
  }
}
.bottom {
  width: 100%;
  height: 12.5vw;
  background-color: #757575;
  position: absolute;
  bottom: 0;
}
</style>