'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const ListContainer = loadable(() => import('../../containers/ViewContainer'))

const RecommendViewPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>계좌 단일 조회</MainTitle>
      <ListContainer />
    </>,
  )
}

export default React.memo(RecommendViewPage)
