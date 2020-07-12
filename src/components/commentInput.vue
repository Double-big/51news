<template>
  <div class="commentWrapper">
    <!-- 已激活 -->
    <div class="enable" v-if="isShow">
      <textarea
        v-model="content"
        :placeholder="placeholderText"
        ref="textarea"
        @blur="hide"
        rows="4"
      ></textarea>
      <div class="btnSend" @click="send">发送</div>
    </div>

    <!-- 未激活 -->
    <div class="disable" v-if="!isShow">
      <input type="text" @focus="showTextarea" :value="content" :placeholder="placeholderText" />
      <div class="comment">
        <span class="iconfont iconpinglun-"></span>
        <span class="num">1020</span>
      </div>
      <span class="iconfont iconshoucang"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["parentInfo"],
  data() {
    return {
      isShow: false,
      content: ""
    };
  },
  computed: {
    placeholderText() {
      if (this.parentInfo.nickname) {
        return "回复: @" + this.parentInfo.nickname;
      } else {
        return "写评论";
      }
    }
  },

  methods: {
    showTextarea() {
      this.isShow = true;

      this.$nextTick(() => {
        this.$refs.textarea.focus();
      });
    },
    hide() {
      // console.log(this.isShow);
      this.parentInfo.nickname = "";
      setTimeout(() => {
        this.isShow = false;
      }, 50);
    },
    send() {
      console.log(this.$route.params.id);
      console.log(this.content);
      if (this.content == "") {
        this.$toast.fail("请输入内容");
        return;
      }
      let data = {
        content: this.content
      };
      if (this.parentInfo.id) {
        data.parent_id = this.parentInfo.id;
        this.$emit("reloadComment");
      }

      this.$axios({
        url: "/post_comment/" + this.$route.params.id,
        method: "post",
        // data: data
        // 简写
        data
      })
        .then(res => {
          console.log(res.data);

          if (res.data.message == "评论发布成功" && this.content != "") {
            // 子组件发送事件到父组件, 父组件以监听事件的形式接受;
            this.$emit("reloadComment");
            this.content = "";
          }
        })
        .catch(err => {
          this.$toast.fail("系统失败");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.commentWrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .disable {
    display: flex;
    justify-content: space-between;
    input {
      width: 184px;
      height: 32px;
      background: #d7d7d7;
      border-radius: 16px;
      outline: none;
      border: none;
      padding-left: 20px;
      line-height: 32px;
      box-sizing: border-box;
    }
    .iconfont {
      font-size: 22px;
    }
    .comment {
      position: relative;
      .num {
        position: absolute;
        top: -4px;
        left: 8px;
        font-size: 12px;
        width: 30px;
        height: 16px;
        background: red;
        border-radius: 8px;
        color: white;
        text-align: center;
        line-height: 16px;
        padding: 0 5px;
      }
    }
  }
  .enable {
    display: flex;
    align-items: flex-end;
    textarea {
      padding: 10px;
      width: 280px;
      border: none;
      outline: none;
      border-radius: 10px;
      background: #d7d7d7;
      resize: none;
    }
    .btnSend {
      width: 66px;
      height: 28px;
      border-radius: 14px;
      background: red;
      color: white;
      text-align: center;
      line-height: 28px;
      font-size: 13px;
      margin: 0 10px;
    }
  }
}
</style>