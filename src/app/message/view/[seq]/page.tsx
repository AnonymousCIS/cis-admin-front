'use client'

import React from 'react'
import loadable from '@loadable/component'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
import { MainTitle } from '@/app/global/components/StyledTitle'

const ViewContainer = loadable(() => import('../../containers/ViewContainer'))

const ViewPage = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)

  return WithUserContainer(
    <>
      <MainTitle>쪽지 조회</MainTitle>
      <ViewContainer seq={seq} />
    </>,
  )
}

export default React.memo(ViewPage)
