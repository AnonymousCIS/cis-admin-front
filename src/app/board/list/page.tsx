'use client'

import React from 'react'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
import loadable from '@loadable/component'

const ListContainer = loadable(() => import('../containers/ListContainer'))

const ListPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>게시글 목록 검색</MainTitle>
      <ListContainer />
    </>,
  )
}

export default React.memo(ListPage)
