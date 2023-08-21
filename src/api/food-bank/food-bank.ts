import type {
  getProviderChartResp,
  getSetChartResp,
} from '@/interface/food-bank/api'
import { get } from '@/utils/request'

const getSetChart = async () => {
  const res = (await get('/getSetChart', {})) as getSetChartResp
  return res
}

const getProviderChart = async () => {
  const res = (await get('/getSupplierChart', {})) as getProviderChartResp
  return res
}

export class foodBankService {
  static getSetChart = getSetChart
  static getProviderChart = getProviderChart
}
