'use client'

import React from 'react'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const RecommendViewPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>계좌 단일 조회</MainTitle>
    </>,
  )
}

export default React.memo(RecommendViewPage)
