<template>
  <view class="success">
    <img :src="imgUrl" class="img" />
    <view class="msg">订单不存在</view>
  </view>
</template>

<script setup lang="ts">
import imgUrl from '@/static/error.png'
</script>

<style lang="scss" scoped>
.success {
  display: flex;
  height: 1500rpx;
  width: 750rpx;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  .img {
    margin-left: 175rpx;
    width: 400rpx;
    height: 400rpx;
    border-radius: 50%;
  }
  .msg {
    font-size: 45rpx;
    line-height: 80rpx;
    text-align: center;
    font-weight: 600;
  }
}
</style>
