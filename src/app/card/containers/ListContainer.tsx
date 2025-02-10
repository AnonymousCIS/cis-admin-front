'use client'

import React from 'react'

import ListForm from '../components/ListForm'

import useMenuCode from '@/app/global/hooks/useMenuCode'

const ListContainer = () => {
  useMenuCode('card', 'list')
  return (
    <>
      <ListForm />
    </>
  )
}

export default React.memo(ListContainer)
