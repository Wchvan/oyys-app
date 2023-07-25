import { defineStore } from 'pinia'
import type { userInfoType } from '@/interface/user'
import { UserService } from '@/api/user/user'
import { UserType, type bindUserInfoParm } from '@/interface/user/api'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<userInfoType>({
      dept: '',
      id: -1,
      isOrdered: false,
      name: '',
      token: '',
      userType: UserType.Employee,
    })

    const login = async (params: bindUserInfoParm) => {
      const res = await UserService.bindUserInfo(params)
      if (res.code === 200) {
        userInfo.value = res.data
      }
      return res
    }

    return {
      userInfo,
      login,
    }
  },
  {
    persist: {
      storage: {
        setItem: uni.setStorageSync,
        getItem: uni.getStorageSync,
      },
      key: 'userInfo', //设置存储的key
      paths: ['userInfo'], //指定要长久化的字段
    },
  },
)
