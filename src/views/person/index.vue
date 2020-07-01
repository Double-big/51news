<template>
  <div class="proson" v-if="userData">
    <div class="hear"></div>
    <router-link to="/editperson">
      <div class="top">
        <img v-if="userData.head_img" :src="$axios.defaults.baseURL + userData.head_img" alt />
        <img v-else src="@/assets/logo.png" alt />
        <div class="middle">
          <div class="name">
            <span v-if="userData.gender == 1" class="iconfont iconxingbienan"></span>
            <span v-else class="iconfont iconxingbienv"></span>
            {{userData.nickname}}
          </div>
          <div class="date">{{createDate}}</div>
        </div>
        <div class="arrow iconfont iconjiantou1"></div>
      </div>
    </router-link>

    <div class="barList">
      <TabBar @barClick="beClick('关注')" leftText="我的关注" rightText="关注的用户"></TabBar>
      <TabBar @barClick="beClick('跟帖')" leftText="我的跟帖" rightText="跟帖/回复"></TabBar>
      <TabBar @barClick="beClick('收藏')" leftText="我的收藏" rightText="文章/视频"></TabBar>
      <TabBar @barClick="beClick" leftText="设置" rightText></TabBar>
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar.vue";
export default {
  data() {
    return {
      // userData: {}  或者  userData: null
      userData: null
    };
  },
  computed: {
    createDate() {
      if (this.userData.create_date) {
        return this.userData.create_date.split("T")[0];
      } else {
        return "2020 - 07 - 01";
      }
    }
  },
  components: {
    TabBar
  },
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      methos: "get",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      if (data) {
        // this.$toast.success("获取成功");
        this.userData = data;
      }
      console.log(res.data);
    });
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");

      this.$router.replace("/login");
    },
    beClick() {
      console.log("接受到子组件点击");
    }
  }
};
</script>

<style lang="less" scoped>
.hear {
  width: 100%;
  height: 12.5vw;
  background-color: #757575;
}
.top {
  display: flex;
  padding: 6.667vw;
  border-bottom: 1.389vw solid #eee;
  img {
    width: 19.444vw;
    border-radius: 50%;
  }
  .middle {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding-left: 2.778vw;

    .name {
      font-size: 4.444vw;
      color: #333333;
      .iconxingbienan {
        color: aqua;
      }
      .iconxingbienv {
        color: #f63bc0;
      }
    }
    .date {
      margin-top: 1.389vw;
      font-size: 3.889vw;
      color: #d2d2d2;
    }
  }
  .arrow {
    display: flex;
    align-items: center;
  }
}
</style>
