'use client'

// import React, { useEffect, useState } from 'react'
import React, { useEffect } from 'react'
// import { processBankUpdate } from '@/app/bank/services/actions'

const BankTransactionInfoPage = () => {
  useEffect(() => {
    document.title = '거래 내역 단일'
  }, [])

  return (
    <div>
      <h1>거래 내역 단일</h1>
    </div>
  )
}

export default BankTransactionInfoPage
