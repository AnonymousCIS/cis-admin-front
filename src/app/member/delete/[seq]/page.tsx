'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
import { MainContentBox } from '@/app/global/components/ContentBox'
const DeleteContainer = loadable(
  () => import('../../containers/DeleteContainer'),
)

const ListPage = ({ params }) => {
  const { seq } = React.use<{ seq: any }>(params)
  return WithUserContainer(
    <>
      <MainContentBox max={400} min={200}>
        <MainTitle>회원 삭제</MainTitle>
        <DeleteContainer seq={seq} />
      </MainContentBox>
    </>,
  )
}

export default React.memo(ListPage)
