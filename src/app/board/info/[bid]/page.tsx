'use client'

import React from 'react'
import { MainTitle } from '@/app/global/components/StyledTitle'
// import loadable from '@loadable/component'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const InfoPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>게시판 조회</MainTitle>
    </>,
  )
}

export default React.memo(InfoPage)
