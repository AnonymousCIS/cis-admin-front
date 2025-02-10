'use server'

import { redirect } from 'next/navigation'
import apiRequest from '@/app/global/libs/apiRequest'

/**
 * 게시판 설정 등록 & 수정
 *
 * Server Action Component
 *
 * @param params
 * @param formData
 * @returns
 */
export const updateBoard = async (params, formData: FormData) => {
  let errors = {}
  let hasErrors = false

  const form = {}

  for (const [k, v] of formData.entries()) {
    if (k.includes('$ACTION')) continue
    form[k] = v
  }

  /* 필수 항목 검증 S */
  const requiredFields = {
    bid: '게시판 ID를 입력하세요.',
    name: '게시판명을 입력하세요.',
  }

  for (const [field, msg] of Object.entries(requiredFields)) {
    const value = formData.get(field)

    if (!value || !value.trim()) {
      // 필수 항목 누락

      errors[field] = errors[field] ?? []
      errors[field].push(msg)
      hasErrors = true
    }
  }
  /* 필수 항목 검증 E */

  /* Server 요청 처리 S */
  if (!hasErrors) {
    const res = await apiRequest('/board/admin/config/save', 'POST', form)

    if (res.status !== 200) {
      const result = await res.json()
      errors = result.message
      hasErrors = true
    }
  }
  /* Server 요청 처리 E */

  return redirect('/board/config/list')
}

/**
 * 게시판 설정 조회
 *
 * @param bid
 */
export const getBoard = async (bid) => {
  try {
    const res = await apiRequest(`/board/info/${bid}`)

    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    }
  } catch (err) {
    console.error(err)
  }
}
