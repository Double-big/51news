<template>
  <div class="tabbar" @click="handleClick">
    <div class="left">{{leftText}}</div>
    <div class="right">
      {{rightText}}
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["leftText", "rightText"],
  methods: {
    handleClick() {
      console.log("子组件被点击");
      this.$emit('barClick')
    }
  }
};
</script>

<style lang="less" scoped>
.tabbar {
  display: flex;
  border-bottom: 1px solid #c4c4c4;
  line-height: 12.222vw;
  align-items: center;
  margin-left: 25px;
  font-size: 3.889vw;
  .left {
    display: flex;
    flex: 1;
  }
  .right {
    color: #c4c4c4;
  }
}
</style>