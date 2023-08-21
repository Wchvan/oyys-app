<template>
  <view class="container">
    <view class="select-wrapper">
      <uni-data-select v-model="selectValue" class="select" :localdata="range" :clear="false"
        @change="handleChange"></uni-data-select>
    </view>
    <view class="top" v-if="selectValue === '套餐' && setList.length">
      <view class="second item">
        <text class="iconfont second-icon">&#xe872;</text>
        <view  class="text">{{ setList[1].name }} <br/> {{ setList[1].supplierName }}</view>
      </view>
      <view class="first item">
        <text class="iconfont first-icon">&#xe872;</text>
        <view  class="text">{{ setList[0].name }} <br/> {{ setList[0].supplierName }}</view>
      </view>
      <view class="third item">
        <text class="iconfont third-icon">&#xe872;</text>
        <view  class="text">{{ setList[2].name }} <br/> {{ setList[2].supplierName }}</view>
      </view>
    </view>
    <view class="main" v-if="selectValue === '套餐' && setList.length">
      <view  v-for="(item, index) in setList.slice(2)" :key="index" class="bank-item">
        <text>{{ index + 3 }}. &ensp;</text>
        <text>{{ `${item.name} - ${item.supplierName}` }}</text>
      </view>
    </view>
    
    <view class="top" v-if="selectValue !== '套餐' && supplierList.length">
      <view class="second item">
        <text class="iconfont second-icon">&#xe872;</text>
        <view class="text">{{ supplierList[1].name }}</view>
      </view>
      <view class="first item">
        <text class="iconfont first-icon">&#xe872;</text>
        <view class="text">{{ supplierList[0].name }}</view>
      </view>
      <view class="third item">
        <text class="iconfont third-icon">&#xe872;</text>
        <view class="text">{{ supplierList[2].name }}</view>
      </view>
    </view>
    <view class="main" v-if="selectValue !== '套餐' && supplierList.length">
      <view  v-for="(item, index) in supplierList.slice(2)" :key="item.id" class="bank-item">
        <text>{{ index + 3 }}. &ensp;</text>
        <text>{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { setListType, supplierListType } from '@/interface/food-bank'
import { foodBankService } from '@/api/food-bank/food-bank'

const selectValue = ref<string>('套餐')
const range = [
  { value: '供应商', text: '供应商' },
  { value: '套餐', text: '套餐' },
]

const setList = ref<setListType>([])
const supplierList = ref<supplierListType>([])

const getSet = async () => {
  const res = await foodBankService.getSetChart()
  if (res.code === 200) {
    setList.value = res.data.setList
  }
}

getSet()

const getProvider =async () => {
  const res = await foodBankService.getProviderChart()
  if (res.code === 200) {
    supplierList.value = res.data.supplierList
  }
}
const handleChange = (value: string) => {
  selectValue.value = value
  if (value === '套餐') {
    getSet()
  } else {
    getProvider()
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 750rpx;
  height: fit-content;
  background: url('@/static/all-bg.png') no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;

  .select-wrapper {
    padding-top: 40rpx;
    width: 500rpx;
    margin-left: 125rpx;

    .select {
      background: #fff;
      border-radius: 10rpx;
      // overflow: hidden;
      text-align: center;
    }
  }

  .top {
    width: 700rpx;
    height: 400rpx;
    margin: 25rpx;
    margin-top: 50rpx;
    display: flex;
    flex-direction: row;

    .item {
      border-radius: 20rpx;
      background: rgba(255, 171, 0, 0.6);
      flex: 1;
      margin-right: 10rpx;
      height: fit-content;
      min-height: 200rpx;
      padding: 30rpx;
      text-align: center;

      // .img{
      //     height: 120rpx;
      //     width: 80%;
      //     margin-left: 10%;
      // }
      .iconfont {
        font-size: 100rpx;
      }

      .first-icon {
        color: yellow;
      }

      .second-icon {
        color: #ccc;
      }

      .third-icon {
        color: darkorange;
      }

      .text {
        line-height: 40rpx;
        font-size: 28rpx;
        margin-top: 20rpx;
        text-align: center;
      }
    }

    .second,
    .third {
      margin-top: 100rpx;
    }
  }

  .main {
    width: 750rpx;
    height: 950rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-top: 2px solid #eee;
    box-shadow: 0px -5px 10px -5px rgba(18, 18, 18, 0.3);
    margin-top: 50rpx;
    border-radius: 50rpx 50rpx 0 0;
    padding: 37.5rpx 0;

    .bank-item {
      width: 700rpx;
      margin: 0 25rpx;
      line-height: 125rpx;
      text-indent: 1rem;
      height: 125rpx;
      border-bottom: 1.5px solid #eee;
      // border-radius: 20rpx;
      // background-color: rgba(247,217,146);
    }
  }
}</style>
