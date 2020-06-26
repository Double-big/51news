<template>
  <!-- 类名是输入框包装的意思  wrapper 包装 -->
  <div class="input-wrapper">
    <input :type="type" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  props: ["type", "placeholder"]
};
</script>

<style lang="less" scoped>
.input-wrapper {
  padding: 5.556vw;
  padding-top: 0;
  input {
    font-size: 5vw;
    border: none;
    border-bottom: 1px solid #757575;
    width: 100%;
    height: 10.556vw;
    outline: none;
    box-sizing: border-box;
  }
}
</style>