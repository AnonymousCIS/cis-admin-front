import React from 'react'

import ConfigContainer from '../containers/ConfigContainer'
import { MainTitle } from '@/app/global/components/StyledTitle'

const WritePage = () => {
  return (
    <>
      <MainTitle>게시판 등록</MainTitle>
      <ConfigContainer />
    </>
  )
}

export default React.memo(WritePage)
