import type {
  bindUserInfoParm,
  bindUserInfoResp,
  getFavoritesParm,
  getFavoritesResp,
  logoutResp,
} from '@/interface/user/api'
import { get, post } from '@/utils/request'

/* 绑定用户信息以登录 */
const bindUserInfo = async (params: bindUserInfoParm) => {
  const res = (await post('/userlogin', params)) as bindUserInfoResp
  return res
}

/* 退出登录 */
const logout = async () => {
  const res = (await post('/userlogout', {})) as logoutResp
  return res
}

/* 获取用户收藏过的列表 */
const getFavorites = async (params: getFavoritesParm) => {
  const res = (await get('/getLikes', params)) as getFavoritesResp
  return res
}

export class UserService {
  static bindUserInfo = bindUserInfo
  static logout = logout
  static getFavorites = getFavorites
}
