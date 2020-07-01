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
    <TabBar @barClick="showNickname = true" leftText="昵称" :rightText="userInfo.nickname"></TabBar>
    <TabBar @barClick="showPassword = true" leftText="密码" rightText="***"></TabBar>
    <TabBar leftText="性别" :rightText="userInfo.gender == 1 ? '男': '女'"></TabBar>

    <!-- 以下是弹窗组件 -->
    <!-- 修改昵称弹窗 -->
    <van-dialog
      v-model="showNickname"
      title="修改昵称"
      show-cancel-button
      @confirm="setEdit({nickname:newNickname})"
    >
      <van-field v-model="newNickname" placeholder="请输入新的昵称" />
    </van-dialog>
    <!-- 修改密码弹窗 -->
    <van-dialog
      v-model="showPassword"
      title="修改昵称"
      show-cancel-button
      @confirm="setEdit({password:newPassword})"
    >
      <van-field v-model="newPassword" placeholder="请输入新的密码" type="password" />
    </van-dialog>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import TabBar from "@/components/TabBar.vue";
export default {
  data() {
    return {
      userInfo: null,
      showNickname: false,
      showPassword: false,
      newPassword: "",
      newNickname: ""
    };
  },
  components: {
    TopNav,
    TabBar
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage() {
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
    },
    // setNickname() {
    //   // this.newNickname = newNickname;
    //   this.$axios({
    //     url: "/user_update/" + localStorage.getItem("user_id"),
    //     method: "post",
    //     data: {
    //       nickname: this.newNickname
    //     },
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token")
    //     }
    //   }).then(res => {
    //     // console.log(res.data);
    //     if (res.data.message == "修改成功") {
    //       this.loadPage();
    //       this.newNickname = "";
    //     }
    //     // this.userInfo = this.newNickname;
    //   });
    //   // .catch(err => {
    //   //   console.log("请求失败");
    //   // });
    // },
    // setPassword() {
    //   this.$axios({
    //     url: "/user_update/" + localStorage.getItem("user_id"),
    //     method: "post",
    //     data: {
    //       password: this.newPassword
    //     },
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token")
    //     }
    //   }).then(res => {
    //     console.log(res.data);
    //     if (res.data.message == "修改成功") {
    //       this.loadPage();
    //       this.newPassword = "";
    //     }
    //     //当后台没有这个数据时打印不出来
    //     // console.log(this.newPassword);
    //   });
    // },
    setEdit(newData) {
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "post",
        //把data部分抽离出来作为一个变量, 从组件传入所需要的变量值, 实现封装的功能
        data: newData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.message == "修改成功") {
          this.loadPage();
          this.newPassword = "";
        }
        //当后台没有这个数据时打印不出来
        // console.log(this.newPassword);
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