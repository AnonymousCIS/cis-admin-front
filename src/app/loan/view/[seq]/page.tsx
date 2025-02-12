'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const LoanViewContainer = loadable(
  () => import('../../containers/LoanViewContainer'),
)

const LoanView = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)

  return WithUserContainer(
    <>
      <MainTitle>대출 단일 조회</MainTitle>
      <LoanViewContainer seq={seq} />
    </>,
  )
}

export default React.memo(LoanView)
