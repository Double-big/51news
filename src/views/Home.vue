<template>
  <div>
    <HomeHeader />
    <van-tabs v-model="active">
      <van-tab v-for="category in categoriesList" :key="category.id" :title="category.name">
        <!-- <div v-for="post in postList" :key="post.id">{{post.title}}</div> -->
        <!-- 组件替代div -->
        <Post :postData="post" v-for="post in category.postList" :key="post.id" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import HomeHeader from "@/components/HomeHeader";
import Post from "@/components/post";
export default {
  components: {
    HomeHeader,
    Post
  },
  data() {
    return {
      active: 0,
      categoriesList: [],
      postList: []
    };
  },
  created() {
    this.getCategorise();
  },
  computed: {
    categoryId() {
      //当前激活分类, 是在分类列表中拿出当前激活的索引
      const currentCategory = this.categoriesList[this.active];
      //从中获取 id
      return currentCategory.id;
    }
  },
  watch: {
    active() {
      this.getPost();
    }
  },
  methods: {
    getCategorise() {
      this.$axios({
        url: "/category"
      }).then(res => {
        console.log(res.data);

        // this.categoriesList = res.data.data;
        //获取当前文章, 发送ajax请求. 封装 getPost()
        const newData = res.data.data.map(category => {
          return {
            ...category,
            postList: []
          };
        });
        this.categoriesList = newData;
        console.log(this.categoriesList);

        this.getPost();
      });
    },
    getPost() {
      //栏目列表
      // this.categoriesList;
      // //当前激活栏目的索引
      // this.active;
      // // 可以拿到当前激活栏目
      // this.categoriesList[this.active];
      // // 获取id
      // this.categoriesList[this.active].id;

      this.$axios({
        url: "/post",
        params: {
          category: this.categoryId
        }
      }).then(res => {
        // this.categoryId = this.categoriesList[this.active].id;
        // console.log(res.data);
        // this.postList = res.data.data;
        const currentCategory = this.categoriesList[this.active];
        currentCategory.postList = res.data.data;
        console.log(currentCategory.postList);
        
      });
    }
  }
};
</script>

<style>
</style>