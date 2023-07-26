import request from './request'
import type { apiResp } from '@/interface/api'
import { useUserStore } from '@/store/user/user'

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
    if (res.code === 1 || useUserStore().userInfo.id === -1) {
      uni.redirectTo({ url: '/pages/login/login' })
    }
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
    if (res.code === 1 || useUserStore().userInfo.id === -1) {
      uni.redirectTo({ url: '/pages/login/login' })
    }
  }
  return res
}
