'use client'

import React from 'react'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
// import loadable from '@loadable/component'

const ListPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>게시판 목록 조회</MainTitle>
    </>
  )
}

export default React.memo(ListPage)
