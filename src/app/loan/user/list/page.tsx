'use client'

import React from 'react'
// import loadable from '@loadable/component'
// import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const LoanUserList = () => {
  return WithUserContainer(
    <>
      <h1>유저가 받은 대출 목록</h1>
    </>,
  )
}

export default LoanUserList
