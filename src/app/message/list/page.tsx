'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const ListContainer = loadable(() => import('../containers/ListContainer'))

const ListPage = () => {
  return WithUserContainer(
    <div>
      <MainTitle>쪽지목록</MainTitle>
      <ListContainer />
    </div>,
  )
}

export default React.memo(ListPage)
