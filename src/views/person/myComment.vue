<template>
  <div class="myComment">
    <div class="top"></div>
    <TopNav title="我的跟帖" />
    <div class="commentItem">
      <div class="date">2019-10-10</div>
      <div class="content">阿信是张信哲吗?张信哲是不是张学友的弟弟?</div>
      <div class="from">
        <span class="contentText">原文: xxx</span>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <!-- 第二种情况 -->
    <div class="commentItem">
      <div class="date">2019-10-10</div>

      <div class="parentComment">
        <div class="info">回复：火星彩票研究员</div>
        <div class="parentContent">阿信是张信哲吗?张信哲是不是张学友的弟弟?</div>
      </div>

      <div class="content">不是</div>
      <div class="from">
        <span class="contentText">原文: xxx</span>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav";
export default {
  components: {
    TopNav
  },
  created() {
    this.$axios({
      url:''
    }).then(res=>{
      
    })
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 12.5vw;
  background-color: #757575;
}
.commentItem {
  padding: 15px 20px;
  border-bottom: 1px solid #d7d7d7;
  .date {
    font-size: 14px;
    color: #a8a8a8;
  }
  .parentComment {
    margin: 20px 0;
    padding: 12px 10px;
    background: #e4e4e4;
    .info {
      font-size: 12px;
      color: #969696;
    }
    .parentContent {
      padding-top: 10px;
      color: #969696;
    }
  }
  .content {
    font-size: 16px;
    margin: 20px 0;
  }
  .from {
    font-size: 14px;
    color: #898989;
    display: flex;
    .contentText {
      flex: 1;
    }
    .iconjiantou1 {
      color: #898989;
    }
  }
}
</style>