import { defineStore } from 'pinia'
import type { favoriteSetListType, userInfoType } from '@/interface/user'
import { UserService } from '@/api/user/user'
import { UserType, type bindUserInfoParm } from '@/interface/user/api'
import { HomeService } from '@/api/home/home'

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

    const favoriteSetList = ref<favoriteSetListType[]>([])

    const login = async (params: bindUserInfoParm) => {
      const res = await UserService.bindUserInfo(params)
      if (res.code === 200) {
        userInfo.value = { ...res.data, workNum: params.workNum }
      }
      return res
    }

    const logout = async () => {
      UserService.logout()
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

    /* 获取收藏列表 */
    const getFavorites = async () => {
      const res = await UserService.getFavorites({ id: userInfo.value.id })
      if (res.code === 200) {
        favoriteSetList.value = res.data.setList
      }
      return res
    }

    /* 收藏 */
    const favoriteDish = async (index: number) => {
      const res = await HomeService.favoriteDish({
        id: favoriteSetList.value[index].id,
      })
      if (res.code === 200) {
        favoriteSetList.value[index].isLiked = true
      }
      return res
    }

    /* 取消收藏 */
    const cancelFavoriteDish = async (index: number) => {
      const res = await HomeService.cancelFavoriteDish({
        id: favoriteSetList.value[index].id,
      })
      if (res.code === 200) {
        favoriteSetList.value[index].isLiked = false
      }
      return res
    }

    return {
      userInfo,
      favoriteSetList,
      login,
      logout,
      getFavorites,
      favoriteDish,
      cancelFavoriteDish,
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
