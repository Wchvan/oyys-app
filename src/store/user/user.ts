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
      workNum: '',
    })

    const login = async (params: bindUserInfoParm) => {
      const res = await UserService.bindUserInfo(params)
      if (res.code === 200) {
        userInfo.value = { ...res.data, workNum: params.workNum }
      }
      return res
    }

    const logout = async () => {
      userInfo.value = {
        dept: '',
        id: -1,
        isOrdered: false,
        name: '',
        token: '',
        userType: UserType.Employee,
        workNum: '',
      }
      uni.redirectTo({
        url: '/pages/login/login',
      })
    }

    return {
      userInfo,
      login,
      logout,
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
