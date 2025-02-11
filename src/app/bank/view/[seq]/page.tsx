'use client'

// import React, { useEffect, useState } from 'react'
import React, { useEffect } from 'react'
// import { processBankUpdate } from '@/app/bank/services/actions'
// import loadable from '@loadable/component'
// import { MainTitle } from '@/app/global/components/StyledTitle'
import WithUserContainer from '@/app/global/containers/WithUserContainer'

const BankViewPage = () => {
  useEffect(() => {
    document.title = '은행정보?? 뭐가 보여져야하지?'
  }, [])

  return WithUserContainer(
    <div>
      <h1>흠..</h1>
    </div>
  )
}

export default BankViewPage
