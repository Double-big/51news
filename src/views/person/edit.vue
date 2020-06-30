<template>
  <div v-if="userInfo">
    <div class="top"></div>
    <TopNav title="编辑资料"></TopNav>
    <div class="avatarWrapper">
      <img
        v-if="userInfo.head_img"
        :src="$axios.defaults.baseURL + userInfo.head_img"
        class="avatar"
        alt
      />
      <img v-else src="@/assets/logo.png" class="avatar" alt />
    </div>
    <!-- 编辑资料页 -->
    <TabBar leftText="昵称" :rightText="userInfo.nickname"></TabBar>
    <TabBar leftText="密码" rightText="***"></TabBar>
    <TabBar leftText="性别" :rightText="userInfo.gender == 1 ? '男': '女'"></TabBar>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import TabBar from "@/components/TabBar.vue";
export default {
  data() {
    return {
      userInfo: null
    };
  },
  components: {
    TopNav,
    TabBar
  },
  created() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      method: "get",
      headers: {
        // Authorization: "Bearer " + localStorage.getItem("token")
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { message, data } = res.data;
      if (message == "获取成功") {
        this.userInfo = data;
        // console.log(this.userInfo);
      }
    });
  }
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 12.5vw;
  background-color: #757575;
}
.avatarWrapper {
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
}
</style>