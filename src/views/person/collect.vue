<template>
  <div>
    <TopNav title="我的收藏" />
    <Post :postData="item" v-for="item in postList" :key="item.id" />
  </div>
</template>

<script>
import TopNav from "@/components/TopNav";
import Post from "@/components/post";
export default {
  components: {
    TopNav,
    Post
  },
  data() {
    return {
      postList: []
    };
  },
  created() {
    this.$axios({
      url: "/user_star"
    }).then(res => {
      console.log(res.data);
      this.postList = res.data.data;
    });
  }
};
</script>

<style>
</style>