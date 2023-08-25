<template>
  <view class="w-full h-full" style="padding-top: 30rpx">
    <view
      v-for="(item, index) in orderStore.orderList"
      :key="index"
      class="order-card"
    >
      <view class="img card-item">
        <img :src="item.image" alt="" style="width: 100%; height: 100%" />
      </view>
      <view class="detail card-item">
        <view class="name">{{ item.name }}</view>
        <view class="provider">{{ item.supplierName }}</view>
      </view>
      <view class="card-item">
        <view class="date">{{ item.date }}</view>
        <button
          class="btn"
          :disabled="!item.isVerified"
          @click="review(item.id, item.supplierName, index)"
        >
          {{ buttonText(item) }}
          <!-- {{ item.isCommented ? '详情' : '评价' }} -->
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { orderDataType } from '@/interface/order'
import { useOrderStore } from '@/store/order/order'

const orderStore = useOrderStore()
orderStore.getOrder()

onShow(() => {
  orderStore.getOrder()
})

const review = (id: number, name: string, index: number) => {
  uni.navigateTo({
    url: `/pages/order/order-detail/order-detail?id=${id}&name=${name}&index=${index}`,
  })
}

const buttonText = (item: orderDataType) => {
  if (!item.isVerified) {
    return '待核销'
  } else {
    if (!item.isCommented) {
      return '待评价'
    } else {
      return '详情'
    }
  }
}
</script>

<style lang="scss" scoped>
.order-card {
  width: 700rpx;
  margin: 25rpx;
  height: 200rpx;
  background-color: rgb(248, 239, 216);
  display: flex;
  flex-direction: row;
  margin-bottom: 60rpx;

  .card-item {
    flex: 1;
    height: 200rpx;
    margin: 0 10rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .date {
      font-size: 28rpx;
      padding-left: 15rpx;
      line-height: 30rpx;
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
    }
  }

  .img {
    flex: 1.2;
    border-radius: 10rpx;
    overflow: hidden;
    height: 200rpx;
    position: relative;
    top: -40rpx;
    left: 10rpx;
  }

  .detail {
    padding-left: 30rpx;
    padding-top: 10rpx;
    flex: 1.2;
    font-size: 32rpx;
    justify-content: flex-start;
    line-height: 40rpx;
    .name {
      font-size: 36rpx;
      line-height: 60rpx;
      font-weight: 700;
    }
  }
}
</style>
