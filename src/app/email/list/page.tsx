'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
// import { MainContentBox } from '@/app/global/components/ContentBox';

const ListSearchContainer = loadable(() => import('../containers/ListSearchContainer'))

const ListPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>로그 목록 조회</MainTitle>
      <ListSearchContainer />
    </>,
  )
}

export default React.memo(ListPage)