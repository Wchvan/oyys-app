import type {
  getListResp,
  getNoticeResp,
  getQRCodeParm,
  getQRCodeResp,
  putOrderParm,
  putOrderResp,
} from '@/interface/home/api'
import { get, post } from '@/utils/request'

const getList = async () => {
  const res = (await get('/getTodaySets', {})) as getListResp
  return res
}

const getQRcode = async (params: getQRCodeParm) => {
  const res = (await get('/getQRCode', params)) as getQRCodeResp
  return res
}

const putOrder = async (params: putOrderParm) => {
  const res = (await post('/putOrder', params)) as putOrderResp
  return res
}

const getNotice = async () => {
  const res = (await get('/setList/getNotice', {})) as getNoticeResp
  return res
}

export class HomeService {
  static getList = getList
  static getQRcode = getQRcode
  static putOrder = putOrder
  static getNotice = getNotice
}
