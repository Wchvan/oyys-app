<template>
    <view class=" w-full h-full">
        <view class=" title">
            {{ title }}
            <button class="btn" v-if="!orderStore.orderList[index].isCommented" @click="submit">发布</button>
        </view>
        <uni-section title="评分" type="line" padding :titleFontSize="'36rpx'">
            <uni-rate v-model="form.star" :size="35" :disabled="orderStore.orderList[index].isCommented" />
        </uni-section>
        <uni-section title="评价" type="line" padding :titleFontSize="'36rpx'">
            <textarea v-model="form.comment" placeholder="请评价" :disabled="orderStore.orderList[index].isCommented" />
        </uni-section>
        <uni-section title="上传图片" type="line" :titleFontSize="'36rpx'">
            <view class="fileList" v-if="!orderStore.orderList[index].isCommented">
                <uni-file-picker v-model="imagesArr" limit="9" :auto-upload="false" fileMediatype="image" mode="grid"
                    @select="selectFile"></uni-file-picker>
            </view>
            <view class="fileList" v-else>
                <img v-for="item in orderStore.orderList[index].commentImage" :src="item" :key="item"
                    style="width: 100rpx; height: 100rpx; margin: 20rpx;" />
            </view>
        </uni-section>
    </view>
</template>

<script setup lang='ts'>
import { onMounted, getCurrentInstance } from 'vue';
import type { postReviewParm } from '@/interface/order/api';
import { useUserStore } from '@/store/user/user';
import { useOrderStore } from '@/store/order/order'
import { OrderService } from '@/api/order/order';

const id = ref<number>(0)
const title = ref<string>('')
const index = ref<number>(0)
const imagesArr = ref<any[]>([])

onMounted(() => {
    const options = getCurrentInstance()
    id.value = options?.attrs?.id as number
    title.value = options?.attrs?.name as string
    index.value = options?.attrs?.index as number
    form.value.orderId = id.value
})
const orderStore = useOrderStore()

const form = ref<postReviewParm>({
    comment: orderStore.orderList[index.value].comment || '',
    id: useUserStore().userInfo.id,
    images: orderStore.orderList[index.value].commentImage || [],
    orderId: id.value,
    star: orderStore.orderList[index.value].star || 0
})

const selectFile = (res: any) => {
    let { tempFiles } = res

    tempFiles.forEach((ele: any) => {
        let { name, url, uuid, file } = ele
        imagesArr.value.push({
            name,
            url,
            file,
            uuid,
        })
    })
}

const submit = async () => {
    const urlArr = ref<string[]>([])
    const flag = ref<number>(0)


    if (imagesArr.value.length) {
        for (let file of imagesArr.value) {
            let formdata = new FormData()
            formdata.append(file.name, file.file)
            uni.uploadFile({
                url: '/mini/file/upload', //仅为示例，非真实的接口地址
                filePath: (file as any).url,
                name: 'file',
                formData: formdata,
                success: (res: any) => {
                    const data = JSON.parse(res.data)
                    urlArr.value.push(data.data.url)
                    flag.value += 1
                    console.log(urlArr.value)
                    console.log(flag.value, imagesArr.value.length)
                    if (flag.value === imagesArr.value.length) {
                        form.value.images = urlArr.value
                        OrderService.postReview(form.value).then(res => {
                            if (res.code === 200) {
                                uni.showToast({
                                    title: '发布成功'
                                })
                                uni.switchTab({
                                    url: '/pages/order/order'
                                })
                            }
                        })
                    }
                }
            });
        }
    } else {
        OrderService.postReview(form.value).then(res => {
            if (res.code === 200) {
                uni.showToast({
                    title: '发布成功'
                })
                uni.switchTab({
                    url: '/pages/order/order'
                })
            }
        })
    }
}
</script>

<style lang='scss' scoped>
.title {
    font-size: large;
    width: 750rpx;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    font-weight: 600;
    border-bottom: 2px solid #ccc;
    background: #fff;
    position: relative;

    .btn {
        background: #F2950A;
        color: #fff;
        border: 1px solid #F2950A;
        font-size: 28rpx;
        font-weight: 500;
        width: 130rpx;
        position: absolute;
        right: 30rpx;
        top: 20rpx;
        height: 60rpx;
        line-height: 60rpx;
        border-radius: 40rpx;
    }
}

.fileList {
    padding: 20rpx;
}
</style>