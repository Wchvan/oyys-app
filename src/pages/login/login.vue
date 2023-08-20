<template>
  <view class="container">
    <view class="login-card">
      <view class="img"></view>
      <view class="title"> 食刻 </view>
      <form class="form">
        <input
          v-model="form.workNum"
          type="text"
          placeholder="  工号"
          class="input"
        />
        <input
          v-model="form.dept"
          type="text"
          placeholder="  部门"
          class="input"
        />
        <input
          v-model="form.name"
          type="text"
          placeholder="  姓名"
          class="input"
        />
        <button class="btn" @click="submit">提交</button>
      </form>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { bindUserInfoParm } from '@/interface/user/api'
import { useUserStore } from '@/store/user/user'

const userStore = useUserStore()
const form = ref<bindUserInfoParm>({
  name: '',
  workNum: '',
  dept: '',
})

const submit = () => {
  for (const i in form.value) {
    if (form.value[i as keyof bindUserInfoParm] === '') {
      uni.showToast({
        title: '请为每个输入框填写好字段',
        icon: 'none',
      })
    }
  }
  userStore.login(form.value).then((res) => {
    if (res.code === 200) {
      uni.switchTab({
        url: '/pages/index/index',
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  height: 1500rpx;
  width: 750rpx;
  background: url('@/static/login-card-bg.png') no-repeat center;
  background-size: 100% 100%;
  .login-card {
    border-radius: 30rpx 30rpx 0 0;
    position: absolute;
    bottom: 0;
    height: 70%;
    width: 750rpx;
    display: flex;
    flex-direction: column;
    .title {
      top: 60rpx;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 55rpx;
      font-weight: 800;
    }
    .form {
      top: 150rpx;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      .input {
        border: 1px solid rgba(17, 17, 17, 0.3);
        margin: 10rpx;
        width: 500rpx;
        height: 70rpx;
        line-height: 70rpx;
        text-indent: 0.5rem;
      }
      .btn {
        margin-top: 30rpx;
        width: 300rpx;
        background-color: #f2950a;
        color: #fff;
        font-weight: 600;
      }
    }
  }
}
</style>
