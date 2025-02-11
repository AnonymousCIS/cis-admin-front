'use server'

import { redirect } from 'next/navigation'
import { unauthorized } from 'next/navigation'
// import apiRequest from '@/app/global/libs/apiRequest'
/**
 * 카드 생성 처리
 * @param params : QueryString 값
 * @param formData
 */
export const processCreate = async (params, formData: FormData) => {
  const redirectUrl = params?.redirectUrl ?? '/bank/list'

  const form : any = {}

  let errors : any = {}

  let hasErrors = false

  for (const [key, value] of formData.entries()) {

    if (key.includes('$ACTION')) continue

    const _value : string | boolean = value.toString()

    form[key] = _value
  }

  /* 필수 항목 검증 S */
  const requiredFields = {
    bankName: '은행 종류를 선택하세요.',
    accountNumber: '계좌 번호를 입력하세요.',
    password: '계좌 비밀 번호를 입력하세요.',
    name: '예금주 이름을 입력하세요.',
    transactions: '거래 내역을 입력하세요.',
  }

  for (const [field, msg] of Object.entries(requiredFields)) {
    if (
      !form[field] ||
      (typeof form[field] === 'string' && !form[field].trim())
    ) {
      errors[field] = errors[field] ?? []
      errors[field].push(msg)
      hasErrors = true
    }
  }
  /* 필수 항목 검증 E */

  /* 서버 요청 처리 S */
  if (!hasErrors) {
    //const apiUrl = process.env.API_URL + '/card/admin/create'

    const apiUrl = process.env.API_URL + '/bank/list'
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      console.log('res', res)
      // 요청 성공
      if (res.status !== 200) {
        // 클라이언트 요청 잘못.
        if (res.status === 400) {
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
