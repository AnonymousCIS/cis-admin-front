'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const EditContainer = loadable(() => import('../containers/EditContainer'))

const CreatePage = () => {
  return WithUserContainer(
    <>
      <MainTitle>계좌수정 및 변경</MainTitle>
      <EditContainer />
    </>,
  )
}

export default CreatePage
