'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const LoanListContainer = loadable(
  () => import('../containers/LoanListContainer'),
)

const LoanList = () => {
  return WithUserContainer(
    <>
      <MainTitle>전체 대출 목록</MainTitle>
      <LoanListContainer />
    </>,
  )
}

export default React.memo(LoanList)
