<template>
  <div>
    <Index :commentData="item" v-for="(item, index) in commentList" :key="index" />
  </div>
</template>

<script>
import Index from "@/components/comment/index";
export default {
  components: {
    Index
  },
  data() {
    return {
      commentList: []
    };
  },
  created() {
    this.$axios({
      url: "/post_comment/4"
    }).then(res => {
      console.log(res.data);
      this.commentList = res.data.data;
    });
  }
};
</script>

<style>
</style>