<template>
  <div>
    <div class="top"></div>
    <div class="closeBtn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <AuthInput type="text" placeholder="用户名/手机号"></AuthInput>
    <AuthInput type="password" placeholder="密码"></AuthInput>

    <AuthBtn btnText="登录" @clickBtn="login"></AuthBtn>

    <div class="bottom"></div>
  </div>
</template>

<script>
import AuthInput from "@/components/AuthInput.vue";
import AuthBtn from "@/components/AuthBtn.vue";
export default {
  components: {
    AuthInput,
    AuthBtn
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