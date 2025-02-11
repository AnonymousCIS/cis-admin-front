'use client'

import React from 'react'
// import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const BlockPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>회원 차단 관리</MainTitle>
    </>,
  )
}

export default React.memo(BlockPage)
