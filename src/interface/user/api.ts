import type { apiResp } from '../api'

/* 绑定用户信息 */
export type bindUserInfoParm = {
  dept: string
  name: string
  workNum: string
}

export type bindUserInfoResp = apiResp<{
  dept: string
  id: number
  isOrdered: boolean
  name: string
  token: string
  userType: UserType
}>

export enum UserType {
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
  Manager = 'MANAGER',
}

/* 用户退出 */
export type logoutResp = apiResp<null>

/* 获取收藏过的菜品列表 */
export type getFavoritesParm = {
  id: number
}

export type getFavoritesResp = apiResp<{
  setList: {
    description: string
    flavor: string
    id: number
    image: string
    isLiked: boolean
    name: string
    onSale: boolean
    supplierName: string
    today: boolean
    weight: string
  }[]
}>
