'use server'
import { redirect } from 'next/navigation'
// import { format } from 'date-fns'
// import { cookies } from 'next/headers'
import apiRequest from '@/app/global/libs/apiRequest'
// import { revalidatePath } from 'next/cache'

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
    category: '카테고리를 입력해주세요.',
    bankName: '은행명을 입력해주세요.',
    repaymentYear: '한도년도를 입력해주세오.',
    loanDescription: '대출 설명을 입력해주세요.',
    interestRate: '이자율을 입력해주세요.',
  }

  for (const [field, msg] of Object.entries(requiredFields)) {
    const value = formData.get(field).toString()
    if (
      !form[field] ||
      (typeof form[field] === 'string' && !form[field].trim())
    ) {
      console.log('errors[field]' + field)
      errors[field] = errors[field] ?? []
      errors[field].push(msg)
      hasErrors = true
    }
  }

  // 필수 항목 검증 E

  // 서버 요청 처리 S

  if (!hasErrors) {
    const res = await apiRequest('/loan/admin/create', 'POST', form)
    console.log('res.status의 값은 : ', res.status)
    console.log('form : ' + JSON.stringify(form))

    if (res.status !== 200) {
      const result = await res.json()
      console.log('result', result)
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

  return redirect('/loan/list')
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

export const updateLoan = async (params, formData: FormData) => {
  const form: any = {}
  const errors: any = {}
  let hasErrors = false

  for (const [key, value] of formData.entries()) {
    const _value = ['true', 'false'].includes(value.toString())
      ? Boolean(value.toString())
      : value.toString()

    form[key] = _value
  }
  const { locationAfterWriting } = await getLoan(form.seq)

  let redirectUrl = `/loan/list`
  /* 필수 항목 검증 S */

  const requiredFields = {
    loanName: '대출명은 필수항목입니다.',
    limit: '대출 한도는 필수항목입니다.',
    category: '내용을 입력하세요',
    bankName: '잘못된 접근입니다',
    repaymentYear: '잘못된 접근입니다',
    loanDescription: '',
    interestRate: '',
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

  /* Server 처리 요청 S */

  if (!hasErrors) {
    form.status = 'ALL'
    const res = await apiRequest('/board/save', 'POST', form)
    const result = await res.json()
    if (res.status !== 200 || !result.success) {
      // 게시글 등록 & 수정 실패
      return result.message
    } else {
      // 게시글 등록 & 수정 성공
      const { seq } = result.data
      redirectUrl =
        locationAfterWriting === 'view' ? `/board/view/${seq}` : redirectUrl
    }
  }

  /* Server 처리 요청 E */

  if (hasErrors) return errors

  redirect(redirectUrl)
}

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
