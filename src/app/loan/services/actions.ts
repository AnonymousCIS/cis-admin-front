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
export const processLoan = async () => {
  // const redirectUrl = params?.redirectUrl ?? '/loan/list'

  const form : any = {}
  let errors : any = {}
  let hasErrors = false

  // 필수 항목 검증 S
  const requiredFields = {
    loanName: '대출명을 입력해주세요,',
    limit: '한도를 입력해주세요.',
    category: '카테고리를 입력해주세요.',
    bankName: '은행명을 입력해주세요.',
    repaymentYear: '한도년도를 입력해주세오.',
    loanDescription: '대출 설명을 입력해주세요.',
    interestRate: '이자율을 입력해주세요.',
    isOpen: '사용 여뷰 선탹해주세요.',
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
  // 필수 항목 검증 E

  // 서버 요청 처리 S
  if (!hasErrors) {
    const res = await apiRequest('/loan/admin/create', 'POST', form)

    if (res.status !== 200) {
      const result = await res.json()
      errors = result.message
      hasErrors = true
    }
  }
  // 서버 요청 처리 E

  if (hasErrors) {
    return errors
  }

  return redirect('/loan/list')
}

/**
 * 대출 상세 조회
 *
 */
export const getLoanInfo = async () => {}

/**
 * 대출 목록 조회
 *
 */
export const getLoanList = async () => {}
