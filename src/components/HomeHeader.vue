<template>
  <div class="header">
    <span class="iconfont iconnew"></span>
    <div class="search" @click="$router.push('/search')">
      <span class="iconfont iconsearch">搜索新闻</span>
    </div>
    <span class="iconfont iconwode" @click="$router.push('/person')"></span>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  padding: 0 10px;
  color: #fff;
  align-items: center;
  background-color: red;
  .iconnew {
    font-size: 54px;
  }
  .search {
    flex: 1;
    width: 210px;
    height: 34px;
    line-height: 34px;
    background-color: rgba(255, 255, 255, 0.6);
    text-align: center;
    margin: 0 25px 0 10px;
    border-radius: 15px;
  }
  .iconwode {
    font-size: 32px;
  }
}
</style>