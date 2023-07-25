import type { bindUserInfoParm, bindUserInfoResp } from '@/interface/user/api'
import { post } from '@/utils/request'

export const bindUserInfo = async (params: bindUserInfoParm) => {
  const res = (await post('/userlogin', params)) as bindUserInfoResp
  return res
}

export class UserService {
  static bindUserInfo = bindUserInfo
}
