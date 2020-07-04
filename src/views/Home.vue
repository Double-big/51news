<template>
  <div>
    <HomeHeader />
    <van-tabs v-model="active">
      <van-tab v-for="category in categoriesList" :key="category.id" :title="category.name">
        <!-- <div v-for="post in postList" :key="post.id">{{post.title}}</div> -->
        <!-- 组件替代div -->
        <!-- v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" -->
        <van-list
          v-model="category.loading"
          :finished="category.finished"
          @load="loadMorePost"
          :immediate-check="false"
          finished-text="亲, 没有货了哟! "
        >
          <Post :postData="post" v-for="post in category.postList" :key="post.id" />

          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        </van-list>
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
      const currentCategory = this.categoriesList[this.active];
      if (currentCategory.postList == 0) {
        //没有数据才发送请求
        this.getPost();
      }
    }
  },
  methods: {
    //当前栏目
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
            postList: [],
            //当前页码
            pageIndex: 1,
            // 每页长度
            pageSize: 5,
            // 是否正在加载
            loading: false,
            //是否全部加载完毕
            finished: false
          };
        });
        this.categoriesList = newData;
        // console.log(this.categoriesList);

        this.getPost();
      });
    },
    loadMorePost() {
      // console.log("加载下一页");

      // 读取更多文章就是pageIndex + 1
      const currentCategory = this.categoriesList[this.active];
      currentCategory.pageIndex += 1;
      this.getPost();
    },
    getPost() {
      //当前激活分类, 是在分类列表中拿出当前激活的索引
      // const currentCategory = this.categoriesList[this.active];
      // //从中获取 id
      // return currentCategory.id;
      //栏目列表
      // this.categoriesList;
      // //当前激活栏目的索引
      // this.active;
      // // 可以拿到当前激活栏目
      // this.categoriesList[this.active];
      // // 获取id
      // this.categoriesList[this.active].id;

      const currentCategory = this.categoriesList[this.active];
      this.$axios({
        url: "/post",
        params: {
          category: this.categoryId,
          pageSize: currentCategory.pageSize,
          pageIndex: currentCategory.pageIndex
        }
      }).then(res => {
        // this.categoryId = this.categoriesList[this.active].id;
        console.log(res.data);
        // this.postList = res.data.data;

        // currentCategory.postList = res.data.data;
        //把之前的数组和新的数组拼接起来

        currentCategory.postList = [
          ...currentCategory.postList,
          ...res.data.data
        ];
        currentCategory.loading = false;
        if (res.data.data.length < currentCategory.pageSize) {
          currentCategory.finished = true;
        }
        // console.log(currentCategory.postList);
      });
    }
  }
};
</script>

<style>
</style>