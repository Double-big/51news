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
      type="nickname"
      placeholder="昵称"
      rule="^.{3,10}$"
      errMsg="请输入正确内容"
      @valueChange="setNickname"
    ></AuthInput>
    <AuthInput
      type="password"
      placeholder="密码"
      rule="^.{3,10}$"
      errMsg="请输入正确内容"
      @valueChange="setPassword"
    ></AuthInput>

    <AuthBtn btnText="注册" @clickBtn="register"></AuthBtn>

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
      nickname: "",
      password: ""
    };
  },
  components: {
    AuthInput,
    AuthBtn
  },
  methods: {
    setUsername(username) {
      this.username = username;
    },
    setNickname(nickname) {
      this.nickname = nickname;
    },
    setPassword(password) {
      this.password = password;
    },
    register() {
      if (!this.username || !this.nickname || !this.password) {
        this.$toast("请填写完整信息");
        return;
      }
      this.$axios({
        url: "/register",
        method: "post",
        //获取 this 里面的 用户信息
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        }
      })
        .then(res => {
          //   console.log("这里是成功处理");
          const { statusCode, message } = res.data;
          //   console.log(res.data);
          // if (statusCode) {
          //   //有statusCode 则失败
          //   this.$toast.fail(message);
          // } else {
          //   //   没有statusCode 则成功
          //   this.$toast.success(message);
          // }
          if (!statusCode) {
            this.$toast.success(message);
            this.$router.replace("/");
          }
        })
        .catch(err => {
          //   console.log("这里是错误处理");
          this.$toast.fail(message);
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