<template>
  <view class="w-full h-full">
    <view v-for="item in 10" :key="item" class="order-card">
      <view class="img card-item">
        <img
          src="/src//static/logo.png"
          alt=""
          style="width: 80%; height: 80%; margin-left: 10%"
        />
      </view>
      <view class="detail card-item">
        <view class="name">XXX套餐</view>
        <view class="provider">XX供应商</view>
      </view>
      <view class="card-item">
        <button class="btn">取消收藏</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.order-card {
  width: 700rpx;
  margin: 25rpx;
  min-height: 200rpx;
  height: fit-content;
  background: white;
  border-radius: 30rpx;
  display: flex;
  flex-direction: row;
  .card-item {
    flex: 1;
    min-height: 180rpx;
    height: fit-content;
    margin: 10rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .btn {
      color: #ff6f00;
      border-radius: 30rpx;
      width: 100%;
      height: 60rpx;
      padding: 0;
      font-size: 30rpx;
      line-height: 60rpx;
      border: 1px solid #ff6f00;
      background: white;
    }
  }
  .detail {
    padding: 10rpx;
    flex: 1.5;
    font-size: 32rpx;
    justify-content: flex-start;
    line-height: 40rpx;
    .name {
      padding-top: 5rpx;
      font-size: 36rpx;
      line-height: 60rpx;
      font-weight: 700;
    }
  }
}
</style>
