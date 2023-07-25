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

    return {
      setList,
      getSet,
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
