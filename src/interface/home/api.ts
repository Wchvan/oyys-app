import type { apiResp } from '../api'

/* 获取菜品列表 */
export type getListResp = apiResp<{
  setList: {
    description: string
    flavor: string
    id: number
    image: string
    name: string
    supplierName: string
    weight: string
  }[]
}>

/* 获取核销码 */
export type getQRCodeParm = {
  id: number
}

export type getQRCodeResp = apiResp<{
  code: string
  qrcodeUrl: string
}>

/* 点单 */
export type putOrderParm = {
  setId: number
  userId: number
}

export type putOrderResp = apiResp<null>

/* 获取通知信息 */
export type getNoticeResp = apiResp<{
  notice: string
}>
