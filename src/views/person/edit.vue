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
      <!-- 上传文件组件 :after-read="afterRead"-->
      <!-- 这里以v-bind的形式传入一个函数, 来处理选中后的图片
      即  上传  +  后续修改-->
      <van-uploader :after-read="uploadAvatar" />
    </div>
    <!-- 编辑资料页 -->
    <TabBar @barClick="showNickname = true" leftText="昵称" :rightText="userInfo.nickname"></TabBar>
    <TabBar @barClick="showPassword = true" leftText="密码" rightText="***"></TabBar>
    <TabBar
      @barClick="showGender = true"
      leftText="性别"
      :rightText="userInfo.gender == 1 ? '男': '女'"
    ></TabBar>

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
    <!-- 修改性别弹窗 -->
    <!-- close-on-click-action  设置选完后关闭上拉菜单 -->
    <van-action-sheet
      v-model="showGender"
      :actions="genders"
      cancel-text="取消"
      close-on-click-action
      @select="setGender"
    />
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
      showGender: false,
      newPassword: "",
      newNickname: "",
      genders: [
        {
          name: "男",
          gender: 1
        },
        {
          name: "女",
          gender: 0
        }
      ]
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
    },

    setGender(item) {
      const obj = {
        gender: item.gender
      };
      this.setEdit(obj);
    },
    uploadAvatar(fileObj) {
      //会接收一个参数fileObj 文件对象
      // 其中文件就在 fileObj.file
      //1. 先将图片转成二进制的参数格式
      var formData = new FormData();
      formData.append("file", fileObj.file);

      //发起 ajax 请求
      this.$axios({
        url: "/upload",
        method: "post",
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data);
        const { message, data } = res.data;
        if (message == "文件上传成功") {
          this.setEdit({
            head_img: data.url
          });
        }
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
  position: relative;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    opacity: 0;
  }
}
</style>