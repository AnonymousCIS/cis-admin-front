'use client'

import React from 'react'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
// import loadable from '@loadable/component'

const ViewPage = () => {
  return WithUserContainer(
    <>
      <MainTitle>게시글 조회</MainTitle>
    </>,
  )
}

export default React.memo(ViewPage)
