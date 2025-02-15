'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const ListContainer = loadable(() => import('../containers/ListContainer'))

const MmemberListPage = () => {
  return (
    <>
      <MainTitle>회원 목록 조회</MainTitle>
      <ListContainer />
    </>
  )
}

export default React.memo(MmemberListPage)
