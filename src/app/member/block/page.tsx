'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
const BlockContainer = loadable(() => import('../containers/BlockContainer'))

const BlockPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>회원 차단 관리</MainTitle>
      <BlockContainer />
    </>,
  )
}

export default React.memo(BlockPage)
