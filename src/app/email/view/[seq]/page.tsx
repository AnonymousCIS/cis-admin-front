'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const ViewContainer = loadable(() => import('../../containers/ViewContainer'))

const ViewPage = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)

  return WithUserContainer(
    <>
      <MainTitle>이메일 조회</MainTitle>
      <ViewContainer seq={seq} />
    </>,
  )
}

export default React.memo(ViewPage)
