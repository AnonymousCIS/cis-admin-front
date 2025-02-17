'use server'
import { redirect } from 'next/navigation'
import apiRequest from '@/app/global/libs/apiRequest'
import { toQueryString } from '@/app/global/libs/utils'

export const processEdit = async (params, formData: FormData) => {
  const redirectUrl = params?.redirectUrl ?? '/bank/list'

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
    bankName: '은행 종류를 선택하세요.',
    accountNumber: '계좌 번호를 입력하세요.',
    password: '계좌 비밀 번호를 입력하세요.',
    name: '예금주 이름을 입력하세요.',
    transactions: '거래 내역을 입력하세요.',
  }

  for (const [field, msg] of Object.entries(requiredFields)) {
    const value = formData.get(field).toString()

    if (!value || !value.trim()) {
      errors[field] = errors[field] ?? []
      errors[field].push(msg)
      hasErrors = true
    }
  }
  // 필수 항목 검증 E

  // 서버 요청 처리 S
  if (!hasErrors) {
    const res = await apiRequest('/bank/admin/edit/', 'POST', { ...form })

    if (res.status !== 200) {
      const result = await res.json()
      errors = result.message
      hasErrors = true
    }
  }
  // 서버 요청 처리 E

  if (hasErrors) return errors

  return redirect(redirectUrl)
}

/**
 * 계좌 단일 조회
 *
 * @param seq
 * @returns
 */
export const getBank = async (seq) => {
  try {
    const res = await apiRequest(`/bank/view/${seq}`)

    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * 계좌 단일 & 목록 일괄 삭제 처리
 *
 * @param params
 * @param formData
 * @returns
 */
export const removeBank = async (seq) => {
  const qs = toQueryString({ seq: [seq] })

  try {
    const res = await apiRequest(`/bank/admin/removes?${qs}`, 'DELETE')

    if (res.status === 200) {
      const result = await res.json()
    } else {
      return
    }
  } catch (err) {
    console.error(err)
  }
  redirect('/bank/list')
}

/**
 * 계좌 거래내역 목록 조회
 *
 * @param seq
 * @returns
 */
export const getTransactionList = async (seq) => {
  try {
    const res = await apiRequest(`/bank/transactions/view/${seq}`)

    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * 계좌 거래내역 단일 조회
 *
 * @param seq
 * @returns
 */
export const getTransaction = async (seq) => {
  try {
    const res = await apiRequest(`/bank/transactions/view/${seq}`)

    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * 계좌 거래내역 삭제.
 * @param seq
 * @returns
 */
export const removeTransaction = async (seq) => {
  const qs = toQueryString({ seq: [seq] })

  try {
    const res = await apiRequest(
      `/bank/admin/transaction/deletes?${qs}`,
      'DELETE',
    )

    if (res.status === 200) {
      const result = await res.json()
      console.log('result', result)
    } else {
      return
    }
  } catch (err) {
    console.error(err)
  }
  redirect('/bank/transaction/list')
}
