<template>
  <div class="parentComment">
    <Parent :parentData="parentData.parent" v-if="parentData.parent" />
    <div class="user">
      <div class="info">
        <div class="name">{{parentData.user.nickname}}2小时前</div>
        <div class="answer">回复</div>
      </div>
      <div class="content">{{parentData.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Parent",
  props: ["parentData"]
};
</script>

<style lang="less" scoped>
.parentComment {
  color: #888;
  font-size: 14px;
  //   padding: 10px;
  // border: 1px solid #c4c4c4;
  .user {
    border: 1px solid #c4c4c4;
    margin-bottom: -1px;
    padding: 10px;
    .info {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .name {
        font-size: 12px;
      }
      .answer {
        font-size: 12px;
      }
    }
    .content {
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
</style>