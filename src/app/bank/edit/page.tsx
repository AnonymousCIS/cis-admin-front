'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
import { MainContentBox } from '@/app/global/components/ContentBox'

const CreateContainer = loadable(() => import('../containers/BankContainer'))

const EditPage = () => {
  return WithUserContainer(
    <>
      <MainContentBox max={750} min={650}>
        <MainTitle>은행 계좌 수정</MainTitle>
        <CreateContainer />
      </MainContentBox>
    </>,
  )
}

export default EditPage
