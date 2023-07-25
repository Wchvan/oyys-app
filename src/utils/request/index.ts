import request from './request'
import type { apiResp } from '@/interface/api'

export async function get<T>(url: string, data: object) {
  const res = (await request({
    url,
    params: data,
    method: 'GET',
  })) as apiResp<T>
  if (res.code !== 200) {
    uni.showToast({
      title: res.msg,
      icon: 'none',
    })
  }
  return res
}

export async function post<T>(url: string, data: object) {
  const res = (await request({
    url,
    data,
    method: 'POST',
  })) as apiResp<T>

  if (res.code !== 200) {
    uni.showToast({
      title: res.msg,
      icon: 'none',
    })
  }
  return res
}
