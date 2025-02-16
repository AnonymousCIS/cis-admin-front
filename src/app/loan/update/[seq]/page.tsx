'use client'

import React from 'react'
import loadable from '@loadable/component'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
import { MainTitle } from '@/app/global/components/StyledTitle'

const LoanContainer = loadable(() => import('../../containers/LoanContainer'))

const LoanUpdate = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)

  return WithUserContainer(
    <>
      <MainTitle>대출 수정</MainTitle>
      <LoanContainer seq={seq} />
    </>,
  )
}

export default React.memo(LoanUpdate)
