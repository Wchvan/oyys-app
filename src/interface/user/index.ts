import type { UserType } from './api'

export type userInfoType = {
  dept: string
  id: number
  isOrdered: boolean
  name: string
  token: string
  userType: UserType
  workNum: string
}

export type favoriteSetListType = {
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
}
