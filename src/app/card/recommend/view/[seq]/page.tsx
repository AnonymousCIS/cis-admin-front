'use client'

import React from 'react'
// import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
import loadable from '@loadable/component'

const RecommendView = loadable(() => import('../../containers/RecommendView'))

const RecommendViewPage = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)

  return WithUserContainer(
    <>
      <MainTitle>추천 카드 조회</MainTitle>
      <RecommendView seq={seq} />
    </>,
  )
}

export default React.memo(RecommendViewPage)
