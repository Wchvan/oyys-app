import { defineStore } from 'pinia'
import { useUserStore } from '../user/user'
import type { recommendDataType } from '@/interface/recommend'
import type {
  getCommentsParm,
  likeCommendParm,
} from '@/interface/recommend/api'
import { RecommendService } from '@/api/recommend/recommend'

export const useRecommendStore = defineStore('recommend', () => {
  const reviewList = ref<recommendDataType[]>([])

  const getReviewList = async (params: getCommentsParm) => {
    const res = await RecommendService.getComments(params)
    if (res.code === 200) {
      reviewList.value.push(...res.data.commentList)
    }
    return res
  }

  const likeCommend = async (index: number) => {
    const params: likeCommendParm = {
      commentId: reviewList.value[index].id,
      id: useUserStore().userInfo.id,
    }
    const res = await RecommendService.likeCommend(params)
    if (res.code === 200) {
      if (reviewList.value[index].isLiked) {
        reviewList.value[index].isLiked = false
        reviewList.value[index].likeNum -= 1
      } else {
        reviewList.value[index].isLiked = true
        reviewList.value[index].likeNum += 1
      }
    }
    return res
  }

  return {
    reviewList,
    getReviewList,
    likeCommend,
  }
})
