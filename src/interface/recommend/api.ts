import type { apiResp } from '../api'

/* 获取评论列表 */
export type getCommentsParm = {
  page: number
  pageSize: number
}

export type getCommentsResp = apiResp<{
  commentList: {
    comment: string
    id: number
    image: string[]
    isLiked: boolean
    likeNum: number
    name: string
    setName: string
    star: number
    time: string
  }[]
  total: number
}>

/* 点赞或者取消点赞 */
export type likeCommendParm = {
  commentId: number
  id: number
}

export type likeCommendResp = apiResp<null>
