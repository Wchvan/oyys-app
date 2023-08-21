import type {
  getCommentsParm,
  getCommentsResp,
  likeCommendParm,
  likeCommendResp,
} from '@/interface/recommend/api'
import { get, post } from '@/utils/request'

const getComments = async (params: getCommentsParm) => {
  const res = (await post('/getComments', params)) as getCommentsResp
  return res
}

const likeCommend = async (params: likeCommendParm) => {
  const res = (await get('/commentLike', params)) as likeCommendResp
  return res
}

export class RecommendService {
  static getComments = getComments
  static likeCommend = likeCommend
}
