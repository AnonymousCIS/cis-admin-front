'use client'

import React from 'react'
import loadable from '@loadable/component'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const ViewContainer = loadable(() => import('../../containers/ViewContainer'))

const ViewPage = async ({ params }) => {
  const { seq } = await params

  return WithUserContainer(<ViewContainer seq={seq} />)
}

export default React.memo(ViewPage)
