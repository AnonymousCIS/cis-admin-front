'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const RecommendViewContainer = loadable(
  () => import('../../containers/RecommendViewContainer'),
)

const ViewPage = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)

  return WithUserContainer(
    <>
      <MainTitle>대출 조회</MainTitle>
      <RecommendViewContainer seq={seq} />
    </>,
  )
}

export default React.memo(ViewPage)
