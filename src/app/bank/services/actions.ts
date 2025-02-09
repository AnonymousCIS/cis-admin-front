'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import apiRequest from '@/app/global/libs/apiRequest'
import { revalidatePath } from 'next/cache'

/**
 * 은행 계좌 수정 검증 및 저장 처리
 * @param params : 쿼리스트링값
 * @param formData : 은행명, 계좌번호
 * @returns 오류 메시지 또는 성공 처리
 */
export const processBankUpdate = async (params, formData: FormData) => {
  const redirectUrl = params?.redirectUrl ?? '/bank/edit'

  const form = {}
  let errors = {}
  let hasErrors = false


  // 필수 항목 검증 S
  const requiredFields = {
    bankName: '은행명을 입력하세요.'
    accountNumber: '계좌 번호를 입력하세요.'};


  const errors: { [key: string]: string[] } = {};
  let hasErrors = false;


  for (const [key, message] of Object.entries(requiredFields)) {
    if (!formData[key] || !formData[key].trim()) {
      errors[key] = errors[key] ?? [];
      errors[key].push(message);
      hasErrors = true;
    }
  }
  // 입력값 검증
  if (!formData.bankName || !formData.bankName.trim()) {
    errors.bankName = ['은행명을 입력해주세요.']
    hasErrors = true
  }

  if (!formData.accountNumber || !/^\d+$/.test(formData.accountNumber)) {
    errors.accountNumber = ['계좌 번호는 숫자만 입력 가능합니다.']
    hasErrors = true
  }

  // 중복 여부 검증
  if (!hasErrors) {
    const apiUrl = process.env.API_URL + '/bank/edit'
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
        }),
      })

      const result = await res.json()
      if (res.status === 409) {
        errors.accountNumber = ['이미 등록된 계좌 번호입니다.']
        hasErrors = true
      }
    } catch (err) {
      console.error('서버 중복 확인 오류:', err)
      errors.server = ['중복 확인 중 문제가 발생했습니다.']
      hasErrors = true
    }
  }

  // 3. 검증 실패 시 에러 반환
  if (hasErrors) {
    return errors
  }

  // 4. 수정 요청
  try {
    const res = await apiEditRequest('/bank/update', {
      method: 'POST',
      body: JSON.stringify(formData),
    })

    if (res.status === 200) {
      // 수정 성공: 경로 재검증 및 리다이렉트
      revalidatePath('/bank')
      redirect('/bank')
    } else {
      const errorData = await res.json()
      return { server: [errorData.message || '수정 중 오류가 발생했습니다.'] }
    }
  } catch (err) {
    console.error('서버 요청 오류:', err)
    return { server: ['수정 처리 중 문제가 발생했습니다. 다시 시도해주세요.'] }
  }
}
