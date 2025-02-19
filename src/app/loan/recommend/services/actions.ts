'use server'
import { redirect } from 'next/navigation'
import apiRequest from '@/app/global/libs/apiRequest'

import { error } from 'console'
import { toQueryString } from '@/app/global/libs/utils'
// import { revalidatePath } from 'next/cache'

/**
 * 대출 상세 조회
 *
 */
export const getLoan = async (seq) => {
  try {
    const res = await apiRequest(`/loan/recommend/view/${seq}`)
    // console.log('res.status : ' + res.status)
    if (res.status === 200) {
      // console.log('진입 성공')
      const result = await res.json()
      return result.success && result.data
    } else {
      console.error(error)
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * 대출 삭제
 * @param params
 * @param formData
 */
// export const deleteLoan = async (params, formData: FormData) => {
export const deleteLoan = async (seq) => {
  // const redirectUrl = params?.redirectUrl ?? '/loan/list'
  // const seq = formData.get('seq')

  // ✨✨ 추가
  const qs = toQueryString({ seq: [seq] })

  try {
    const res = await apiRequest(`/loan/recommend/delete?${qs}`, 'DELETE')
    // const result = await res.status

    // if (result !== 200) {
    // console.log('******res.status === ' + res.status + '******')
    if (res.status === 200) {
      // console.log('******res.status === 200 진입******')
      const result = await res.json()
      // console.log('result : ' + result)
    }
  } catch (err) {
    console.error(err)
  }

  // redirect(redirectUrl)
  redirect('/loan/list')
}
