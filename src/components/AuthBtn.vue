<template>
  <div>
    <button class="btn" @click="sendClick">{{btnText}}</button>
  </div>
</template>

<script>
export default {
  props: ["btnText"],
  methods: {
    // 按钮点击时往父组件发送事件
    sendClick() {
      this.$emit("clickBtn");
    }
  }
};
</script>

<style lang="less" scoped>
div {
  text-align: center;
}
.btn {
  width: 88.333vw;
  height: 13.333vw;
  background: #cc3300;
  border-radius: 6.667vw;
  border: none;
  font-size: 5vw;
  color: #fff;
  margin-top: 8vw;
  outline: none;
}
</style>