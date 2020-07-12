<template>
  <div>
    <!-- 顶部 -->
    <div class="top"></div>
    <div class="searchWrapper">
      <span class="iconfont iconjiantou"></span>
      <div class="search">
        <span class="iconfont iconsearch"></span>
        <input v-model="keyword" class="iconfont iconsearch" type="text" placeholder="通灵兽消失术" />
      </div>
      <span class="btn" @click="search">搜索</span>
    </div>
    <!-- 历史记录 -->
    <div class="suggestions" v-if="results.length == 0">
      <h2 class="title">历史记录</h2>
      <div class="history list">
        <div
          @click="sendSuggestions(item)"
          class="item"
          v-for="(item, index) in history"
          :key="index"
        >{{item}}</div>
      </div>

      <h2 class="title">热门搜索</h2>
      <div class="hot list">
        <div
          @click="sendSuggestions(item)"
          class="item"
          v-for="(item, index) in hot"
          :key="index"
        >{{item}}</div>
      </div>
    </div>

    <!-- 文章列表渲染 -->
    <div class="results">
      <Post :postData="item" v-for="item in results" :key="item.id" />
    </div>
  </div>
</template>

<script>
import Post from "@/components/post";
export default {
  components: {
    Post
  },
  data() {
    return {
      keyword: "",
      results: [],
      history: ["美女", "关晓彤", "英语"],
      hot: ["美女", "关晓彤", "英语"]
    };
  },
  methods: {
    search() {
      if (!this.keyword) {
        return;
      }
      this.$axios({
        url: "/post_search",
        params: {
          keyword: this.keyword
        }
      }).then(res => {
        console.log("搜索结果", res.data);
        this.results = res.data.data;
      });
    },
    sendSuggestions(item) {
      this.keyword = item;
      this.search();
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
.searchWrapper {
  display: flex;
  padding: 15px 15px;
  justify-content: space-around;
  align-items: center;
  .search {
    width: 258px;
    height: 38px;
    border: none;
    position: relative;
    span {
      position: absolute;
      top: 11px;
      left: 20px;
      color: #848484;
    }
    input {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      outline: none;
      border: 1px solid #dcdcdc;
      box-sizing: border-box;
      padding-left: 40px;
    }
  }
}
.suggestions {
  padding: 0 20px;
  h2 {
    font-size: 16px;
    margin: 20px 0;
  }
  .history {
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 15px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      padding-top: 5px;
      padding-right: 15px;
    }
  }
}
</style>