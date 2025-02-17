'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const RecommendListContainer = loadable(
  () => import('../containers/RecommendListContainer'),
)

const LoanRecommendList = () => {
  return WithUserContainer(
    <>
      <MainTitle>추천 대출 목록</MainTitle>
      <RecommendListContainer />
    </>,
  )
}

export default React.memo(LoanRecommendList)
