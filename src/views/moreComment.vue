<template>
  <div class="moreComment">
    <TopNav title="更多跟帖" />
    <Comment :commentData="item" v-for="item in commentList" :key="item.id" />
  </div>
</template>

<script>
import Comment from "@/components/comment/index";
import TopNav from "@/components/TopNav";
export default {
  data() {
    return {
      commentList: []
    };
  },
  components: {
    Comment,
    TopNav
  },
  created() {
    this.$axios({
      url: "/post_comment/" + this.$route.query.id
    }).then(res => {
      console.log(res.data);
      this.commentList = res.data.data;
    });
  }
};
</script>

<style>
</style>