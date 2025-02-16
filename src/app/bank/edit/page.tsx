'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const EditContainer = loadable(() => import('../containers/EditContainer'))

const EditPage = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)

  return WithUserContainer(
    <>
      <MainTitle>계좌수정 및 변경</MainTitle>
      <EditContainer bid={seq} />
    </>,
  )
}

export default React.memo(EditPage)
