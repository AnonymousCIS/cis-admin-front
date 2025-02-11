// 'use client'

// import loadable from '@loadable/component'
// import WithUserContainer from './global/containers/WithUserContainer'
import MainContainer from "./main/containers/MainContainer"

// const MainContainer = loadable(() => import('./main/containers/MainContainer'))

const MainPage = () => {
  // return WithUserContainer(MainContainer)
  return <MainContainer />
}

export default MainPage
