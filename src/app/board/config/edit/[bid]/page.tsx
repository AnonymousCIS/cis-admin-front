'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const ConfigContainer = loadable(
  () => import('../../containers/ConfigContainer'),
)

// params = 경로변수인 bid
const EditPage = ({ params }) => {
  // React.use = Promise를 꺼내주는 기능 (React 18버전에서)
  const { bid } = React.use<{ bid: string }>(params)

  return WithUserContainer(
    <>
      <MainTitle>게시판 설정 수정</MainTitle>
      <ConfigContainer bid={bid} />
    </>,
  )
}

export default React.memo(EditPage)
