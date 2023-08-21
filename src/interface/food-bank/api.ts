import type { apiResp } from '../api'

export type getSetChartResp = apiResp<{
  setList: {
    description: string
    flavor: string
    id: number
    image: string[]
    name: string
    onSale: boolean
    supplierName: string
    today: boolean
    weight: string
  }[]
}>

export type getProviderChartResp = apiResp<{
  supplierList: {
    avg: number
    id: number
    name: string
    num: number
  }[]
}>
