import type { apiParm } from '@/interface/api'
import { useUserStore } from '@/store/user/user'

let defalutPATH: string // 声明默认请求地址头
const defaultTokenKey = 'token'

defalutPATH = '/mini'

class Request {
  public http(param: apiParm) {
    // 请求参数
    let url = param.url,
      method = param.method,
      header = param.header || {},
      data = param.data || {},
      params = param.params || {},
      token = useUserStore().userInfo.token || '',
      hideLoading = param.hideLoading || false

    // 拼接完整请求地址
    let requestUrl = defalutPATH + url
    if (Object.keys(params).length !== 0) {
      requestUrl += '?'
      let flag = false
      for (const i in params) {
        if (flag) requestUrl += '&'
        requestUrl += `${i}=${params[i]}`
        if (!flag) flag = true
      }
    }

    // 请求方式:GET或POST(POST需配置
    if (method && !('Content-Type' in header)) {
      if (method === 'POST') {
        header = {
          'content-type': 'application/json',
        }
      } else {
        header = {
          'content-type': 'application/json',
        }
      }
    }

    if (token) {
      const key = defaultTokenKey
      header[key] = token
    }

    // 加载圈
    if (!hideLoading) {
      uni.showLoading({
        title: '加载中...',
      })
    }

    // 返回promise
    return new Promise((resolve) => {
      // 请求
      uni.request({
        url: requestUrl,
        data,
        method,
        header,
        success: (res) => {
          // 判断 请求api 格式是否正确
          if (res.statusCode && res.statusCode !== 200) {
            uni.showToast({
              title: `请求错误：${res.errMsg}`,
              icon: 'none',
            })
            return
          }
          // 将结果抛出
          resolve(res.data)
        },
        // 请求失败
        fail: (e) => {
          uni.showToast({
            title: `${e.errMsg}`,
            icon: 'none',
          })
          resolve(e.errMsg)
        },
        // 请求完成
        complete() {
          // 隐藏加载
          if (!hideLoading) {
            uni.hideLoading()
          }
        },
      })
    })
  }
}

export default new Request().http
