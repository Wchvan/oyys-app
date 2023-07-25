/* 存放api接口的基本接口格式 */

// 假设接口请求格式
export interface apiParm {
  url: string
  method:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
  data?: any
  params?: any
  header?: any
  hideLoading?: boolean
}

// 假设接口响应通过格式
export interface apiResp<T> {
  code: number
  msg: string
  data: T
}
