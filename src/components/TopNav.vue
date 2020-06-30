<template>
  <div class="topNav">
    <div class="arrow">
      <span class="iconfont iconjiantou"></span>
    </div>
    <span class="title">{{title}}</span>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style lang="less" scoped>
.topNav {
  display: flex;
  height: 60px;
  align-items: center;
  padding: 0 5.556vw;
  .title {
    flex: 1;
    text-align: center;
    font-weight: 700;
    font-size: 3.889vw;
    color: #333;
    position: relative;
    right: 15px;
  }
}
</style>