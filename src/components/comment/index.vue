<template>
  <div>
    <div class="mainComment">
      <div class="info">
        <img
          v-if="commentData"
          :src="$axios.defaults.baseURL + commentData.user.head_img"
          class="avatar"
          alt
        />
        <img v-else src="@/assets/logo.png" class="avatar" alt />
        <div class="user">
          <div class="name" v-if="commentData">{{commentData.user.nickname}}</div>
          <div class="date">2小时</div>
        </div>
        <div class="answer" @click="reply">回复</div>
      </div>

      <Parent
        :parentDepth="parentDepth"
        class="parentComment"
        :parentData="commentData.parent"
        v-if="commentData.parent"
      />
      <!-- {{parentDepth}}  被评论的数量 -->
      <div class="content">{{commentData.content}}</div>
    </div>
  </div>
</template>

<script>
import Parent from "./parent";
export default {
  props: ["commentData"],
  components: {
    Parent
  },
  computed: {
    parentDepth() {
      let Depth = 0;
      let current = this.commentData;
      while (current.parent) {
        Depth += 1;
        current = current.parent;
      }
      return Depth;
    }
  },
  methods: {
    reply() {
      this.$emit("reply", this.commentData.id);
    }
  }
};
</script>

<style lang="less" scoped>
.mainComment {
  padding: 20px;
  border-bottom: 1px solid #c4c4c4;
  // margin: 10px;
  font-size: 18px;
  color: #000;
  .info {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
    .user {
      flex: 1;
      padding-left: 5px;
      .name {
        font-size: 14px;
      }
      .date {
        font-size: 12px;
        color: #c4c4c4;
      }
    }
    .answer {
      font-size: 12px;
      color: #000;
    }
  }

  .content {
    // font-size: 12px;
    margin-top: 20px;
  }
}
</style>