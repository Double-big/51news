<template>
  <div class="proson">
    <div class="hear"></div>
    <div class="top">
      <img src="http://img1.imgtn.bdimg.com/it/u=3463550908,3838341145&fm=26&gp=0.jpg" alt />
      <div class="middle">
        <div class="name">
          <span class="iconfont iconxingbienan"></span>
          火星网友
        </div>
        <div class="date">2019-10-10</div>
      </div>
      <div class="arrow iconfont iconjiantou1"></div>
    </div>

    <div class="barList">
      <TabBar leftText="我的关注" rightText="关注的用户"></TabBar>
      <TabBar leftText="我的跟帖" rightText="跟帖/回复"></TabBar>
      <TabBar leftText="我的收藏" rightText="文章/视频"></TabBar>
      <TabBar leftText="设置" rightText=""></TabBar>
    </div>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar.vue";
export default {
  components: {
    TabBar
  }
};
</script>

<style lang="less" scoped>
.hear {
  width: 100%;
  height: 12.5vw;
  background-color: #757575;
}
.top {
  display: flex;
  padding: 6.667vw;
  border-bottom: 1.389vw solid #eee;
  img {
    width: 19.444vw;
    border-radius: 50%;
  }
  .middle {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding-left: 2.778vw;

    .name {
      font-size: 4.444vw;
      color: #333333;
      span {
        color: aqua;
      }
    }
    .date {
      margin-top: 1.389vw;
      font-size: 3.889vw;
      color: #d2d2d2;
    }
  }
  .arrow {
    display: flex;
    align-items: center;
  }
}
</style>
