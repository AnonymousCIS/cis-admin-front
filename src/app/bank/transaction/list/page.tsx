'use client'

// import React, { useEffect, useState } from 'react'
import React, { useEffect } from 'react'
// import { processBankUpdate } from '@/app/bank/services/actions'
// import loadable from '@loadable/component'
// import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const BankTransactionListPage = () => {
  useEffect(() => {
    document.title = '거래 목록 일괄'
  }, [])

  return WithUserContainer(
    <div>
      <h1>거래 목록 일괄</h1>
    </div>,
  )
}

export default BankTransactionListPage
