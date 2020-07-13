<template>
  <div class="moreComment">
    <TopNav title="更多跟帖" />
    <Comment @reply="callReply" :commentData="item" v-for="item in commentList" :key="item.id" />

    <commentInput ref="commentInput" :parentInfo="commentInfo" @reloadComment="loadComment" />
  </div>
</template>

<script>
import Comment from "@/components/comment/index";
import TopNav from "@/components/TopNav";
import commentInput from "@/components/commentInput";
export default {
  data() {
    return {
      commentList: [],
      commentInfo: {}
    };
  },
  components: {
    Comment,
    TopNav,
    commentInput
  },
  created() {
    this.loadComment();
  },
  methods: {
    loadComment() {
      this.$axios({
        url: "/post_comment/" + this.$route.params.id
      }).then(res => {
        console.log(res.data);
        this.commentList = res.data.data;
      });
    },
    callReply(commentInfo) {
      this.commentInfo = commentInfo;
      // console.log("获取index组件中的id");
      this.$refs.commentInput.showTextarea();
    }
  }
};
</script>

<style>
</style>