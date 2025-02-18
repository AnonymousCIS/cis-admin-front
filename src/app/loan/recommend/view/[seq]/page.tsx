'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const LoanLogContainer = loadable(
  () => import('../../../containers/LoanLogContainer'),
)

const ViewPage = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)

  return WithUserContainer(
    <>
      <MainTitle>대출 로그 조회</MainTitle>
      <LoanLogContainer seq={seq} />
    </>,
  )
}

export default React.memo(ViewPage)
