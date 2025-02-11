'use client'

import React from 'react'
// import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const UpdatePage = () => {
  return WithUserContainer(
    <>
      <MainTitle>카드 수정</MainTitle>
    </>,
  )
}

export default React.memo(UpdatePage)
