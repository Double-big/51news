<template>
  <!-- <div v-if="postData" @click="$router.push('/postdetails?id=' + postData.id)"> -->
  <div v-if="postData" @click="$router.push('/postdetails/' + postData.id)">
    <!-- 一张图片 -->
    <div
      class="singleImg"
      v-if="postData.type == 1 && postData.cover.length >= 1 && postData.cover.length < 3"
    >
      <div class="left">
        <div class="title">{{ postData.title}}</div>
        <div class="info">{{postData.user.nickname}} {{postData.comment_length}}跟帖</div>
      </div>
      <img :src="postData.cover[0].url | fixImgUrl" alt class="right" />
    </div>

    <!-- 三张图片 -->
    <div class="multiImg" v-if="postData.type == 1 && postData.cover.length >= 3">
      <div class="multi_title">{{ postData.title}}</div>
      <div class="multi_img">
        <img :src="postData.cover[0].url | fixImgUrl" alt />
        <img :src="postData.cover[1].url | fixImgUrl" alt />
        <img :src="postData.cover[2].url | fixImgUrl" alt />
      </div>
      <div class="multi_info">{{postData.user.nickname}} {{postData.comment_length}}跟帖</div>
    </div>

    <!-- 视频 -->
    <div class="video" v-if="postData.type == 2 && postData.cover.length >= 1">
      <div class="video_title">{{ postData.title}}</div>
      <div class="coverWrapp">
        <img :src="postData.cover[0].url | fixImgUrl" alt />
        <div class="iconfont iconshipin"></div>
      </div>
      <div class="video_info">{{postData.user.nickname}} {{postData.comment_length}}跟帖</div>
    </div>
    <!-- {{postData.title}} -->
  </div>
</template>

<script>
export default {
  props: ["postData"]
};
</script>

<style lang="less" scoped>
.singleImg {
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 10px 10px;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title {
      font-size: 16px;
    }
    .info {
      font-size: 13px;
      color: #868686;
    }
  }
  img {
    width: 120px;
    height: 74px;
    object-fit: cover;
  }
}
.multiImg {
  padding: 10px 10px;
  border-bottom: 1px solid #eee;
  .multi_img {
    display: flex;
    object-fit: cover;
    justify-content: left;
    margin: 5px 0 10px 0;
    img {
      width: 112px;
      height: 74px;
      margin-right: 2px;
    }
  }
  .multi_title {
    font-size: 16px;
  }
  .multi_info {
    font-size: 13px;
    color: #868686;
  }
}
.video {
  padding: 10px 10px;
  border-bottom: 1px solid #eee;
  .video_title {
    font-size: 16px;
  }
  .coverWrapp {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    img {
      width: 100%;
      height: 170px;
    }
    .iconshipin {
      position: absolute;
      font-size: 54px;
      color: #fff;
      background-color: rgba(194, 192, 192, 0.7);
      border-radius: 50%;
    }
  }
  .video_info {
    font-size: 13px;
    color: #868686;
  }
}
</style>