<template>
  <div>
    <HomeHeader />
    <van-tabs v-model="active">
      <van-tab v-for="item in categoriesList" :key="item.id" :title="item.name">
        <div v-for="post in postList" :key="post.id">{{post.title}}</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import HomeHeader from "@/components/HomeHeader";
export default {
  components: {
    HomeHeader
  },
  data() {
    return {
      active: 0,
      categoriesList: [],
      postList: []
    };
  },
  created() {
    this.$axios({
      url: "/category"
    }).then(res => {
      this.categoriesList = res.data.data;
      //获取当前文章, 发送ajax请求. 封装 getPost()
      this.getPost();
    });
  },
  watch: {
    active() {
      this.getPost();
    }
  },
  methods: {
    getPost() {
      //栏目列表
      // this.categoriesList;
      // //当前激活栏目的索引
      // this.active;
      // // 可以拿到当前激活栏目
      // this.categoriesList[this.active];
      // // 获取id
      // this.categoriesList[this.active].id;
      //当前激活分类, 是在分类列表中拿出当前激活的索引
      const currentCategory = this.categoriesList[this.active];
      //从中获取 id
      const categoryId = currentCategory.id;
      this.$axios({
        url: "/post",
        params: {
          category: categoryId
        }
      }).then(res => {
        // this.categoryId = this.categoriesList[this.active].id;
        console.log(res.data);
        this.postList = res.data.data;
      });
    }
  }
};
</script>

<style>
</style>