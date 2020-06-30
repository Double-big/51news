<template>
  <div>
    <button @click="show = true">弹出弹窗</button>
    <van-dialog v-model="show" title="标题" show-cancel-button @confirm="submit">
      <van-field v-model="value" placeholder="请输入用户名" />
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      value: ""
    };
  },
  methods: {
    submit() {
      console.log("触发事件了");
      console.log("当前的值", this.value);
    }
  }
};
</script>

<style>
</style>