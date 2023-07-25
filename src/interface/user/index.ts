import type { UserType } from './api'

export type userInfoType = {
  dept: string
  id: number
  isOrdered: boolean
  name: string
  token: string
  userType: UserType
}
