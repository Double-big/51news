<template>
  <div>
    <!-- 这里是首页 -->
    <router-link to="/login">登录页</router-link>
    <br />
    <router-link to="/register">注册页</router-link>
    <br />
    <router-link to="/person">个人中心</router-link>
    <br />
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // const { data } = res.data;
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      
      this.$router.replace("/login")
      // localStorage.removeItem("token", data.token);
      // localStorage.removeItem("user_id", data.user.id);
    }
  }
};
</script>

<style>
</style>