'use client'

import React from 'react'
// import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
import loadable from '@loadable/component'

const UserViewContainer = loadable(
  () => import('../../containers/UserViewContainer'),
)

const UserViewPage = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)
  return WithUserContainer(
    <>
      <MainTitle>유저 카드 조회</MainTitle>
      <UserViewContainer seq={seq} />
    </>,
  )
}

export default React.memo(UserViewPage)
