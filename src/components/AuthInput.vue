<template>
  <!-- 类名是输入框包装的意思  wrapper 包装 -->
  <div class="input-wrapper">
    <input
      :class="{
      err:!isValid,
      success:isValid
    }"
      :type="type"
      :placeholder="placeholder"
      @input="checkValue"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isValid: true
    };
  },
  props: ["type", "placeholder"],
  methods: {
    checkValue(event) {
      // console.log(event.target.value);
      const regExp = /^.{3,10}$/;
      this.isValid = regExp.test(event.target.value);
    }
  }
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
  .err {
    border-color: red;
  }
  .success {
    border-color: aqua;
  }
}
</style>