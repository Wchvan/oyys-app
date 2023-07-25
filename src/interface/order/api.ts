import type { apiResp } from '../api'

/* 获取订单列表 */
export type getOrderListParm = {
  id: number
}

export type getOrderListResp = apiResp<{
  orderList: {
    comment: string
    commentImage: string[]
    date: string
    description: string
    id: number
    image: string
    isCommented: boolean
    isVerified: boolean
    name: string
    star: number
    supplierName: string
  }[]
  total: number
}>

/* 评价 */
export type postReviewParm = {
  comment: string
  id: number
  images: any
  orderId: number
  star: number
}

export type postReviewResp = apiResp<null>
