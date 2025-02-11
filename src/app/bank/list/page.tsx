'use client'

// import React, { useEffect, useState } from 'react'
import React, { useEffect } from 'react'
// import { processBankUpdate } from '@/app/bank/services/actions'
// import loadable from '@loadable/component'
// import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const BankListPage = () => {
  useEffect(() => {
    document.title = '계좌 목록 수정'
  }, [])

  return WithUserContainer(
    <div>
      <h1>계좌 목록 수정</h1>
    </div>,
  )
}

export default BankListPage
