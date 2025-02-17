'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const BankTransactionInfoPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>계좌 거래 단일 내역</MainTitle>
    </>,
  )
}

export default BankTransactionInfoPage
