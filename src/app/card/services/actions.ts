'use server'

import { redirect } from 'next/navigation'
import { unauthorized } from 'next/navigation'
import apiRequest from '@/app/global/libs/apiRequest'
/**
 * 카드 생성 처리
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
    if (
      !form[field] ||
      (typeof form[field] === 'string' && !form[field].trim())
    ) {
      // 필수 항목 누락
      errors[field] = errors[field] ?? []
      errors[field].push(msg)
      hasErrors = true
    }
  }
  /* 필수 항목 검증 E */

  /* Server 요청 처리 S */
  if (!hasErrors) {
    // const apiUrl = process.env.API_URL + '/card/admin/create'

    // 이부분 임시로 테스트위해 주소를 실제로 입력한것
    const apiUrl = 'https://cis-card-service.jinilog.com/admin/create'
    try {
      const res = await apiRequest(apiUrl, 'POST', form)

      console.log('res', res)
      if (res.status !== 200) {
        // 검증 실패시
        if (res.status === 401) {
          unauthorized()
          return
        }
        const result = await res.json()
        console.log('result', result)
        errors = result.message
        hasErrors = true
      }
    } catch (err) {
      console.error(err)
    }
  }
  /* Server 요청 처리 E */

  if (hasErrors) return errors

  redirect(redirectUrl)
}
