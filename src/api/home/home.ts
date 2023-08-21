import type {
  cancelFavoriteDishParm,
  favoriteDishParm,
  favoriteDishResp,
  getListResp,
  getNoticeResp,
  getQRCodeParm,
  getQRCodeResp,
  putOrderParm,
  putOrderResp,
} from '@/interface/home/api'
import { get, post } from '@/utils/request'

/* 获取菜品列表 */
const getList = async () => {
  const res = (await get('/getTodaySets', {})) as getListResp
  return res
}

/* 获取核销码 */
const getQRcode = async (params: getQRCodeParm) => {
  const res = (await get('/getQRCode', params)) as getQRCodeResp
  return res
}

/* 点单 */
const putOrder = async (params: putOrderParm) => {
  const res = (await post('/putOrder', params)) as putOrderResp
  return res
}

/* 获取通知信息 */
const getNotice = async () => {
  const res = (await get('/setList/getNotice', {})) as getNoticeResp
  return res
}

/* 收藏 */
const favoriteDish = async (params: favoriteDishParm) => {
  const res = (await get('/Like', params)) as favoriteDishResp
  return res
}

/* 取消收藏 */
const cancelFavoriteDish = async (params: cancelFavoriteDishParm) => {
  const res = (await get('/cancelLike', params)) as favoriteDishResp
  return res
}

export class HomeService {
  static getList = getList
  static getQRcode = getQRcode
  static putOrder = putOrder
  static getNotice = getNotice
  static favoriteDish = favoriteDish
  static cancelFavoriteDish = cancelFavoriteDish
}
