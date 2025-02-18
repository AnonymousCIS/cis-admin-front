'use client'

import React from 'react'
// import loadable from '@loadable/component'
// import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

<<<<<<< Updated upstream
const LoanRecommendView = () => {
  return WithUserContainer(
    <>
      <h1>추천 대출 로그 상세</h1>
=======
const RecommendViewContainer= loadable(
  () => import('../../containers/RecommendViewContainer'),
)

const ViewPage = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)

  return WithUserContainer(
    <>
      <MainTitle>대출 로그 조회</MainTitle>
      <RecommendViewContainer seq={seq} />
>>>>>>> Stashed changes
    </>,
  )
}

export default LoanRecommendView
