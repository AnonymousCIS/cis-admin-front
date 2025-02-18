'use server'

import { redirect } from 'next/navigation'
import apiRequest from '@/app/global/libs/apiRequest'
import { toQueryString } from '@/app/global/libs/utils'

/**
 * 게시글 단일 조회
 *
 * @param seq
 * @returns
 */
export const getBoardData = async (seq) => {
  try {
    const res = await apiRequest(`/board/view/${seq}`)

    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * 게시글 단일 & 목록 일괄 삭제 처리
 *
 * @param seq
 * @returns
 */
export const removeBoardData = async (seq) => {
  const qs = toQueryString({ seq: [seq] })

  // console.log('qs', qs)

  try {
    const res = await apiRequest(`/board/admin/deletes?${qs}`, 'DELETE')

    if (res.status === 200) {
      const result = await res.json()
      // console.log('result', result)
    } else {
      return
    }
  } catch (err) {
    console.error(err)
  }
  redirect('/board/list')
}
