<template>
  <div class="parentComment">
    <div class="user">
      <Parent
        :parentDepth="parentDepth-1"
        :parentData="parentData.parent"
        v-if="parentData.parent"
        @parentCallReply="diGuiReply"
      />
      <div class="info">
        <div class="name">{{parentDepth}} {{parentData.user.nickname}}2小时前</div>
        <div class="answer" @click="parentCallReply">回复</div>
      </div>
      <div class="content">{{parentData.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Parent",
  props: ["parentData", "parentDepth"],
  methods: {
    parentCallReply() {
      this.$emit("parentCallReply", {
        id: this.parentData.id,
        nickname: this.parentData.user.nickname
      });
    },
    diGuiReply(parentInfo) {
      this.$emit("parentCallReply", parentInfo);
    }
  }
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