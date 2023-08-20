<template>
  <view class="container">
    <view class="title">
      <text class="text">饭圈推荐</text>
    </view>
    <view class="review-wrapper">
      <view v-for="item in 5" :key="item" class="review-item">
        <view class="top">
          <view class="avatar">琪</view>
          <view class="user-info">
            <view class="username">猪猪琪</view>
            <view class="date">2023-7-17</view>
          </view>
          <view class="dish"> XXX套餐 </view>
        </view>
        <view class="main-text">
          你总是打哈哈哈,你有没有想过,H键累了,它不想总是被你
          像肌肉痉挛一样狂按,它渴望休息,它想念自己的家人,你关
          心过这些吗?你没有,你只考虑你自己。...
        </view>
        <view class="main-img">
          <img
            v-for="item in 5"
            :key="item"
            class="img"
            src="/src//static/logo.png"
          />
        </view>
        <view class="bottom">
          <view class="like-num">
            已获得<strong class="num"> 1000 </strong> 赞
          </view>
          <view class="like" @click="hanldeLike(item)">
            <text v-if="!active[item]" class="iconfont">&#xe8ad;</text>
            <text v-else class="iconfont active">&#xe8c3;</text>
            <text class="text">{{ active[item] ? '取消点赞' : '点赞' }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref<boolean[]>(new Array(5).fill(false))

const hanldeLike = (item: number) => {
  active.value[item] = !active.value[item]
}
</script>

<style lang="scss" scoped>
.container {
  width: 750rpx;
  min-height: 1500rpx;
  height: 100%;
  background: url('@/static/all-bg.png') no-repeat top;
  background-size: 100% 1500rpx;
  background-color: #fff;

  .title {
    width: 750rpx;
    height: 450rpx;

    .text {
      display: block;
      padding: 100rpx 50rpx;
      font-size: 80rpx;
      font-weight: 700;
      color: #564f47;
    }
  }

  .review-wrapper {
    display: flex;
    height: fit-content;
    flex-direction: column;

    .review-item {
      display: flex;
      flex-direction: column;
      height: fit-content;
      padding-bottom: 30rpx;
      border-bottom: 1.5px solid #eee;
      box-shadow: 0px 3px 6px -5px #ccc;
      margin-bottom: 10rpx;

      .top {
        display: flex;
        flex-direction: row;
        height: 140rpx;
        padding: 20rpx 0;

        .avatar {
          width: 100rpx;
          height: 100rpx;
          background-color: rgb(255, 171, 0, 0.5);
          border-radius: 50%;
          text-align: center;
          line-height: 100rpx;
          font-size: 45rpx;
          font-weight: 500;
          color: white;
          margin: 0 25rpx 0 15rpx;
        }

        .user-info {
          padding-top: 5rpx;
          margin-right: auto;

          .username {
            height: 50rpx;
            line-height: 50rpx;
            font-size: 32rpx;
          }

          .date {
            height: 30rpx;
            line-height: 30rpx;
            font-size: 28rpx;
          }
        }

        .dish {
          // height: 100rpx;
          line-height: 80rpx;
          font-size: 32rpx;
          font-weight: 600;
          margin-right: 40rpx;
        }
      }

      .main-text {
        text-indent: 1rem;
        line-height: 40rpx;
        font-size: 28rpx;
        padding: 10rpx;
      }

      .main-img {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding-bottom: 10rpx;

        .img {
          width: 140rpx;
          aspect-ratio: 1;
          margin: 5rpx;
        }
      }

      .bottom {
        margin-top: 10rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .like-num {
          height: 50rpx;
          line-height: 50rpx;
          margin-left: 20rpx;
          font-size: 28rpx;

          .num {
            font-size: 36rpx;
            font-weight: 600;
          }
        }

        .like {
          margin-right: 20rpx;
          height: 50rpx;
          line-height: 50rpx;
          font-weight: 500;

          .iconfont {
            font-size: 36rpx;
          }

          .active {
            color: $blue-color;
          }

          .text {
            font-size: 32rpx;
          }
        }
      }
    }
  }
}
</style>
