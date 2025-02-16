'use server'
import { redirect } from 'next/navigation'
import apiRequest from '@/app/global/libs/apiRequest'
import { toQueryString } from '@/app/global/libs/utils'

/**
 * Loan 생성
 *
 * @param params : 쿼리스트링값
 * @param formData
 */
// export const processLoan = async (params, formData: FormData) => {
export const processLoan = async (params, formData: FormData) => {
  const redirectUrl = params?.redirectUrl ?? '/loan/list'

  const form: any = {}
  let errors: any = {}
  let hasErrors = false

  for (const [key, value] of formData.entries()) {
    if (key.includes('$ACTION')) continue

    const _value: string | boolean = value.toString()

    form[key] = _value
  }

  // 필수 항목 검증 S
  const requiredFields = {
    loanName: '대출명을 입력해주세요,',
    limit: '한도를 입력해주세요.',
    bankName: '은행명을 입력해주세요.',
    repaymentYear: '한도년도를 입력해주세오.',
    loanDescription: '대출 설명을 입력해주세요.',
    interestRate: '이자율을 입력해주세요.',
  }

  for (const [field, msg] of Object.entries(requiredFields)) {
    const value = formData.get(field).toString()
    //if (!form[field] || (typeof form[field] === 'string' && !form[field].trim())) {
    if (!value || !value.trim()) {
      console.log('errors[field]' + field)
      errors[field] = errors[field] ?? []
      errors[field].push(msg)
      hasErrors = true
    }
  }

  // 필수 항목 검증 E

  // 서버 요청 처리 S

  if (!hasErrors) {
    const apiUrl =
      form.mode == 'add' ? '/loan/admin/create' : '/loan/admin/updates'

    const reqMethod = form.mode == 'add' ? 'POST' : 'PATCH'

    const reqBody = form.mode == 'add' ? { ...form } : [form]

    const res = await apiRequest(apiUrl, reqMethod, reqBody)
    console.log('form의 값 : ' + form)
    console.log('res.status의 값은 : ', res.status)
    console.log('form : ' + JSON.stringify(form))

    if (res.status !== 200) {
      const result = await res.json()
      console.log('result의 값 : ', result)
      errors = result.message
      hasErrors = true
    }
  }
  // 서버 요청 처리 E

  /* Server 요청 처리 S */
  /* if (!hasErrors) {
    const apiUrl = process.env.API_URL + '/loan/config/create'

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (res.status !== 200) {
        // 검증 실패시
        const result = await res.json()
        errors = result.message
      }
    } catch (err) {
      console.error(err)
    }
  } */
  /* Server 요청 처리 E */

  if (hasErrors) {
    return errors
  }

  return redirect(redirectUrl)
}

/**
 * 대출 상세 조회
 *
 */
export const getLoan = async (seq) => {
  try {
    const res = await apiRequest(`/loan/view/${seq}`)
    console.log('res.status : ' + res.status)
    if (res.status === 200) {
      console.log('진입 성공')
      const result = await res.json()
      return result.success && result.data
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
    const res = await apiRequest(`/loan/admin/deletes/${seq}`, 'DELETE')
    // const result = await res.status

    // if (result !== 200) {
    if (res.status == 200) {
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
 * 추천 대출 훈련
 *
 * @returns
 */
export const loanTrain = async () => {
  try {
    const res = await apiRequest('/loan/admin/train')
    console.log('res', res)
    if (res.status === 200) {
      return '훈련 완료'
    }
    // return result.success && result.data
  } catch (err) {
    console.error(err)
  }
}
