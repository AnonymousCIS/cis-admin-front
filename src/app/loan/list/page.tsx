'use client'

import React from 'react'
// import loadable from '@loadable/component'
// import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const LoanList = () => {
  return WithUserContainer(
    <>
      <h1>대출 목록</h1>
    </>
  )
}

export default LoanList
