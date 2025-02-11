'use client'

import React from 'react'
// import loadable from '@loadable/component'
// import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const LoanRecommendList = () => {
  return WithUserContainer(
    <>
      <h1>추천 대출 목록</h1>
    </>,
  )
}

export default LoanRecommendList
