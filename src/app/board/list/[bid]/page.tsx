'use client'

import React from 'react'
import { MainTitle } from '@/app/global/components/StyledTitle'
// import loadable from '@loadable/component'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const ListBidPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>게시판별 게시글 조회</MainTitle>
    </>,
  )
}

export default React.memo(ListBidPage)
