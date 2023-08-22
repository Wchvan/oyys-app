<template>
  <home-layout>
    <view class="home-container">
      <view class="main">
        <uni-notice-bar
          show-icon
          scrollable
          :text="notice"
          style="
            margin-top: -170rpx;
            background-color: transparent;
            height: 100rpx;
          "
        />
        <view class="bank-goup">
          <view class="bank-item food-bank" @click="goFoodBank">
            <text class="iconfont img">&#xe7fa;</text>
            <text class="text">美食排行</text>
          </view>

          <view class="bank-item" @click="goRecommend">
            <text class="iconfont img img-2">&#xe7f7;</text>
            <text class="text">饭圈推荐</text>
          </view>
        </view>
        <view class="title">今日套餐详情：</view>
        <view class="dish-box">
          <view class="star">
            <view id="star" @click="handleStar">
              <text v-if="!starFlag" id="star-icon" class="iconfont"
                >&#xe600;</text
              >
              <text v-else id="star-icon-active" class="iconfont"
                >&#xe8c6;</text
              >
            </view>
          </view>
          <swiper
            :current="activeIndex"
            class="swiper"
            circular
            :indicator-dots="true"
            :autoplay="false"
            @change="dishChange"
          >
            <swiper-item v-for="(item, index) in setStore.setList" :key="index">
              <img class="swiper-item" :src="item.image" />
            </swiper-item>
          </swiper>
          <view class="foot">
            <view class="provider">
              <view class="tips">左右滑动可查看更多</view>
              <view class="provider-item"
                >供应商：{{ setStore.setList[activeIndex]?.supplierName }}</view
              >
              <view class="provider-item"
                >套餐名：{{ setStore.setList[activeIndex]?.name }}</view
              >
              <view class="provider-item"
                >详情：{{ setStore.setList[activeIndex]?.description }}</view
              >
            </view>
            <button class="confirm-btn" @click="handleConfirm">确认</button>
            <view style="height: 20rpx; width: 650rpx"></view>
          </view>
        </view>
        <view style="height: 40rpx; width: 650rpx"></view>
      </view>
    </view>
  </home-layout>
  <uni-popup
    ref="message"
    type="dialog"
    style="position: absolute; top: 1100rpx; right: -200rpx"
  >
    <uni-popup-dialog type="center" :duration="10000000000" title="你的二维码">
      <view>
        <img :src="QRUrl" style="width: 400rpx; height: 400rpx" />
        <view
          style="
            font-size: 40rpx;
            font-weight: 600;
            text-align: center;
            margin-top: 20rpx;
          "
          >{{ code }}</view
        >
      </view>
    </uni-popup-dialog>
  </uni-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HomeService } from '@/api/home/home'
import homeLayout from '@/layout/home-layout.vue'
import { useSetStore } from '@/store/set/set'
import { useUserStore } from '@/store/user/user'

/* 通知相关 */
const notice = ref<string>('今日无通知')
HomeService.getNotice().then((res) => {
  if (res.code === 200) {
    notice.value = res.data.notice
  }
})

/* 菜品选择相关 */
const activeIndex = ref<number>(0)
const dishChange = (value: any) => {
  activeIndex.value = value.detail.current
  starFlag.value = setStore.setList[activeIndex.value].isLiked
}

/* 菜品相关 */
const setStore = useSetStore()

setStore.getSet().then(res => {
  if (res.code === 200) {
    starFlag.value = setStore.setList[activeIndex.value].isLiked
  }  
})

/* 确认订单 */
const message = ref<any>(null)
const QRUrl = ref<string>('')
const code = ref<string>('')
const handleConfirm = async () => {
  HomeService.putOrder({
    setId: setStore.setList[activeIndex.value].id,
    userId: useUserStore().userInfo.id,
  }).then((res) => {
    if (res.code === 200) {
      HomeService.getQRcode({
        id: useUserStore().userInfo.id,
      }).then((res) => {
        if (res.code === 200) {
          QRUrl.value = res.data.qrcodeUrl
          code.value = res.data.code
          message.value.open()
        }
      })
    } else if (res.code === -1) {
      HomeService.getQRcode({
        id: useUserStore().userInfo.id,
      }).then((res) => {
        if (res.code === 200) {
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
    id: useUserStore().userInfo.id,
  }).then((res) => {
    if (res.code === 200) {
      QRUrl.value = res.data.qrcodeUrl
      code.value = res.data.code
      message.value.open()
    }
  })
}

// 美食排行
const goFoodBank = () => {
  uni.navigateTo({
    url: '/pages/food-bank/food-bank',
  })
}

// 饭圈推荐
const goRecommend = () => {
  uni.navigateTo({
    url: '/pages/recommend/recommend',
  })
}

// 收藏相关
const starFlag = ref<boolean>(false)
const handleStar = async () => {
  if (starFlag.value) {
    const res = await setStore.cancelFavoriteDish(activeIndex.value)
    if (res.code === 200) {
      starFlag.value = false
    }
  } else {
    const res = await setStore.favoriteDish(activeIndex.value)
    if (res.code === 200) {
      starFlag.value = true
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 750rpx;
  height: 100%;
  .bank-goup {
    width: 700rpx;
    height: 25%;
    margin: 20rpx 25rpx;
    background: #fff;
    border-radius: 20rpx 20rpx 0 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .bank-item {
      padding-top: 30rpx;
      flex: 1;
      text-align: center;
      height: 100%;
      .img {
        font-size: 120rpx;
        margin-bottom: 20rpx;
        display: block;
        color: #de868f;
      }
      .img-2 {
        color: #e99d42;
      }
      .text {
        font-size: 36rpx;
        font-weight: 600;
        display: block;
      }
    }
    .food-bank {
      border-right: 1.5px solid #eee;
    }
  }
  .main {
    height: 80%;
    .title {
      height: 80rpx;
      padding: 20rpx;
      font-size: 32rpx;
      font-weight: 600;
      color: #564f47;
    }
    .dish-box {
      width: 650rpx;
      height: fit-content;
      margin: 10rpx 50rpx;
      border-radius: 20rpx;
      // background: rgb(250,220,114);
      background-color: #fff;
      border: 1px solid #eee;
      box-shadow: 10px -10px 10px -4px #ddd;
      .star {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 650rpx;
        height: 80rpx;
        line-height: 80rpx;
        #star {
          padding: 10rpx;
          padding-right: 30rpx;
          #star-icon {
            font-size: 50rpx;
            font-weight: 600;
          }

          #star-icon-active {
            font-size: 50rpx;
            color: #ffab00;
          }
        }
      }
      .swiper {
        width: 350rpx;
        height: 300rpx;
        margin-left: 150rpx;
        margin-bottom: 20rpx;
        .swiper-item {
          border-radius: 30rpx;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 100%;
          text-align: center;
          // background-color: red;
        }
      }

      .foot {
        position: relative;
        width: 650rpx;
        .provider {
          padding: 10rpx 40rpx;
          .tips {
            text-align: center;
            color: #ccc;
            font-size: 28rpx;
            font-weight: 700;
            line-height: 40rpx;
            padding-bottom: 20rpx;
          }
          .provider-item {
            font-size: 36rpx;
            font-weight: 600;
            line-height: 40rpx;
            color: #564f47;
            padding: 10rpx;
          }
        }
        .confirm-btn {
          // position: absolute;
          // top: 50rpx;
          // bottom: 10rpx;
          // right: 20rpx;
          margin-right: 30rpx;
          margin-top: 0rpx;
          width: 180rpx;
          height: 70rpx;
          // color: #ff6f00;
          background-color: #ffab00;
          color: #fff;
          font-size: 36rpx;
          line-height: 70rpx;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
