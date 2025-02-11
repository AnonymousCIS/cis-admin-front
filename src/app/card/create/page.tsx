'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
import { MainContentBox } from '@/app/global/components/ContentBox'

const CreateContainer = loadable(() => import('../containers/CreateContainer'))

const CreatePage = () => {
  return WithUserContainer(
    <>
      <MainContentBox max={750} min={650}>
        <MainTitle>카드 등록</MainTitle>
        <CreateContainer />
      </MainContentBox>
    </>,
  )
}

export default CreatePage
