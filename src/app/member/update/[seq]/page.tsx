'use client'

import React from 'react'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
import loadable from '@loadable/component'
const EditContainer = loadable(() => import('../../containers/EditContainer'))

const UpdatePage = ({ params }) => {
  const { seq } = React.use<{ seq: any }>(params)
  return WithUserContainer(
    <>
      <MainTitle>회원 정보 수정</MainTitle>
      <EditContainer seq={seq} />
    </>,
  )
}

export default React.memo(UpdatePage)
