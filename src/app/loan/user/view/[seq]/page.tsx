'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
const UserViewContainer = loadable(
  () => import('../../containers/UserViewContainer'),
)
const LoanUserView = ({ params }) => {
    const { seq } = React.use<{ seq: number }>(params)
  return WithUserContainer(
    <>
      <MainTitle>유저가 받은 대출 조회</MainTitle>
      <UserViewContainer seq={seq} />
    </>,
  )
}

export default React.memo(LoanUserView)
