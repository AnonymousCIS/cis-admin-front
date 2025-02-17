'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const ListContainer = loadable(
  () => import('../../../containers/TransactionViewContainer'),
)

const BankTransactionInfoPage = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)
  return WithUserContainer(
    <>
      <MainTitle>계좌 거래 단일 내역</MainTitle>
      <ListContainer seq={seq} />
    </>,
  )
}

export default BankTransactionInfoPage
