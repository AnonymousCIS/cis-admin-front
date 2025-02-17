'use server'

import { redirect } from 'next/navigation'
import apiRequest from '@/app/global/libs/apiRequest'
import { toQueryString } from '@/app/global/libs/utils'

/**
 * 카드 단일 등록
 *
 * @param params : QueryString 값
 * @param formData
 */
export const processCreate = async (params, formData: FormData) => {
  const redirectUrl = params?.redirectUrl ?? '/card/list'

  const form: any = {}

  let errors: any = {}

  let hasErrors = false

  for (const [key, value] of formData.entries()) {
    if (key.includes('$ACTION')) continue

    const _value: string | boolean = value.toString()

    form[key] = _value
  }

  /* 필수 항목 검증 S */
  const requiredFields = {
    cardName: '카드명을 입력하세요.',
    annualFee: '연회비를 입력하세요.',
    cardType: '카드 종류를 선택하세요.',
    limit: '카드 한도를 입력하세요.',
    bankName: '은행 종류를 선택하세요.',
    category: '카테고리를 선택하세요.',
    cardDescription: '카드 설명을 입력하세요.',
  }

  for (const [field, msg] of Object.entries(requiredFields)) {
    const value = formData.get(field).toString()

    if (!value || !value.trim()) {
      // if (
      //   !form[field] ||
      //   (typeof form[field] === 'string' && !form[field].trim())
      // ) {
      // 필수 항목 누락

      errors[field] = errors[field] ?? []
      errors[field].push(msg)
      hasErrors = true
    }
  }
  /* 필수 항목 검증 E */

  /* Server 요청 처리 S */
  if (!hasErrors) {
    
    const apiUrl =
      form.mode == 'add' ? '/card/admin/create' : `/card/admin/updates`

    const reqMethod = form.mode == 'add' ? 'POST' : 'PATCH'

    const reqBody = form.mode == 'add' ? { ...form } : [form]

    // console.log('reqBody', reqBody)

    const res = await apiRequest(apiUrl, reqMethod, reqBody)
    // console.log(form)
    // console.log('res', res)

    if (res.status !== 200) {
      // 검증 실패시
      const result = await res.json()
      // console.log('result', result)
      errors = result.message
      hasErrors = true
    }
  }
  /* Server 요청 처리 E */

  if (hasErrors) return errors

  return redirect(redirectUrl)
}

/**
 * 카드 단일 조회
 *
 * @param seq : Card-Entity ID
 * @returns
 */
export const getCard = async (seq) => {
  try {
    const res = await apiRequest(`/card/view/${seq}`)

    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * 카드 단일 & 목록 일괄 삭제 처리
 *
 * @param params
 * @param formData
 * @returns
 */
export const removeCard = async (seq) => {
  const qs = toQueryString({ seq: [seq] })

  // console.log('qs', qs)

  try {
    const res = await apiRequest(`/card/admin/removes?${qs}`, 'DELETE')

    if (res.status === 200) {
      const result = await res.json()
      // console.log('result', result)
    } else {
      return
    }
  } catch (err) {
    console.error(err)
  }
  redirect('/card/list')
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
    const res = await apiRequest(`/card/train/log/${seq}`)
    // const res = await apiRequest(
    //   'https://cis-email-service.koreait.xyz/admin/list',
    // )
    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    } else {
      console.error('Error fetching logs:', res.status)
    }
  } catch (err) {
    console.error('Error:', err)
/**
 * 카드 추천 훈련
 *
 * @returns
 */
export const cardTrain = async () => {
  try {
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
