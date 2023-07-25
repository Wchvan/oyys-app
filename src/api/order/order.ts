import type {
  getOrderListParm,
  getOrderListResp,
  postReviewParm,
  postReviewResp,
} from '@/interface/order/api'
import { get, post } from '@/utils/request'

const getOrderList = async (params: getOrderListParm) => {
  const res = (await get('/getHistoryOrders', params)) as getOrderListResp
  return res
}

const postReview = async (params: postReviewParm) => {
  const res = (await post('/postComment', params)) as postReviewResp
  return res
}

export class OrderService {
  static getOrderList = getOrderList
  static postReview = postReview
}
