'use client'

// import React, { useEffect, useState } from 'react'
import React, { useEffect } from 'react'
// import { processBankUpdate } from '@/app/bank/services/actions'
// import loadable from '@loadable/component'
// import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const BankTransactionInfoPage = () => {
  useEffect(() => {
    document.title = '거래 내역 단일'
  }, [])

  return WithUserContainer(
    <div>
      <h1>거래 내역 단일</h1>
    </div>,
  )
}

export default BankTransactionInfoPage
