import { defineStore } from 'pinia'
import type { setDataType } from '@/interface/home'
import { HomeService } from '@/api/home/home'

export const useSetStore = defineStore(
  'set',
  () => {
    const setList = ref<setDataType[]>([])

    const getSet = async () => {
      const res = await HomeService.getList()
      if (res.code === 200) {
        setList.value = res.data.setList
      }
      return res
    }

    /* 收藏 */
    const favoriteDish = async (index: number) => {
      const res = await HomeService.favoriteDish({
        id: setList.value[index].id,
      })
      if (res.code === 200) {
        setList.value[index].isLiked = true
      }
      return res
    }
    /* 取消收藏 */
    const cancelFavoriteDish = async (index: number) => {
      const res = await HomeService.cancelFavoriteDish({
        id: setList.value[index].id,
      })
      if (res.code === 200) {
        setList.value[index].isLiked = false
      }
      return res
    }

    return {
      setList,
      getSet,
      favoriteDish,
      cancelFavoriteDish,
    }
  },
  //   {
  //     persist: {
  //       storage: {
  //         setItem: uni.setStorageSync,
  //         getItem: uni.getStorageSync,
  //       },
  //       key: 'userInfo', //设置存储的key
  //       paths: ['userInfo.username', 'userInfo.token'], //指定要长久化的字段
  //     },
  //   },
)
