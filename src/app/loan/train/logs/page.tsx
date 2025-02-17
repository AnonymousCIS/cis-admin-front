'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
// import { MainContentBox } from '@/app/global/components/ContentBox';

const LoanLogsContainer = loadable(
  () => import('../../containers/LoanLogsContainer'),
)

const ListPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>로그 목록 조회</MainTitle>
      <LoanLogsContainer />
    </>,
  )
}

export default React.memo(ListPage)
