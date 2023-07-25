import request from '../request/request'
import type { apiResp } from '@/interface/api'

export type uploadFileResp = apiResp<{
  filename: string
  suffix: string
  url: string
}>

export const uploadFile = async (params: any) => {
  const fileFormData = new FormData()
  fileFormData.append('file', params)
  const res = (await request({
    url: '/mini/file/upload',
    data: fileFormData,
    method: 'POST',
    header: {
      'Content-Type': 'multipart/form-data',
    },
  })) as uploadFileResp
  return res
}
