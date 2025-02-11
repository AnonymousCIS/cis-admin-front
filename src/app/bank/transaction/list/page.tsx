'use client'

// import React, { useEffect, useState } from 'react'
import React, { useEffect } from 'react'
// import { processBankUpdate } from '@/app/bank/services/actions'

const BankTransactionListPage = () => {
  useEffect(() => {
    document.title = '거래 목록 일괄'
  }, [])

  return (
    <div>
      <h1>거래 목록 일괄</h1>
    </div>
  )
}

export default BankTransactionListPage
