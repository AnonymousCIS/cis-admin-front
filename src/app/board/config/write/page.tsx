'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const ConfigContainer = loadable(
  () => import('../containers/ConfigContainer'),
)

const WritePage = () => {
  return WithUserContainer(
    <>
      <MainTitle>게시판 등록</MainTitle>
      <ConfigContainer />
    </>,
  )
}

export default React.memo(WritePage)