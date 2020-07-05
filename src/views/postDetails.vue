<template>
  <div>
    <!-- 图片文章 -->
    <div class="top"></div>
    <div class="nomalWrapper" v-if="postDetails.type == 1">
      <div class="header">
        <span class="iconfont iconjiantou" @click="$router.back()"></span>
        <span class="iconfont iconnew"></span>
        <!-- 动态绑定 class key:value  
        key=class, value=true/false-->
        <div
          class="follow"
          :class="{unfollow:!postDetails.has_follow}"
          @click="handleFollow"
        >{{postDetails.has_follow? "已关注":"关注"}}</div>
      </div>
      <div class="title">
        <h3>{{postDetails.title}}</h3>
        <div class="info">{{postDetails.user.nickname}} 2020-07-05</div>
      </div>

      <div class="content" v-html="postDetails.content">{{postDetails.content}}</div>
      <div class="btn">
        <div
          class="like"
          @click="like"
          :class="{
              unlike:!postDetails.has_like
            }"
        >
          <span class="iconfont icondianzan"></span>
          {{postDetails.like_length +112}}
        </div>
        <div class="weixin">
          <span class="iconfont iconweixin"></span>
          微信
        </div>
      </div>
    </div>

    <!-- 视频文章 -->
    <!-- <div class="top"></div> -->
    <div class="videoWrapper" v-if="postDetails.type == 2">
      <div class="video">
        <video
          controls
          poster="https://timgmb04.bdimg.com/timg?searchbox_feed&quality=100&wh_rate=0&size=b576_324&ref=http%3A%2F%2Fwww.baidu.com&sec=1568739067&di=612dd27cae470b93b01a4b32ef72fbac&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fe18c6ffa079441431f8988ca4c3ac106.jpeg"
          src="https://video.pearvideo.com/mp4/adshort/20200421/cont-1670293-15098199_adpkg-ad_hd.mp4"
        ></video>
        <span class="iconfont iconshipin"></span>
      </div>

      <div class="info">
        <img src="@/assets/logo.png" alt />
        <span class="name">{{postDetails.user.nickname}}</span>
        <span
          class="follow"
          :class="{unfollow:!postDetails.has_follow}"
          @click="handleFollow"
        >{{postDetails.has_follow?"已关注":"关注"}}</span>
      </div>
      <div class="title">{{postDetails.title}}</div>

      <div class="btn">
        <div
          class="like"
          @click="like"
          :class="{
              unlike:!postDetails.has_like
            }"
        >
          <span class="iconfont icondianzan"></span>
          {{postDetails.like_length + 112}}
        </div>
        <div class="weixin">
          <span class="iconfont iconweixin"></span>
          微信
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postDetails: {},
      likeNum: 112
    };
  },
  created() {
    this.$axios({
      //使url上面带有id
      url: "/post/" + this.$route.query.id
    }).then(res => {
      console.log(res.data);
      this.postDetails = res.data.data;
    });
  },

  methods: {
    handleFollow() {
      // 1. 分析当下的状态
      if (this.postDetails.has_follow) {
        // true 则已关注  =>  取消关注
        this.$axios({
          url: "/user_unfollow/" + this.postDetails.user.id
        }).then(res => {
          console.log(res.data);
          if (res.data.message == "取消关注成功") {
            this.postDetails.has_follow = false;
          }
          // if(res.data.message){

          // }
        });
      } else {
        // false 则未关注 =>  关注
        this.$axios({
          url: "/user_follows/" + this.postDetails.user.id
        }).then(res => {
          console.log(res.data);
          if (res.data.message == "关注成功") {
            this.postDetails.has_follow = true;
          }
        });
      }
    },
    like() {
      this.$axios({
        url: "/post_like/" + this.postDetails.id
      }).then(res => {
        console.log(res.data);
        if (this.postDetails.has_like) {
          this.postDetails.has_like = false;
          // 点赞时点赞数加一
          this.postDetails.like_length += 1;
        } else {
          this.postDetails.has_like = true;
          // 取消点赞的同时点赞数减一
          this.postDetails.like_length -= 1;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 12.5vw;
  background-color: #757575;
}
.nomalWrapper {
  padding: 0 20px;
  border-bottom: 5px solid #e4e4e4;

  .header {
    display: flex;
    align-items: center;
    .iconnew {
      font-size: 55px;
      flex: 1;
    }
    .follow {
      border: 1px solid #dbdbdb;
      color: #3f3f3f;
      background-color: #fff;
      font-size: 12px;
      width: 62px;
      height: 26px;
      border-radius: 15px;
      text-align: center;
      line-height: 26px;
      &.unfollow {
        background-color: red;
        border-color: red;
        color: white;
      }
    }
  }
  .title {
    .info {
      font-size: 13px;
      color: #8f8f8f;
      margin-top: 5px;
    }
  }
  .content {
    margin-top: 20px;
    /deep/ img {
      max-width: 100%;
    }
  }
  .btn {
    margin: 30px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .like {
      width: 80px;
      height: 30px;
      border: 1px solid #acacac;
      border-radius: 20px;
      text-align: center;
      line-height: 30px;
      &.unlike {
        color: red;
      }
      .icondianzan {
        font-size: 20px;
      }
    }
    .weixin {
      width: 80px;
      height: 30px;
      border: 1px solid #acacac;
      font-size: 13px;
      border-radius: 20px;
      text-align: center;
      line-height: 30px;
      .iconweixin {
        font-size: 20px;
        color: #00c800;
      }
    }
  }
}
.videoWrapper {
  border-bottom: 5px solid #e4e4e4;
  .video {
    display: flex;
    position: relative;
    width: 100%;
    video {
      width: 100%;
      height: 100%;
    }
    .iconshipin {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      width: 58px;
      height: 58px;
      font-size: 50px;
      background-color: #cccccc;
      border-radius: 50%;
      color: #fff;
      justify-content: center;
      align-items: center;
      display: none;
    }
  }
  .info {
    display: flex;
    padding: 20px;
    justify-content: center;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
    .name {
      flex: 1;
      font-size: 13px;
      color: #a4a4a4;
      padding-left: 3px;
    }
    .follow {
      width: 62px;
      height: 26px;
      border-radius: 15px;
      border: 1px solid #e2e2e2;
      font-size: 13px;
      text-align: center;
      line-height: 26px;
      &.unfollow {
        background-color: red;
        border-color: red;
        color: white;
      }
    }
  }
  .title {
    padding: 0 20px;
    font-size: 16px;
  }
  .btn {
    margin: 30px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .like {
      width: 80px;
      height: 30px;
      border: 1px solid #acacac;
      border-radius: 20px;
      text-align: center;
      line-height: 30px;
      &.unlike {
        color: red;
      }
      .icondianzan {
        font-size: 20px;
      }
    }
    .weixin {
      width: 80px;
      height: 30px;
      border: 1px solid #acacac;
      font-size: 13px;
      border-radius: 20px;
      text-align: center;
      line-height: 30px;
      .iconweixin {
        font-size: 20px;
        color: #00c800;
      }
    }
  }
}
</style>