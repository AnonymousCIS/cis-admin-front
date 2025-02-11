'use client'

import React from 'react'
// import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const UserListPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>유저 카드 목록 조회</MainTitle>
    </>,
  )
}

export default React.memo(UserListPage)
