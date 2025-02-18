'use server'
import { redirect } from 'next/navigation'
import apiRequest from '@/app/global/libs/apiRequest'

import { error } from 'console'
import { toQueryString } from '@/app/global/libs/utils'
// import { revalidatePath } from 'next/cache'

/**
 * 카드 상세 조회
 *
 */
export const getCard = async (seq) => {
  try {
    const res = await apiRequest(`/card/view/${seq}`)
    console.log('res.status : ' + res.status)
    if (res.status === 200) {
      console.log('진입 성공')
      const result = await res.json()
      return result.success && result.data
    } else {
      console.error(error)
    }
  } catch (err) {
    console.error(err)
  }
}

export const getLog = async () => {
  try {
    const res = await apiRequest('/card/train/logs')
    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    } else {
      console.error('Error fetching logs:', res.status)
    }
  } catch (err) {
    console.error('Error:', err)
  }
}
export const getLogView = async (seq) => {
  try {
    const res = await apiRequest(`/card/train/log?seq=${seq}`, 'GET')

    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    } else {
      console.error('Error fetching logs:', res.status)
    }
  } catch (err) {
    console.error('Error:', err)
  }
}

/**
 * 카드 삭제
 * @param params
 * @param formData
 */
// export const deleteLoan = async (params, formData: FormData) => {
export const deleteCard = async (seq) => {
  // const redirectUrl = params?.redirectUrl ?? '/loan/list'
  // const seq = formData.get('seq')

  // ✨✨ 추가
  const qs = toQueryString({ seq: [seq] })

  try {
    const res = await apiRequest(`/card/admin/deletes?${qs}`, 'DELETE')
    // const result = await res.status

    // if (result !== 200) {
    console.log('******res.status === ' + res.status + '******')
    if (res.status === 200) {
      console.log('******res.status === 200 진입******')
      const result = await res.json()
      console.log('result : ' + result)
    }
  } catch (err) {
    console.error(err)
  }

  // redirect(redirectUrl)
  redirect('/loan/list')
}

/**
 * 추천 카드 훈련
 *
 * @returns
 */
export const cardTrain = async () => {
  try {
    console.log('유입')
    const res = await apiRequest('/card/admin/train')
    console.log('res', res)
    if (res.status === 200) {
      return '훈련 완료'
    }
    // return result.success && result.data
  } catch (err) {
    console.error(err)
  }
}
