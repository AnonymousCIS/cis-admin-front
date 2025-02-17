'use client'

import React from 'react'
import loadable from '@loadable/component'
import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const TrainContainer = loadable(() => import('../containers/TrainContainer'))

const UpdatePage = () => {
  return WithUserContainer(
    <>
      <MainTitle>머신러닝 학습</MainTitle>
      <TrainContainer />
    </>,
  )
}

export default React.memo(UpdatePage)
