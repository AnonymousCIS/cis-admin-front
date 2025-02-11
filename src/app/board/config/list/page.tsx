'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const ConfigListContainer = loadable(
  () => import('../containers/ConfigListContainer'),
)

const ListPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>게시판 목록</MainTitle>
      <ConfigListContainer />
    </>,
  )
}

export default React.memo(ListPage)
