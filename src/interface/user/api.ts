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
