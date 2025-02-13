'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const DeleteContainer = loadable(
  () => import('../../containers/DeleteContainer'),
)

const DeletePage = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)

  return WithUserContainer(
    <>
      <MainTitle>카드 조회</MainTitle>
      <DeleteContainer seq={seq} />
    </>,
  )
}

export default React.memo(DeletePage)
