<template>
  <view class="w-full h-full">
    <view
      v-for="(item, index) in userStore.favoriteSetList"
      :key="index"
      class="order-card"
    >
      <view class="img card-item">
        <img
          :src="item.image"
          alt=""
          style="width: 80%; height: 80%; margin-left: 10%"
        />
      </view>
      <view class="detail card-item">
        <view class="name">{{ item.name }}</view>
        <view class="provider">{{ item.supplierName }}</view>
      </view>
      <view class="card-item">
        <view
          class="sale"
          :class="getStatus(item) !== '今日在售' ? 'sale-disable' : ''"
          >{{ getStatus(item) }}</view
        >
        <button class="btn" @click="handleLike(index, item.isLiked)">
          {{ item.isLiked ? '取消收藏' : '收藏' }}
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { favoriteSetListType } from '@/interface/user'
import { useUserStore } from '@/store/user/user'

const userStore = useUserStore()
userStore.getFavorites()

const getStatus = (item: favoriteSetListType) => {
  if (item.today) {
    return '今日在售'
  } else if (item.onSale) {
    return '今日未上架'
  } else {
    return '已下架'
  }
}

const handleLike = (index: number, liked: boolean) => {
  if (liked) {
    userStore.cancelFavoriteDish(index)
  } else {
    userStore.favoriteDish(index)
  }
}
</script>

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
    .sale {
      padding-top: 10rpx;
      font-size: 32rpx;
      // padding-left: 15rpx;
      text-align: center;
      font-weight: 600;
      color: #f2783b;
    }
    .sale-disable {
      color: #ccc;
    }
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
      margin-bottom: 20rpx;
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
