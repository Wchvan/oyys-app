<template>
  <view class="w-full h-full">
    <view class="title">
      {{ title }}
      <button
        v-if="!orderStore.orderList[index].isCommented"
        class="btn"
        @click="submit"
      >
        发布
      </button>
    </view>
    <uni-section title="评分" type="line" padding :title-font-size="'36rpx'">
      <uni-rate
        v-model="form.star"
        :size="35"
        :disabled="orderStore.orderList[index].isCommented"
      />
    </uni-section>
    <uni-section title="评价" type="line" padding :title-font-size="'36rpx'">
      <textarea
        v-model="form.comment"
        placeholder="请评价"
        :disabled="orderStore.orderList[index].isCommented"
      />
    </uni-section>
    <uni-section title="上传图片" type="line" :title-font-size="'36rpx'">
      <view v-if="!orderStore.orderList[index].isCommented" class="fileList">
        <uni-file-picker
          v-model="imagesArr"
          limit="9"
          :auto-upload="false"
          file-mediatype="image"
          mode="grid"
          @select="selectFile"
        ></uni-file-picker>
      </view>
      <view v-else class="fileList">
        <img
          v-for="item in orderStore.orderList[index].commentImage"
          :key="item"
          :src="item"
          style="width: 200rpx; height: 200rpx; margin: 20rpx"
        />
      </view>
    </uni-section>
  </view>
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance } from 'vue'
import type { postReviewParm } from '@/interface/order/api'
import { useUserStore } from '@/store/user/user'
import { useOrderStore } from '@/store/order/order'
import { OrderService } from '@/api/order/order'

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
  star: orderStore.orderList[index.value].star || 0,
})

const selectFile = (res: any) => {
  const { tempFiles } = res

  tempFiles.forEach((ele: any) => {
    const { name, url, uuid, file } = ele
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
    for (const file of imagesArr.value) {
      const formdata = new FormData()
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
            OrderService.postReview(form.value).then((res) => {
              if (res.code === 200) {
                uni.showToast({
                  title: '发布成功',
                })
                uni.switchTab({
                  url: '/pages/order/order',
                })
              }
            })
          }
        },
      })
    }
  } else {
    OrderService.postReview(form.value).then((res) => {
      if (res.code === 200) {
        uni.showToast({
          title: '发布成功',
        })
        uni.switchTab({
          url: '/pages/order/order',
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
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
    background: #f2950a;
    color: #fff;
    border: 1px solid #f2950a;
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
