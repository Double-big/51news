<template>
  <div>
    <TopNav title="栏目管理" />
    <div class="mainWrapper">
      <h2>点击删除以下频道</h2>
      <div class="enable list">
        <div class="item" v-for="item in enableList" :key="item.id">{{item.name}}</div>
      </div>
      <h2>点击添加以下频道</h2>
      <div class="disable list">
        <div class="item" v-for="item in disableList" :key="item.id">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav";
export default {
  data() {
    return {
      enableList: [],
      disableList: []
    };
  },
  components: {
    TopNav
  },
  created() {
    this.$axios({
      url: "/category"
    }).then(res => {
      console.log(res.data);
      this.enableList = res.data.data;
      this.disableList = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.mainWrapper {
  padding: 0 20px;
  h2 {
    background: #f5f5f5;
    font-size: 12px;
    color: #666666;
    width: 100%;
    height: 22px;
    line-height: 22px;
    margin-bottom: 15px;
  }
  .enable {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 62px;
      height: 34px;
      border: 1px solid #e0e0e0;
      text-align: center;
      line-height: 34px;
      margin: 0 15px 20px 0;
    }
  }
  .disable {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 62px;
      height: 34px;
      border: 1px solid #e0e0e0;
      text-align: center;
      line-height: 34px;
      margin: 0 15px 20px 0;
    }
  }
}
</style>