import React from 'react'
import ConfigListContainer from '../containers/ConfigListContainer'
import { MainTitle } from '@/app/global/components/StyledTitle'

const ListPage = () => {
  return (
    <>
      <MainTitle>게시판 목록</MainTitle>
      <ConfigListContainer />
    </>
  )
}

export default React.memo(ListPage)
