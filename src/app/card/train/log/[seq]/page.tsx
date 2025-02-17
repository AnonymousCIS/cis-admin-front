'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const LogViewContainer = loadable(
  () => import('../../../containers/LogViewContainer'),
)

const ViewPage = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)

  return WithUserContainer(
    <>
      <MainTitle>카드 로그 조회</MainTitle>
      <LogViewContainer seq={seq} />
    </>,
  )
}

export default React.memo(ViewPage)
