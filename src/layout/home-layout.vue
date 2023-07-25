<template>
  <view class="container">
    <view class="title">
      <view class="title-text">{{ props.title }}</view>
      <view class="title-text">{{ props.subTitle }}</view>
    </view>
    <view class="main">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    subTitle: string
  }>(),
  {
    title: '今日必吃',
    subTitle: '为你准备',
  },
)
</script>

<style lang="scss" scoped>
.container {
  width: 750rpx;
  height: 2000rpx;
  background: url('@/static/home-bg.png') no-repeat center;
  background-size: 100% 100%;
  .title {
    height: 30%;
    padding: 5%;
    padding-top: 10rpx;
    .title-text {
      font-size: 56rpx;
      font-weight: 800;
      margin: 10rpx;
      color: #564f47;
    }
  }
  .main {
    width: 750rpx;
    height: 70%;
  }
}
</style>
