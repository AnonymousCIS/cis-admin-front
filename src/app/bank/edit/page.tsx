'use client'

import React, { useEffect, useState } from 'react'
import { processBankUpdate } from '@/app/bank/services/actions'

const BankEditPage = () => {
  useEffect(() => {
    document.title = '은행 계좌수정 및 변경'
  }, [])

  const BankEditPage = () => {
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({})

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault()

      const formData = {
        bankName: (event.target as any).bankName.value,
        accountNumber: (event.target as any).accountNumber.value,
      }

      const result = await processBankUpdate(formData)

      if (result) {
        // 검증 실패 시 오류 메시지 상태 업데이트
        setErrors(result)
      } else {
        alert('은행 계좌가 성공적으로 수정되었습니다!')
      }
    }

    return (
      <div>
        <h1>은행 계좌 수정</h1>
        <form>
          <label>
            은행명:
            <input type="text" placeholder="은행명을 입력하세요" />
          </label>
          <label>
            계좌 번호:
            <input type="number" placeholder="계좌 번호를 입력하세요" />
          </label>
          <button type="submit">저장</button>
        </form>
      </div>
    )
  }
}

export default BankEditPage
