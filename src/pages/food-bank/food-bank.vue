<template>
    <view class="container">
        <view class="select-wrapper">
            <uni-data-select
                class="select"
                v-model="value"
                :localdata="range"
                @change="handleChange"
                :clear="false"
            ></uni-data-select>
        </view>
        <view class="top">
            <view class="second item">
                <text class="iconfont second-icon">&#xe872;</text>
                <view class="text" v-if="value==='套餐'">XX套餐<br>XX供应商</view>
                <view class="text" v-else>XX供应商</view>
            </view>
            <view class="first item">
                <text class="iconfont first-icon">&#xe872;</text>
                <view class="text" v-if="value==='套餐'">XX套餐<br>XX供应商</view>
                <view class="text" v-else>XX供应商</view>
            </view>
            <view class="third item">
                <text class="iconfont third-icon">&#xe872;</text>
                <view class="text" v-if="value==='套餐'">XX套餐<br>XX供应商</view>
                <view class="text" v-else>XX供应商</view>
            </view>
        </view>
        <view class="main">
            <view v-for=" item in 7" :key="item" class="bank-item">
                <text>{{item+3}}. &ensp;</text>
                <text>{{ value==='套餐' ? 'XX套餐 - XX供应商' : 'XX供应商' }}</text>
            </view>
        </view>
    </view>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
const value = ref<string>('套餐')
const range = [
    { value: '供应商', text: '供应商' },
    { value: '套餐', text: '套餐' }
]
const handleChange = (value: string) => {
    console.log(value)
} 
</script>

<style lang='scss' scoped>
.container{
    width: 750rpx;
    height: fit-content;
    background: url('@/static/all-bg.png') no-repeat center;
    background-size: 100% 100%;
    overflow: hidden;
    .select-wrapper{
        padding-top: 40rpx;
        width: 500rpx;
        margin-left: 125rpx;
        .select{
            background: #fff;
            border-radius: 10rpx;
            // overflow: hidden;
            text-align: center;
        }
    }
    .top{
        width: 700rpx;
        height: 400rpx;
        margin: 25rpx;
        margin-top: 50rpx;
        display: flex;
        flex-direction: row;
        .item{
            border-radius: 20rpx;
            background:rgba(255, 171, 0, 0.6);
            flex:1;
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
            .iconfont{
                font-size: 100rpx;
            }
            .first-icon{
                color: yellow;
            }
            .second-icon{
                color: #ccc;
            }
            .third-icon{
                color: darkorange;
            }
            .text{
                line-height:40rpx ;
                font-size: 32rpx;
                margin-top: 20rpx;
                text-align: center;
            }
        }
        .second, .third{
            margin-top: 100rpx;
        }
    }
    .main{
        width: 750rpx;
        height: 950rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-top: 2px  solid #eee;
        box-shadow: 0px -5px 10px -5px  rgba(18, 18, 18, 0.3);
        margin-top: 50rpx;
        border-radius: 50rpx 50rpx 0 0 ;
        padding: 37.5rpx 0 ;
        .bank-item{
            width: 700rpx;
            margin:0  25rpx;
            line-height: 125rpx;
            text-indent: 1rem;
            height: 125rpx;
            border-bottom: 1.5px solid #eee;
            // border-radius: 20rpx;
            // background-color: rgba(247,217,146);
        }
    }
}
</style>