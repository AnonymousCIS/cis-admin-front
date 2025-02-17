'use client'

import React from 'react'
//import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
import TransactionListContainer from '../../containers/TransactionListContainer'

/*
const TransactionListContainer = loadable(() => {
  import('../../containers/TransactionListContainer')
})
*/
const BankTransactionListPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>계좌 목록</MainTitle>
      <TransactionListContainer />
    </>,
  )
}

export default React.memo(BankTransactionListPage)
