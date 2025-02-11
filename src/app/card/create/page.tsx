'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const CreateContainer = loadable(() => import('../containers/CreateContainer'))

const CreatePage = () => {
  return WithUserContainer(
    <>
        <MainTitle>카드 등록</MainTitle>
        <CreateContainer />
    </>,
  )
}

export default CreatePage
