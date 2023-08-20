<template>
    <view class="container">
        <view class="top">
            <view class="user-wrapper">
                <view class="avatar">
                    {{ userStore.userInfo.name.slice(-1) }}
                </view>
                <view class="user-info">
                    <view class="username">
                        {{ userStore.userInfo.name }}
                    </view>
                    <view class="dept">
                        部门：{{ userStore.userInfo.dept }} &ensp;
                        工号：{{ userStore.userInfo.workNum }}
                    </view>
                </view>
            </view>
            <view class="function">
                <view class="code function-item" @click="handleConfirm">
                    <text class="iconfont img">&#xe8cb;</text>
                    <text class="text">订单核验码</text>
                </view>
                <view class="order function-item" @click="goOrder">
                    <text class="iconfont img">&#xe8cc;</text>
                    <text class="text">历史订单</text>
                </view>
            </view>
        </view>
        <view class="main">
            <view class="favorites main-item" @click="goFavorites">
                <text class="iconfont main-text">&#xe8c9;&ensp; 我的收藏</text>
                <text class="iconfont arrow">&#xe8ca;</text>
            </view>
            <view class="logout main-item" @click="logout">
                <text class="iconfont main-text">&#xe8c7;&ensp; 退出登录</text>
                <text class="iconfont arrow">&#xe8ca;</text>
            </view>
        </view>
    </view>
    <uni-popup ref="message" type="dialog" style="position: absolute; top: 1100rpx; right: -200rpx">
        <uni-popup-dialog type="center" :duration="10000000000" title="你的二维码">
            <view>
                <img :src="QRUrl" style="width: 400rpx; height: 400rpx" />
                <view style="
                font-size: 40rpx;
                font-weight: 600;
                text-align: center;
                margin-top: 20rpx;
            ">{{ code }}</view>
            </view>
        </uni-popup-dialog>
    </uni-popup>
</template>

<script setup lang='ts'>
import { HomeService } from "@/api/home/home";
import { useUserStore } from "@/store/user/user";

const userStore = useUserStore()

// 订单核验码
const message = ref<any>(null)
const QRUrl = ref<string>('')
const code = ref<string>('')
const handleConfirm = async () => {
    HomeService.getQRcode({
        id: useUserStore().userInfo.id,
    }).then((res) => {
        if (res.code === 200) {
            QRUrl.value = res.data.qrcodeUrl
            code.value = res.data.code
            message.value.open()
        } else {
            uni.showToast({
                title: '你还未点单',
                icon: 'none',
            })
        }
    })
}

// 历史订单
const goOrder = () => {
    uni.navigateTo({
        url: '/pages/order/order'
    })
}

// 我的收藏
const goFavorites = () => {
    uni.navigateTo({
        url: '/pages/favorites/favorites'
    })
}

// 退出登录
const logout = () => {
    userStore.logout()
}
</script>

<style lang='scss' scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 750rpx;
    height: 1500rpx;
    background: url('@/static/all-bg.png') no-repeat center;
    background-size: 100% 100%;
    .top {
        width: 750rpx;
        height: 450rpx;
        // background-color: #FEC80D;
        position: relative;

        .user-wrapper {
            position: absolute;
            left: 30rpx;
            top: 60rpx;
            display: flex;
            flex-direction: row;
            justify-content: center;

            .avatar {
                width: 130rpx;
                height: 130rpx;
                background-color: #FFAB00;
                border-radius: 50%;
                text-align: center;
                line-height: 130rpx;
                font-size: 45rpx;
                font-weight: 500;
                color: white;
                margin: 0 25rpx;
            }

            .user-info {
                height: 130rpx;
                flex-direction: column;
                display: flex;
                justify-content: center;

                .username {
                    font-size: 36rpx;
                    margin-bottom: 10rpx;
                }

                .dept {
                    font-size: 30rpx;
                }
            }
        }

        .function {
            position: absolute;
            bottom: 0;
            width: 700rpx;
            left: 25rpx;
            height: 220rpx;
            background-color: #fff;
            border-radius: 20rpx 20rpx 0 0;
            display: flex;
            flex-direction: row;
            justify-content: space-around;

            .function-item {
                padding-top: 50rpx;
                text-align: center;
                flex:1;
                .img {
                    font-size: 100rpx;
                    color: rgba(255, 111, 0, 0.8);
                    margin-bottom: 20rpx;
                    display: block;
                }

                .text {
                    font-size: 32rpx;
                    display: block;
                }
            }
            .code{
                border-right: 1.5px solid #eee;
            }
        }
    }

    .main {
        margin: 20rpx;
        margin-top: 100rpx;
        width: 710rpx;
        height: 500rpx;
        display: flex;
        flex-direction: column;
        
        .main-item {
            height: 125rpx;
            text-indent: 1rem;
            // background-color: #f9f8f8;
            line-height: 125rpx;
        }

        .main-text {
            font-size: 36rpx;
        }

        .arrow {
            font-size: 32rpx;
            float: right;
            color: rgb(18, 18, 18, 0.4);
            margin-right: 15rpx;
        }

        .favorites {
            border-bottom: 1.5px solid #eee;
        }

        // .logout {
        //     border-radius: 0 0 15rpx 15rpx;
        // }
    }
}
</style>