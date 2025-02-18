'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const RecommendList = loadable(() => import('../containers/RecommendList'))

const RecommendListPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>추천 카드 목록</MainTitle>
      <RecommendList />
    </>,
  )
}

export default React.memo(RecommendListPage)
