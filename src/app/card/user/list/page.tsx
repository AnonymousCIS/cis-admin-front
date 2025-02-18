'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const UserListContainer = loadable(
  () => import('../containers/UserListContainer'),
)

const UserListPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>유저 카드 목록</MainTitle>
      <UserListContainer />
    </>,
  )
}

export default React.memo(UserListPage)
