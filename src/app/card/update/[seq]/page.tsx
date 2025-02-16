'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const CreateContainer = loadable(
  () => import('../../containers/CreateContainer'),
)

const UpdatePage = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)
  console.log('seq', seq)
  return WithUserContainer(
    <>
      <MainTitle>카드 수정</MainTitle>
      <CreateContainer seq={seq} />
    </>,
  )
}

export default React.memo(UpdatePage)
