import React from 'react'
import { MainTitle } from '@/app/global/components/StyledTitle'
import ListContainer from '../containers/ListContainer'

const ListPage = () => {
  return (
    <>
      <MainTitle>카드 목록</MainTitle>
      <ListContainer />
    </>
  )
}

export default React.memo(ListPage)
