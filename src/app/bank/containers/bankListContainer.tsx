'use client'

import React from 'react'

import ListForm from '../components/bankListForm'

import useMenuCode from '@/app/global/hooks/useMenuCode'

const bankListContainer = () => {
  useMenuCode('bank', 'list')
  return (
    <>
      <ListForm />
    </>
  )
}

export default React.memo(bankListContainer)
