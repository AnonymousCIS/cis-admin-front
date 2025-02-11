'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
// import { MainContentBox } from '@/app/global/components/ContentBox';

const ListContainer = loadable(() => import('../containers/ListContainer'))

const ListPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>로그 목록 조회</MainTitle>
      <ListContainer />
    </>,
  )
}

export default ListPage