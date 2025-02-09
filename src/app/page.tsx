'use client'

import loadable from '@loadable/component'
import WithUserContainer from './global/containers/WithUserContainer'

const MainContainer = loadable(() => import('./main/containers/MainContainer'))

const MainPage = () => {
  return WithUserContainer(MainContainer)
}

export default MainPage
