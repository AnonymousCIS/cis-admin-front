'use client'

import React from 'react'

import bankListForm from '../components/bankListForm'

import useMenuCode from '@/app/global/hooks/useMenuCode'
import BankListForm from '../components/bankListForm'

const BankListContainer = () => {
  useMenuCode('bank', 'list')
  return (
    <>
      <BankListForm />
    </>
  )
}

export default React.memo(BankListContainer)
