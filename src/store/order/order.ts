import { defineStore } from 'pinia'
import { useUserStore } from '../user/user'
import type { orderDataType } from '@/interface/order'
import { OrderService } from '@/api/order/order'

export const useOrderStore = defineStore(
  'order',
  () => {
    const orderList = ref<orderDataType[]>([])

    const getOrder = async () => {
      const res = await OrderService.getOrderList({
        id: useUserStore().userInfo.id,
      })
      if (res.code === 200) {
        orderList.value = res.data.orderList
      }
      return res
    }

    return {
      orderList,
      getOrder,
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
