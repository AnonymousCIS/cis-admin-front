'use client'

import React from 'react'
// import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
import ViewContainer from '../../containers/ViewContainer'

const ViewPage = () => {
  return WithUserContainer(
    <>
        <MainTitle>쪽지 조회</MainTitle>
        <ViewContainer />
    </>,
  )
}

export default ViewPage
