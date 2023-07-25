<template>
  <home-layout>
    <view class="container">
        
      <view class="main">
        <uni-notice-bar show-icon scrollable style="margin-top:120rpx;"
          :text="notice" />
        <view class="title">今日套餐详情：</view>
        <view class="dish-box">
          <view class="star">
            <view id="star">
                <text class="iconfont" v-if="!starFlag" id="star-icon">&#xe600;</text>
                <text class="iconfont" v-else id="star-icon-active">&#xe8c6;</text>
              </view>
          </view>
            <swiper :current="activeIndex" class="swiper" circular :indicator-dots="true" :autoplay="false" @change="dishChange">
              <swiper-item v-for="(item, index) in setStore.setList" :key="index">
                <img class="swiper-item" :src="item.image"/>
              </swiper-item>
            </swiper>
            <view class="foot">
              <view class="provider">
                <view class="provider-item">供应商：{{ setStore.setList[activeIndex]?.supplierName }}</view>
                <view class="provider-item">套餐名：{{ setStore.setList[activeIndex]?.name }}</view>
                <view class="provider-item">详情：{{ setStore.setList[activeIndex]?.description }}</view>
                <view style="height: 80rpx; width: 700rpx;"></view>
              </view>
              <button class="confirm-btn" @click="handleConfirm">确认</button>
            </view>
        </view>
        
        <view style="height: 80rpx; width: 700rpx;"></view>
      </view>
    </view>
    
  </home-layout>
  <uni-popup ref="message" type="dialog"  style="position: absolute; top: 1100rpx; right: -200rpx; ">  
          <uni-popup-dialog type="center"  :duration="10000000000" title="你的二维码" >
            <view>
              <img  :src="QRUrl" style="width: 400rpx; height: 400rpx;"/>
              <view  style="font-size: 40rpx; font-weight: 600; text-align: center; margin-top: 20rpx;">{{ code }}</view>
            </view>
          </uni-popup-dialog>  
      </uni-popup> 
</template>

<script setup lang="ts">
import { HomeService } from '@/api/home/home'
import homeLayout from '@/layout/home-layout.vue'
import { useSetStore } from '@/store/set/set'
import { useUserStore } from '@/store/user/user'
import { ref } from 'vue'

// 收藏相关
const starFlag = ref<boolean>(false)

/* 通知相关 */
const notice = ref<string>('今日无通知')
HomeService.getNotice().then(res => {
  if(res.code === 200) {
    notice.value = res.data.notice
  }
})

/* 菜品选择相关 */
const activeIndex = ref<number>(0)
const dishChange = (value: any) => {
  activeIndex.value = value.detail.current
}

/* 菜品相关 */
const setStore = useSetStore()

setStore.getSet()


/* 确认订单 */
const message = ref<any>(null)
const QRUrl = ref<string>('')
const code = ref<string>('')
const handleConfirm =async () => {
  HomeService.putOrder({
    setId: setStore.setList[activeIndex.value].id,
    userId: useUserStore().userInfo.id
  }).then(res => {
    if(res.code === 200) {
      HomeService.getQRcode({
        id: useUserStore().userInfo.id
      }).then(res => {
        if(res.code === 200){
          QRUrl.value = res.data.qrcodeUrl
          code.value = res.data.code
          message.value.open()
        }
      })
    } else if(res.code===-1) {
      HomeService.getQRcode({
        id: useUserStore().userInfo.id
      }).then(res => {
        if(res.code === 200){
          QRUrl.value = res.data.qrcodeUrl
          code.value = res.data.code
          message.value.open()
        }
      })
    }
  })
}

if (useUserStore().userInfo.isOrdered) {
  HomeService.getQRcode({
    id: useUserStore().userInfo.id
  }).then(res => {
    if(res.code === 200){
      QRUrl.value = res.data.qrcodeUrl
      code.value = res.data.code
      message.value.open()
    }
  })
}

</script>

<style lang="scss" scoped>
.container{
  width: 750rpx;
  height: 100%;
  .bank-goup{
    width: 650rpx;
    height: 25%;
    margin: 50rpx;
    background: #eee;
  }
  .main{
    height: 80%;
    .title{
      height: 10%;
      padding: 20rpx;
      font-size: 40rpx;
      font-weight: 700;
    }
    .dish-box{
      width: 700rpx;
      height: fit-content;
      margin: 25rpx;
      border-radius: 20rpx;
      background: #FEC80D;
      .star{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 700rpx;
        height: 80rpx;
        line-height: 80rpx;
        #star{
          padding: 10rpx;
          padding-right: 30rpx;
          #star-icon{
            font-size: 50rpx;
            font-weight: 600;
          }
          
          #star-icon-active{
            font-size: 50rpx;
            color: yellow;
          }
        }
      }
      .swiper{
        width: 450rpx;
        height: 400rpx;
        margin-left: 130rpx;
        margin-bottom: 20rpx;
        .swiper-item {
            border-radius: 30rpx;
            display: block;
            width: 100%;
            height: 100%;
            line-height: 100%;
            text-align: center;
            background-color: red;
          }
      }

      .foot{
        position: relative;
        width: 700rpx;
        .provider{
          padding: 20rpx 40rpx;
          .provider-item{
            font-size: 36rpx;
            font-weight: 600;
            line-height: 50rpx;
            color: #eee;
            padding: 10rpx;
          }
        }
        .confirm-btn{
          position: absolute;
          top: 50rpx;
          right: 20rpx;
          width: 200rpx;
          height: 80rpx;
          color:#FF6F00;
        }
      }
    }
  }
}
</style>
