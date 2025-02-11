'use server'
import { redirect } from 'next/navigation'
import apiRequest from '@/app/global/libs/apiRequest'

export const processBank = async () => {
  const form: any = {}
  let errors: any = {}
  let hasErrors = false

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
  // 필수 항목 검증 E

  // 서버 요청 처리 S
  if (!hasErrors) {
    const res = await apiRequest('/bank/admin/edit', 'POST', form)

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

  return redirect('/bank/list')
}
