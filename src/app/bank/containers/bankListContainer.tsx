'use client'

import React from 'react'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import BankListForm from '../components/BankListForm'

const BankListContainer = () => {
  useMenuCode('bank', 'list')
  return (
    <>
      <BankListForm />
    </>
  )
}

export default React.memo(BankListContainer)
