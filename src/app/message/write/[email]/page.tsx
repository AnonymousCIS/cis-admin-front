'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const WriteContainer = loadable(() => import('../../containers/WriteContainer'))

const WritePage = ({ params }) => {
  const { email } = React.use<{ email?: any }>(params)
  return WithUserContainer(
    <>
      <MainTitle>쪽지 작성</MainTitle>
      <WriteContainer email={email} />
    </>,
  )
}

export default WritePage
