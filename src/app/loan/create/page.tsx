'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const LoanContainer = loadable(() => import('../containers/LoanContainer'))

const LoanCreate = () => {
  return WithUserContainer(
    <>
      <MainTitle>대출 생성</MainTitle>
      <LoanContainer />
    </>,
  )
}

export default React.memo(LoanCreate)
