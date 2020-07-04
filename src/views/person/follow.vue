<template>
  <div>
    <div class="top"></div>
    <TopNav title="我的关注" />
    <div class="followsList">
      <div class="item" v-for="(item,index) in followsList " :key="item.id">
        <img class="avatar" src="@/assets/logo.png" alt />
        <div class="middle">
          <div class="name">火星新闻播报</div>
          <div class="date">2020-07-01</div>
        </div>
        <div v-if="item.isFollow" class="unFollow" @click="unFollow(item.id,index)">取消关注</div>
        <div v-else class="Follow" @click="Follow(item.id,index)">关注</div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav";
export default {
  components: {
    TopNav
  },
  data() {
    return {
      followsList: []
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      this.$axios({
        url: "/user_follows"
      }).then(res => {
        console.log(res.data.data);
        // this.followsList = res.data.data;
        const newData = res.data.data.map(user => {
          return { ...user, isFollow: true };
        });
        console.log(newData);
        this.followsList = newData;
      });
    },
    unFollow(id, index) {
      this.$axios({
        url: "/user_unfollow/" + id
      }).then(res => {
        // this.loadPage();
        this.followsList[index].isFollow = false;
      });
    },
    Follow(id, index) {
      this.$axios({
        url: "/user_follows/" + id,
        method: "get"
      }).then(res => {
        console.log(res.data);
        this.followsList[index].isFollow = true;
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
.item {
  display: flex;
  height: 80px;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #ccc;
  .avatar {
    width: 40px;
    height: 40px;
    object-fit: cover; //不让图片变形
    border-radius: 50%;
  }
  .middle {
    flex: 1;
    padding-left: 10px;
    .name {
      font-size: 16px;
    }
    .date {
      font-size: 14px;
      color: #b1b1b1;
      padding-top: 3px;
    }
  }
  .unFollow {
    width: 73px;
    height: 30px;
    border-radius: 50px;
    background-color: #e1e1e1;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }
  .Follow {
    width: 50px;
    height: 30px;
    border-radius: 50px;
    background-color: red;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }
}
</style>