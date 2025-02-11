'use client'

import React from 'react'
import LoanListForm from '../components/LoanListForm'
import useMenuCode from '@/app/global/hooks/useMenuCode'

const LoanListContainer = () => {
  useMenuCode('loan', 'list')

  return (
    <>
      <LoanListForm />
    </>
  )
}

export default React.memo(LoanListContainer)
