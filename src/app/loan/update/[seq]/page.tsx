'use client'

import React from 'react'
import loadable from '@loadable/component'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
import { MainTitle } from '@/app/global/components/StyledTitle'

const LoanEditContainer = loadable(
  () => import('../../containers/LoanEditContainer'),
)

const LoanUpdate = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)

  return WithUserContainer(
    <>
      <MainTitle>대출 수정</MainTitle>
      <LoanEditContainer seq={seq} />
    </>,
  )
}

export default LoanUpdate
